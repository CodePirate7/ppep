const express = require('express'),
      router = express.Router(),
      User = require("../model/schema.js"), //导入user这个表
      user = require('../model/user.js'), //对user操作的逻辑结构
      upload = require('../model/upload.js'),//导入下载文件的逻辑结构
      news = require("../model/news.js")//导入后台新闻逻辑结构


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

//-----------------用户管理-------------------

//监听用户管理
router.post("/user",user.users)

//监听管理员权限操作
router.post("/user/ismanager",user.ismanager)

//监听重置密码功能
router.post("/user/repassword",user.repassword)

//-----------------新闻列表管理-------------------

//新闻列表
router.post("/news",news.views)

//-----------------新闻发布-------------------

//监听新闻发布上传图片功能
router.post("/news/upload",upload.newsupload)

//监听发布新闻提交
router.post("/news/add",news.add)













module.exports = router