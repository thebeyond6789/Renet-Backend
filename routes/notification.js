var express = require('express');
var router = express.Router();
const modelsNotification = require('../models/notification')
/* GET home page. */
router.get('/all', async function(req, res, next) {
    const data = await modelsNotification.find();
    res.json(data)
});
router.get('/notificationByAccount/:id', async function(req,res,next){
    const {id} = req.params
    const data = await modelsNotification.find({'idAccount':id})
    res.json(data)
})
module.exports = router;
