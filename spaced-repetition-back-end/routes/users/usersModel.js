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
    // trainingData is {difficulty: '', cardID: ''}

    //FIX THIS: still need to run algorithm here
    console.log('trainingData', trainingData)

    return findByUser(id).then(userArr => {
        const user = userArr[0]

        const alg = new SRS();

        if (user.card_progress) {
            // progress exists already, now look for card key

            //instantiate algorithm


            console.log('allProgress not null')
            updatedAllCardProgress = user.card_progress;
            updatedAllCardProgress[trainingData.cardID] = alg.calculate(trainingData.difficulty, updatedAllCardProgress[trainingData.cardID]); //FIX- run alg first
        } else {
            //create progress json, add current card and insert it
            console.log('allProgress is null')
            user.card_progress = {}
            user.card_progress[trainingData.cardID] = alg.calculate(trainingData.difficulty)
        }

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
    return db(table).select('card_progress').where({ user_id: id })
}