var express = require('express');
var router = express.Router();

// *** GET all shows *** //
router.get('/', function(req, res, next) {
  res.send('Hello friend');
});

module.exports = router;
