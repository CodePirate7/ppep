//引入mongoose模块
const mongoose = require('mongoose')

//创建用户表输入规则
const usersSchem = new mongoose.Schema({
    user_name: {type: String, required: true}, //用户名
    user_id : {type: String, required: true},  //用户账号
    user_hear: {type: String},                 //用户头像
    user_interests: {type: [String]},          //用户意愿的方向
    user_ofclass: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class'}]}, //用户所在班级编号外链班级表
    user_ofproject: {tyoe: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}]},//用户体验的项目
})

//