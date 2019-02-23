const express = require('express'),
      router = express.Router(),
      user = require("../model/schema.js")
//监听引导页面
router.get('/',( req , res ) => {
    res.send('这里是主页')
})
//监听注册页面
router.get('/reg',( req , res ) => {
    res.render('reg',{
        title: "注册用户"
    })
}).post('/reg',( req , res ) => {
    user.findOne({username: req.body.username},(err,data) => {
        //设置错误信息
        if( err ){
            return res.send({code:1,msg:"查找用户时失败!"})
        }
        //判断用户是否存在
        if( data ){
            return res.send({code: 1, msg: "用户已存在"})
        }
        //添加用户数据
        user.create({
            username: req.body.username,
            password: req.body.password,
            major: req.body.major,
            like: req.body.like
        },( err , data ) => {
            if( err ){
                res.send({code:1,msg:'数据库错误!注册失败!请稍后再试!'})
            }
            res.send({code:0,msg:"注册成功!"})
        })
    })
})
//监听登录页面
router.get('/login',( req , res ) => {
    res.render('login',{
        title: "登陆用户"
    })
}).post('/login',( req , res) => {
    //先查找用户是否存在
    user.findOne({username: req.body.username}, ( err , data ) => {
        if( data ){
            if(data.password === req.body.password) {
                 //保存登陆状态
                req.session.login = true 
                req.session.user = data
                return res.send({msg: "登陆成功",code: 0})  
            } 
             return res.send({msg: "账号或密码错误,请重新输入",code: 1})
        }
        res.send({msg: "用户不存在",code: 1})
    })
})




module.exports = router