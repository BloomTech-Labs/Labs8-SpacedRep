const db = require('../../knex.js');
const util = require('util');
const table = 'users';
const SRS = require('../../algorithm/algorithm');

module.exports = {
    find,
    findByUser,
    createUser,
    upsertTier,
    updateProgress,
    getAllProgress,
};

function find() {
    return db(table);
}

function findByUser(id) {
    return db(table)
        .where('user_id', id);
}
// onExists return tier else insert return tier
function upsertTier({ user_id, tier }) {
    return db(table).where({ user_id }).update({ tier })
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

function updateProgress(id, trainingData) {
    // trainingData is an array, looks like [{ difficulty: 0, cardID: 7 }, { difficulty: 1, cardID: 6 }]

    return findByUser(id).then(userArr => {
        const user = userArr[0]

        //instantiate algorithm
        const alg = new SRS();

        if (!user.card_progress) user.card_progress = {}

        trainingData.forEach(card => {

            if (user.card_progress[card.cardID]) {
                // if previous training data exists, use it
                user.card_progress[card.cardID] = alg.calculate(card.difficulty, user.card_progress[card.cardID]);
            } else {
                //if no previous data, initialize it in the algorithm
                user.card_progress[card.cardID] = alg.calculate(card.difficulty)
            }
        })


        //update database and return all card progress for this user "card_progress": JSON.stringify(user.card_progress) }
        return db(table).where({ user_id: user.user_id }).update({ "card_progress": JSON.stringify(user.card_progress) })
            .then(success => {
                if (!success || success < 1) {
                    console.log('failure to update, record not found')
                    return false
                } else {
                    return user.card_progress;
                }
            })
    })
}

function getAllProgress(id) {
    console.log('getAllProgress', id)
    return db(table).select('card_progress').where({ user_id: id })
}