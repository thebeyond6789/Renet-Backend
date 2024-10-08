var express = require('express');
var router = express.Router();
const modelsFavorite = require('../models/favorite')
router.get('/allFavorite', async function(req, res, next) {
    const data = await modelsFavorite.find();
    res.json(data)
})
module.exports = router;
