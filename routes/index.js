var express = require('express');
var router = express.Router();

let todayProblemLink = null

/* GET home page. */
router.get('/', function(req, res) {
  if(!todayProblemLink) updateTodayProblemLink();

  res.send(todayProblemLink)
});

function updateTodayProblemLink() {
  todayProblemLink = 'test'
}

module.exports = router;
