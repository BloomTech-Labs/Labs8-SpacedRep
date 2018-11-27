const db = require('../../knex.js');
const util = require('util');
const table = 'users';

module.exports = {
    find,
    findByUser,
    createUser
};

function find() {
    return db(table);
}

function findByUser(id) {
    return db(table)
        .where('user_id', id);
}
// onExists return tier else insert return tier
function upsert(id) {
    return db(table)
        .returning('tier')
        .onExists(function () {
            db.select('*').where('user_id', id);
        })
        .into(table);
}

function createUser(id) {
    return findByUser(id).then(user => {
        if (user[0]) return user[0]
        else {
            console.log('user not found, creating user')
            return db(table).returning('id').insert({ user_id: id })
        }
    })

}

// async function createUser(id) {

//     await db.raw(
//         `insert into users ( id ) as original
//         values ( :id )
//         on conflict ( id ) do update
//         returning *`,
//         { id }
//     )

//     // const insert2 = db('users').insert(id).toString();
//     // console.log('id: ', id);
//     // const update2 = db('users')
//     //     .update(id)
//     //     .whereRaw(`users.user_id = '${id}'`)
//     // const query = util.format(
//     //     '%s ON CONFLICT (id) DO UPDATE ',
//     //     insert2.toString()
//     //     // update2.toString().replace(/^update\s.*\sset\s/i, '')
//     // )

//     // await db.raw(query)
// }