const express = require('express'),
      router = express.Router(),
      User = require("../model/schema.js")
      user = require('../model/user.js')
//监听引导页面
router.get('/',( req , res ) => {
    res.send('这里是主页')
})
//监听注册页面
router.get('/reg',( req , res ) => { res.render('reg',{title: "注册用户"})})
      .post('/reg',user.reg)
//监听登录页面
router.get('/login',( req , res ) => {res.render('login',{title: "登陆用户"})})
      .post('/login',user.login)




module.exports = router