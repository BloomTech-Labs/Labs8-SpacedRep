const express = require('express');
const users = require('./usersModel.js');
const checkJwt = require('../../jwt');

const router = express.Router();
router.use(checkJwt);

router.get('/', (req, res) => {
    users
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json(err);
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
            console.log(err.message);
            res.status(500).json(err);
        });
});

router.get('/user', (req, res) => {
    const user_id = req.body.sub;

    users
        .findByUser(user_id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    const user_id = req.body.id;

    users
        .createUser(user_id)
        .then(user => {
            console.log('returned from post request at login ', user);
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('err: ', err.message);
            res.status(500).json(err);
        });
});

router.get('/progress', (req, res) => {
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
    console.log(req.body)
    const trainingData = req.body.cards
    // const trainingData = [{ difficulty: 0, cardID: 7 }, { difficulty: 1, cardID: 6 }] //FIX: test data

    users.updateProgress(user_id, trainingData).then(userProgress => {
        if (userProgress) {
            res.status(201).json(userProgress);
        } else res.status(404).json({ message: 'failed to update' });

    }).catch(err => {
        console.log(err.message)
        res.status(500).json(err)
    });
})

module.exports = router;