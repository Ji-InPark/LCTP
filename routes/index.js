const express = require('express');
const axios = require("axios");
const cron = require("node-cron");
const router = express.Router();


const query = '\n    query questionOfToday {\n  activeDailyCodingChallengeQuestion {\n    date\n    userStatus\n    link\n    question {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId: questionFrontendId\n      isFavor\n      paidOnly: isPaidOnly\n      status\n      title\n      titleSlug\n      hasVideoSolution\n      hasSolution\n      topicTags {\n        name\n        id\n        slug\n      }\n    }\n  }\n}\n    '
let todayProblemLink = null

/*-----------------init region---------------------*/
updateTodayProblemLink()
/*-------------------------------------------------*/

router.get('/', function(req, res) {
  res.send(todayProblemLink)
});

function updateTodayProblemLink() {
  axios.post('https://leetcode.com/graphql/', {query: query}).then(response => {
    todayProblemLink = `https://leetcode.com${response.data["data"]["activeDailyCodingChallengeQuestion"]["link"]}`
  })
}

cron.schedule('*/30 * * * * *', () => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
});

cron.schedule('0/5 0 9 * * *', updateTodayProblemLink, {
  timezone: "Asia/Seoul"
});

module.exports = router;
