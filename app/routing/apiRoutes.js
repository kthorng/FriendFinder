var friendsData = require ('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res) {
        var userData = req.body;
        var bestMatch;
        var maxScore = 50;
        for (var i in friendsData) {
            var newMatch = friendsData[i];
            var score = 0;
            for (var j = 0; j < newMatch.scores.length; j++) {
                score += Math.abs(newMatch.scores[j] - userData.scores[j]);
            }
            if (score < maxScore) {
                bestMatch = newMatch;
                maxScore = score;
            }
        }
        friendsData.push(userData);
        res.json(bestMatch);
    });

}