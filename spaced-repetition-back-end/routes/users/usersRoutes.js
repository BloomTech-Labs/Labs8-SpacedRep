const express = require('express');
const users = require('./usersModel.js');
const checkJwt = require('../../jwt');
const jwtAuthz = require('express-jwt-authz');

const router = express.Router();

// Router-level middleware that validates the client's access token
router.use(checkJwt);

// jwtAuthz(['read:data']) => endpoint only allows read access

// ----- NOTICE: For testing purposes only ----- //
// ----- remove in production ------ // 
router.get('/', jwtAuthz(['read:data']), (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const users = await users.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// ----- end remove in production ----- //

router.post('/', (req, res) => {
  const user = req.body;

  users
    .add(user)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  users
    .update(id, changes)
    .then(success => {
      if (!success || success < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(success);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users
    .remove(id)
    .then(success => {
      if (!success || success < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(success);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
