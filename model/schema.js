//引入mongoose模块
const mongoose = require('mongoose')

//创建用户表输入规则
const userSchema = new mongoose.Schema({
    username: {type: String, required: true}, //用户名
    password: {type: String, required: true},
    hear: {type: String},                 //用户头像
    like: {type: [String]},          //用户意愿的方向
    major :{type: String},
    ofclass: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class'}]}, //用户所在班级编号外链班级表
    ofproject: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}]},//用户体验的项目
})

//
const user = mongoose.model("user" , userSchema)

module.exports = user