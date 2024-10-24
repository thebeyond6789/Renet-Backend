var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const modelsPost = require('../models/post');
/* GET home page. */ // chưa trả về trạng thái status
router.get('/allPost', async function(req, res, next) {
    const data = await modelsPost.find();
    res.json(data)
}); 
router.get('/postByAccount/:id', async function(req, res, next) {
    const {id}= req.params
    const data = await modelsPost.find({'idAccount':id});
    res.json(data)
});
router.get('/postByID/:id', async function(req,res,next){
    const {id} = req.params;
    const data = await modelsPost.findOne({'_id':id})
    res.json(data)
})

// add
router.post('/add', async function(req, res, next) {
    try {
        const _id = new mongoose.Types.ObjectId(); // No need for destructuring
        const { post, title, idAccount } = req.body; // Destructuring req.body correctly
        const data = await modelsPost.create({ _id, post, title, idAccount });
        res.status(201).json({ message: 'Thêm thành công', data });
    } catch (error) {
        res.status(500).json({ message: 'Không thành công', error });
    }
});
// edit
router.put('/edit/:id', async function(req, res, next) {
    try {
        const {id} = req.params
        const { post, title } = req.body; // Destructuring req.body correctly
        await modelsPost.findByIdAndUpdate(id,{post, title });
        res.status(201).json({ message: 'sửa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Không thành công', error });
    }
}); // không thành công và không có id : status cho 2 trạng thái

// delete
router.delete('/delete/:id', async function(req,res,next){
    try{
        const {id} = req.params;
        await modelsPost.findByIdAndDelete(id)
        res.json({message:'xóa thành công'})
    }
    catch(err){
        console.error('lỗi',err)
        res.status(500).json({err:'đã lỗi'})
    }
})
module.exports = router;
