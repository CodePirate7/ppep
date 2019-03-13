const express = require('express'),
      router = express.Router(),
      User = require("../model/schema.js") //导入user这个表
      user = require('../model/user.js') //对user操作的逻辑结构


//-----------------后台页面-------------------
//进入权限判断
router.use((req, res, next) => {
    if (req.session.login) {
        if (req.session.user.ismanager) {
            return next()
        }
        return res.send("没有权限")
    }
})

//监听后台首页
router.get('/',( req , res ) => {res.render('admin/admin',{title: "后台管理",login: req.session.login,
user: req.session.user,js: "./js/admin/admin.js",css: "./css/admin/admin.css"})})

//监听用户管理
router.post("/user",user.users)

//监听管理员权限操作
router.post("/user/ismanager",user.ismanager)

//监听重置密码功能
router.post("/user/repassword",user.repassword)














module.exports = router