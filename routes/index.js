const express = require('express');
const axios = require("axios");
const cron = require("node-cron");
const router = express.Router();
require('expose-gc');


const query = '\n    query questionOfToday {\n  activeDailyCodingChallengeQuestion {\n    date\n    userStatus\n    link\n    question {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId: questionFrontendId\n      isFavor\n      paidOnly: isPaidOnly\n      status\n      title\n      titleSlug\n      hasVideoSolution\n      hasSolution\n      topicTags {\n        name\n        id\n        slug\n      }\n    }\n  }\n}\n    '
let todayProblemLink = null

/*-----------------init region---------------------*/
updateTodayProblemLink()
/*-------------------------------------------------*/

router.get('/', function(req, res) {
  res.send(todayProblemLink)
});

router.post('/', function(req, res) {
  updateTodayProblemLink();
  res.send('Update url called')
});

function updateTodayProblemLink() {
  axios.post('https://leetcode.com/graphql/', {query: query}).then(response => {
    const previousUrl = todayProblemLink;
    todayProblemLink = `https://leetcode.com${response.data["data"]["activeDailyCodingChallengeQuestion"]["link"]}`
    console.log('Url Update Request')
    console.log(`previous url: ${previousUrl}\nupdated url: ${todayProblemLink}`)
  })
}

cron.schedule('0 */5 * * * *', () => global.gc());

cron.schedule('0/10 0 9 * * *', updateTodayProblemLink, {
  timezone: "Asia/Seoul"
});

module.exports = router;
