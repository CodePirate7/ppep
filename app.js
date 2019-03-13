//导入模块
const express = require('express'),
      mongoose = require('mongoose'),
      session = require("express-session"),
      Mongosession = require("connect-mongo")(session),
      app = express()

//连接数据库
mongoose.connect('mongodb://localhost/ppep',{ useNewUrlParser: true })

//测试数据库是否连接成功
const db = mongoose.connection
db.on("error", (err) => {
    console.log(err)
})
db.on('open',() => {
    console.log("数据库连接成功!");
})
//设置登陆信息
app.use(session({
    secret: "aaa", //设置密钥
    rolling: true, //根据操作，延长时间
    cookie: {maxAge: 1000 * 60 * 60}, //设置保存时间1个小时
    store: new Mongosession({  //将数据存在数据库中
    url: "mongodb://localhost/ppep"
    })
}))

//处理post传入的数据为json格式
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//设置静态资源目录为当前目录下的public文件夹
app.use(express.static(__dirname + '/public'))

//设置模板引擎为ejs
app.set('view engine','ejs')

//设置模板引擎目录为当前目录下的view文件夹
app.set('views',__dirname + '/view')

//设置路由
app.use('/',require('./router/router.js'))
app.use('/admin',require('./router/admin.js'))





//设置监听端口
app.listen(5000,() => {
    console.log('项目启动成功,监听在5000端口!');
})
