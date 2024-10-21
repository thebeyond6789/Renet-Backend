var express = require('express');
var router = express.Router();
const modelsAccount = require('../models/account')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
/* GET home page. */
//http://localhost:4000/account/allAccount
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
// Đăng nhập
router.post('/login', async function(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Tìm người dùng theo email
        const user = await modelsAccount.findOne({ email });
        
        // Nếu không tìm thấy người dùng
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // Nếu đăng nhập thành công, có thể trả về thông tin người dùng hoặc tạo token
        res.status(200).json({ message: 'Đăng nhập thành công', user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (err) {
        console.error('Lỗi', err);
        res.status(500).json({ err: 'Đã có lỗi xảy ra' });
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
module.exports = router;
