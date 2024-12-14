import { HookContext } from "@feathersjs/feathers";

export const GetMatchUser = () => async (context: HookContext) => {
    const { params } = context;
    const { query } = params;
    const user = context.params.user;
    let sql = `
        SELECT
    u.id AS user_id,
    u.name,
    matches.profile_id,  -- Use profile_id from the matches subquery
    matches.profile_picture,
    matches.skills,
    matches.interests,
    matches.skills_match,
    matches.interests_match,
    (matches.skills_match * 2 + matches.interests_match) AS total_score
FROM user u
JOIN (
    SELECT
        p.user_id,
        p.id AS profile_id,
        p.profile_picture,
        p.skills,
        p.interests,
        -- Count matching skills
        (
            SELECT COUNT(*)
            FROM JSON_TABLE(p.skills, '$[*]' COLUMNS (skill VARCHAR(255) PATH '$')) AS skills
            WHERE skills.skill IN (
                SELECT JSON_UNQUOTE(JSON_EXTRACT(my_profile.skills, CONCAT('$[', n.n, ']')))
                FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) n
                WHERE n.n < JSON_LENGTH(my_profile.skills)
            )
        ) AS skills_match,
        -- Count matching interests
        (
            SELECT COUNT(*)
            FROM JSON_TABLE(p.interests, '$[*]' COLUMNS (interest VARCHAR(255) PATH '$')) AS interests
            WHERE interests.interest IN (
                SELECT JSON_UNQUOTE(JSON_EXTRACT(my_profile.interests, CONCAT('$[', n.n, ']')))
                FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) n
                WHERE n.n < JSON_LENGTH(my_profile.interests)
            )
        ) AS interests_match
    FROM profile p
    CROSS JOIN (SELECT skills, interests FROM profile WHERE user_id = ${user?.id}) my_profile
    WHERE p.status != -1
) matches ON u.id = matches.user_id
WHERE u.id != ${user?.id}
GROUP BY
    u.id, u.name, matches.profile_id, matches.profile_picture, matches.skills, matches.interests, matches.skills_match, matches.interests_match  -- Removed extra comma
ORDER BY
    total_score DESC
    `;

    console.log("SQL ::", sql);

    const knex = await context.app.get('knex');

    const count_query = `SELECT COUNT(*) AS total FROM (${sql}) AS total`;

    // console.log("SQL ::", count_query);

    const total = await knex.raw(count_query).then((result: any) => {
        return result[0][0].total;
    });

    if (total === 0) {
        context.result = [];
        return context;
    }

    const $skip = query?.$skip ? parseInt(query.$skip) : 0;
    const $limit = query?.$limit ? parseInt(query.$limit) : 10;

    if (params.paginate != false) {
        sql += ` LIMIT ${$skip},${$limit}`;
    }

    const result = await knex.raw(sql).then((result: any) => {
        return result[0].map((e: any) => {
            return {
                user: {
                    user_id: e.user_id,
                    name: e.name,
                },
                profile_id: e.profile_id,
                skills: e.skills,
                interests: e.interests,
                profile_picture: e.profile_picture,
                skills_match: e.skills_match,
                interests_match: e.interests_match,
                total_score: e.total_score
            };
        });
    });
    // console.log("SQL ::", result);
    context.result = {
        total: total,
        limit: $limit,
        skip: $skip,
        data: result
    };

    return context;
};