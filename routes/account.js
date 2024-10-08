var express = require('express');
var router = express.Router();
const modelsAccount = require('../models/account')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('json-web-token')
/* GET home page. */
router.get('/allAccount', async function(req, res, next) {
    const data = await modelsAccount.find();
    res.json(data)
});
// đăng kí
    router.post('/register', async function(req,res,next) {
        try{
            const {_id} = new mongoose.Types.ObjectId();
            const {firstName,lastName,password,email,avata,phoneNumber,birth,lastTimeOnline}= req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const data  = await modelsAccount.create({_id,firstName,lastName,password:hashedPassword,email,avata,phoneNumber,birth,lastTimeOnline})
            res.status(200).json({message:'thêm thành công',data})
            }catch(err){
                console.error('lỗi',err);
                res.status(500).json({err:"đã lỗi"})
        }
    })
    // Đăng nhập người dùng
router.post('/login', async function(req, res, next) {
    try {
        const { email, password } = req.body;
        // Kiểm tra xem email và password đã được cung cấp không
        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu.' });
        }
        // Tìm kiếm người dùng trong database bằng email
        const user = await modelsAccount.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
        // Kiểm tra mật khẩu
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
        // Tạo và trả về token JWT nếu đăng nhập thành công
        const token = jwt.sign({ userId: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ message: 'Đăng nhập thành công', token,role: user.role,
        // account: {
        //     _id: user._id,
        //     email: user.email,
        //     fisrtName: user.fisrtName,
        //     lastName: user.lastName,
        //     avata:user.avata
        // } 
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});
router.delete('/delete/:id',async function(req,res,next){
    try {
        const {id} = req.params;
        await modelsAccount.findByIdAndDelete(id);
        res.status(201).json('xóa thành công')
    } catch (error) {
        res.status(500).json('xóa không thành công')
    }
})
// đổi thông tin cá nhân

module.exports = router;
