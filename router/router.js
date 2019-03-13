const express = require('express'),
      router = express.Router(),
      User = require("../model/schema.js") //导入user这个表
      user = require('../model/user.js') //对user操作的逻辑结构
      
//-----------------主页面-------------------
//监听引导页面
router.get('/',( req , res ) => {res.render('index',{title: "项目流程体验平台",login: req.session.login,
user: req.session.user,css: "./css/index.css", js: "./js/index.js" })})
//监听注册页面
router.get('/reg',( req , res ) => { res.render('reg',{title: "注册用户",css: "./css/reg.css", js: "./js/reg.js"})})
      .post('/reg',user.reg)
//监听登录页面
router.get('/login',( req , res ) => {res.render('login',{title: "登陆用户",css: "./css/login.css", js: "./js/login.js"})})
      .post('/login',user.login)
//监听退出功能路由
router.get('/logout',( req , res ) => {
      req.session.destroy()
      res.redirect("/")
})







module.exports = router