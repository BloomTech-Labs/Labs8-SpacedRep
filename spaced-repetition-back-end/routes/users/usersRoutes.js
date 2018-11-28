const express = require('express');
const users = require('./usersModel.js');
const checkJwt = require('../../jwt');

const router = express.Router();
router.use(checkJwt);

router.get('/', (req, res) => {
    users
        .find()
        .then(users => {
            console.log('users', users);
            res.status(200).json(users);
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
    console.log(user_id);

    users
        .createUser(user_id)
        .then(ids => {
            console.log('ids: ', ids[0]);
            res.status(201).json(ids[0]);
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
            console.log(success);
            if (!success || success < 1) {
                res.status(404).json({ message: 'No records found to update' });
            } else {
                res.status(200).json(success);
            }
        })
        .catch(err => res.status(500).json(err));
});



module.exports = router;