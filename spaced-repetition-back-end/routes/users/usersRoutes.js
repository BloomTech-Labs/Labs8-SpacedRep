const express = require('express');
const users = require('./usersModel.js');
const checkJwt = require('../../jwt');

const router = express.Router();
router.use(checkJwt);

router.get('/', (req, res) => {
    users
        .find()
        .then(users => {
            console.log('users', users)
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json(err)
        });
});

router.post('/', (req, res) => {
    const user_id = req.user.sub;
    console.log(user_id);

    users
        .createUser(user_id)
        .then(ids => {
            if (ids[0]) {
                console.log('ids: ', ids[0]);
                res.status(201).json(ids[0]);
            } else {
                console.log(ids)
                res.status(201).json(ids);
            }
        })
        .catch(err => {
            console.log('err: ', err.message);
            res.status(500).json(err);
        });
});

router.post('/tier', (req, res) => {
    const user_id = req.user.sub;
    const { tier } = req.body;
    console.log(user_id);

    users
        .upsertTier({ user_id, tier })
        .then(success => {
            console.log(success)
            if (!success || success < 1) {
                res.status(404).json({ message: 'No records found to update' });
            } else {
                res.status(200).json(success);
            }
        })
        .catch(err => res.status(500).json(err));
});

router.get('/progress', (req, res) => {
    // trainingData looks like { difficulty: -1, cardID: 7 }
    const user_id = req.user.sub;

    console.log(user_id)
    users.getAllProgress(user_id).then(user => {
        if (user[0]) {
            res.status(201).json(user[0].card_progress);
            console.log(user[0].card_progress)
        } else {
            res.status(404).json({ message: 'No records found' })
        }

    }).catch(err => {
        console.log(err.message)
        res.status(500).json(err)
    });

})

router.post('/progress', (req, res) => {
    // trainingData is an array, looks like [{ difficulty: 0, cardID: 7 }, { difficulty: 1, cardID: 6 }]
    const user_id = req.user.sub;

    const trainingData = req.body.trainingData
    // const trainingData = [{ difficulty: 0, cardID: 7 }, { difficulty: 1, cardID: 6 }] //FIX: test data

    users.updateProgress(user_id, trainingData).then(userProgress => {
        if (userProgress) {
            res.status(201).json(userProgress);
        } else res.status(404).json({ message: 'failed to update' });

    }).catch(err => res.status(500).json(err));
})

module.exports = router;