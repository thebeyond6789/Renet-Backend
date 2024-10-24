var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const modelsPost = require('../models/post');

const multer = require('multer');
const path = require('path');

// Cấu hình multer để tải ảnh lên
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/img/');
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route để hiển thị trang upload ảnh (nếu cần)
router.get('/upload', function(req, res, next) {
  res.render('upload', {});
});

// Route để xử lý việc tải ảnh lên từ client
router.post('/upload', upload.single('avatar'), async (req, res, next) => {
  try {
      const { file } = req;
      if (!file) {
          return res.status(400).json({ status: 0, message: 'Không có tệp ảnh được tải lên' });
      } else {
          const url = `http://192.168.1.13:3000/img/${file.filename}`;
          return res.status(200).json({ status: 1, url: url });
      }
  } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error);
      return res.status(500).json({ status: 0, message: 'Đã xảy ra lỗi khi tải ảnh lên' });
  }
});

// Route để thêm bài viết
router.post('/add', upload.single('avatar'), async (req, res) => {
    try {
        const { title,idAccount} = req.body;
        const img = req.file ? req.file.filename : ''; // Lấy tên file ảnh nếu có
        const _id = new mongoose.Types.ObjectId();
        const newPost = await modelsPost.create({_id,img,title,idAccount});
        res.status(201).json({ message: 'Bài viết đã được tạo thành công', data: newPost });
    } catch (error) {
      console.error('Lỗi khi thêm bài viết:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm bài viết' });
  }
});

// Các route khác...
router.get('/allPost', async function(req, res, next) {
    const data = await modelsPost.find();
    res.json(data);
});

router.get('/postByAccount/:id', async function(req, res, next) {
    const { id } = req.params;
    const data = await modelsPost.find({ 'idAccount': id });
    res.json(data);
});

router.get('/postByID/:id', async function(req, res, next) {
    const { id } = req.params;
    const data = await modelsPost.findOne({ '_id': id });
    res.json(data);
=======
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

router.put('/edit/:id', async function(req, res, next) {
    try {
        const { id } = req.params;
        const { post, title } = req.body;
        await modelsPost.findByIdAndUpdate(id, { post, title });
        res.status(201).json({ message: 'Sửa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Không thành công', error });
    }

});

router.delete('/delete/:id', async function(req, res, next) {
    try {
        const { id } = req.params;
        await modelsPost.findByIdAndDelete(id);
        res.json({ message: 'Xóa thành công' });
    } catch (err) {
        console.error('Lỗi', err);
        res.status(500).json({ err: 'Đã xảy ra lỗi' });

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
});

module.exports = router;
