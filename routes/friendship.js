var express = require('express');
var router = express.Router();
const modelsPost = require('../models/friendship')
/* GET home page. */
router.get('/allFriendship', async function(req, res, next) {
    const data = await modelsPost.find();
    res.json(data)
});
module.exports = router;
