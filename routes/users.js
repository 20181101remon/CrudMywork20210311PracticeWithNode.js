var express = require('express');
var router = express.Router();

/* GET users listing. */
// get dns/users/
router.get('/', function(req, res, next) {
  // console.log('response')
  res.send('respond with a resource....');
});

module.exports = router;
