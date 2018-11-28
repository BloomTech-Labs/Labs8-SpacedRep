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

module.exports = router;