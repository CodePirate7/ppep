//引入mongoose模块
const mongoose = require('mongoose')

//创建用户表输入规则
const userSchema = new mongoose.Schema({
    username: {type: String, required: true}, //用户名
    password: {type: String, required: true},
    hear: {type: String},                 //用户头像
    like: {type: [String]},          //用户意愿的方向
    major :{type: String},            //专业
    ofclass: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class'}]}, //用户所在班级编号外链班级表
    ofproject: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}]},//用户体验的项目
    ismanager: {type: Boolean, required: true,default: false }
})

//创建新闻表输入规则
const newsSchema = new mongoose.Schema({
    title: {type: String, required: true},        //新闻标题
    content: {type: String, required: true},    //新闻内容
    time: {type: String, default: new Date()},  //新闻发布时间
    author: {type: String}
})


//创建用户表
const user = mongoose.model("user" , userSchema)
const news = mongoose.model("news", newsSchema)

module.exports = {user,news}