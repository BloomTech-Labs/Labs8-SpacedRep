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
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const user_id = req.user.sub;
    console.log(user_id);

    users
        .createUser(user_id)
        .then(ids => {
            console.log('then');
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            console.log('err: ', err.message);
            res.status(500).json(err);
        });
});


module.exports = router;