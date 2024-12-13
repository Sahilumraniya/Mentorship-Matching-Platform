import { HookContext } from "@feathersjs/feathers";

export const Filter = () => async (context: HookContext) => {
    const { params } = context;
    const login_user = context.params.user;
    const { query } = params;

    console.log("Query ::", query);

    if (query?.filter != 'true') {
        return context;
    }

    // console.log("Query ::", query);

    let sql = `
        SELECT
            p.*,
            u.email,
            u.role,
            u.name
        FROM
            profile AS p
        JOIN
            user AS u
        ON p.user_id = u.id
        WHERE
            u.id != ${login_user?.id}
            AND u.status != -1
            AND p.status != -1
    `;

    if (query) {
        if (query.role && query.role != '') {
            sql += ` AND u.role = '${query.role}'`;
        }
        if (query.skills && query.skills != '') {
            const skills = await JSON.parse(query.skills);
            console.log("Skills ::", skills);
            sql += ` AND (JSON_CONTAINS(p.skills, '"${skills[0]}"')`;
            for (let i = 0; i < skills.length; i++) {
                sql += ` OR JSON_CONTAINS(p.skills, '"${skills[i]}"')`;
            }
            sql += `)`;
        }
        if (query.interests && query.interests != '') {
            const interests = await JSON.parse(query.interests);
            console.log("Interests ::", interests);
            sql += ` AND (JSON_CONTAINS(p.interests, '"${interests[0]}"')`;
            for (let i = 0; i < interests.length; i++) {
                sql += ` OR JSON_CONTAINS(p.interests, '"${interests[i]}"')`;
            }
            sql += `)`;
        }
        if (query.name && query.name != '') {
            sql += ` AND u.name LIKE '%${query.name}%'`;
        }
    }

    // pagination
    let limit = query?.$limit ? query?.$limit : 10;
    let skip = query?.$skip ? query?.$skip : 0;

    sql += ` LIMIT ${limit} OFFSET ${skip}`;

    const knex = await context.app.get('knex');

    const countQuery = `SELECT COUNT(*) as total FROM (${sql}) as count`;

    console.log("SQL ::", sql);

    const result = await knex.raw(sql);

    const count = await knex.raw(countQuery);

    // convert user data in user key
    result[0].map((item: any) => {
        item.user = {
            id: item.user_id,
            email: item.email,
            role: item.role,
            name: item.name
        }
        delete item.user_id;
        delete item.email;
        delete item.role;
        delete item.name;
    })

    context.result = {
        total: count[0][0].total,
        skip: skip,
        limit: limit,
        data: result[0]
    }

}