const express = require('express'),
      router = express.Router(),
      users = require("../model/schema.js"),
      crypto = require("crypto")
//监听/路由
router.get('/',( req , res ) => {
    res.send('这里是主页')
})
//监听注册页面
router.get('/reg',( req , res ) => {
    res.render('reg',{
        title: "注册用户"
    })
}).post('/reg',( req , res ) => {
    console.log(req.body.e);
})
//监听登录页面
router.get('/login',( req , res ) => {
    res.render('login')
})




module.exports = router