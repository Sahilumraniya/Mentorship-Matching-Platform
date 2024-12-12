import { HookContext } from "@feathersjs/feathers";

export const GetMatchUser = () => async (context: HookContext) => {
    const { params } = context;
    const { query } = params;
    const user = context.params.user;
    let sql = `
        SELECT 
            u.id AS user_id, 
            u.name, 
            (skills_match * 2 + interests_match) AS total_score
        FROM (
            SELECT 
                u.id, 
                JSON_LENGTH(JSON_ARRAY_INTERSECT(p.skills, my_profile.skills)) AS skills_match,
                JSON_LENGTH(JSON_ARRAY_INTERSECT(p.interests, my_profile.interests)) AS interests_match
            FROM 
                users u
            JOIN 
                profile p ON u.id = p.user_id
            CROSS JOIN 
                (SELECT skills, interests FROM profile WHERE user_id = ${user?.id}) my_profile
            WHERE 
                u.id != ${user?.id}
        ) matches
        ORDER BY 
            total_score DESC
    `;

    const knex = await context.app.get('knex');

    const count_query = `SELECT COUNT(*) AS total FROM (${sql}) AS total`;

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
        return result[0];
    });

    context.result = {
        total: total,
        limit: $limit,
        skip: $skip,
        data: result
    };

    return context;
};