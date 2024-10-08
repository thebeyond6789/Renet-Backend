var express = require('express');
var router = express.Router();
const modelsReel = require('../models/reel');
const { default: mongoose } = require('mongoose');
/* GET home page. */
router.get('/allReel', async function(req, res, next) {
    const data = await modelsReel.find();
    res.json(data)
});
// reel by account
router.get('/reelByAccount/:id', async function(req,res,next){
    const {id} = req.params
    const data = await modelsReel.find({'idAccount':id})
    res.json(data)
})
// detailReel
router.get('/reelByID/:id', async function(req,res,next){
    const {id} = req.params;
    const data = await modelsReel.findOne({'_id':id})
    res.json(data)
})
// add reels
router.post('/add', async function(req,res,next){
   try {
    const {_id} = new mongoose.Types.ObjectId()
    const {title,idAccount,video,content} = req.body
    await modelsReel.create({_id,title,idAccount,video,content})
    res.status(201).json('thêm thành công')
   } catch (error) {
    res.status(500).json('lỗi',error)
   }
})
router.put('/edit/:id', async function(req,res,next){
    try {
     const {id} = req.params
     const {title,idAccount,video,content} = req.body
     await modelsReel.findByIdAndUpdate(id,{title,idAccount,video,content})
     res.status(201).json('sửa thành công')
    } catch (error) {
     res.status(500).json('lỗi',error)
    }
 })
// delete
router.delete('/delete/:id', async function(req,res,next){
    try{
        const {id} = req.params
        await modelsReel.findByIdAndDelete(id)
        res.status(201).json('xóa thành công')
    }    
    catch(err){
        res.status(500).json('lỗi không thành công', err)
    }
})
module.exports = router;
