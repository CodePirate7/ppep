const User = require("../model/schema.js")

//用户注册功能
exports.reg = (req, res) => {
    const user = req.body
    const username = user.username
    const password = user.password
    const major = user.major
    const like = user.like
    User.findOne({username}, (err, data) => {
        //设置错误信息
        if (err) {
            return res.send({code: 1,msg: "查找用户时失败!"})
        }
        //判断用户是否存在
        if (data) {
            return res.send({code: 1,msg: "用户已存在"})
        }
        //添加用户数据
        User.create({username,password,major,like}, (err, data) => {
            if (err) {
                res.send({code: 1,msg: '数据库错误!注册失败!请稍后再试!'})
            }
            res.send({code: 0,msg: "注册成功!"})
        })
    })
}

//用户登录功能
exports.login = (req, res) => {
    const user = req.body
    const username = user.username
    const password = user.password
    User.findOne({username}, (err, data) => {
        if ( data ) {
            if (data.password === password) {
                //保存登陆状态
                req.session.login = true
                req.session.user = data
                return res.send({msg: "登陆成功",code: 0})
            }
            return res.send({msg: "账号或密码错误,请重新输入",code: 1})
        }
        res.send({msg: "用户不存在",code: 1})
    })
}

//后台用户管理功能
exports.users = ( req , res ) => {
        Promise.all([
            //写分页功能
            User.find().skip((req.body.page - 1) * req.body.limit).limit(Number(req.body.limit)),
            //计算总共有多少条数据
            User.countDocuments()
        ]).then(data => {
            res.send({
                code: 0,
                data: data[0],
                count: data[1]
            })
        })
}

//后台用户管理员权限功能
exports.ismanager = ( req , res ) => {
    User.updateOne({
        _id: req.body._id
    }, {
        $set: {
            ismanager: req.body.ismanager
        }
    }, (err, data) => {
        res.send({
            code: 0,
            data: "修改成功"
        })
    })
}

//后台重置密码的路由
exports.repassword = ( req , res ) => {
    User.updateOne({
        _id: req.body._id
    }, {
        $set: {
            password: req.body.newpassword
        }
    }, (err, data) => {
        res.send({
            code: 0,
            data: "修改成功"
        })
    })
}