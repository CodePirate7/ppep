//导入模块
const express = require('express'),
      mongoose = require('mongoose'),
      app = express()

//连接数据库
mongoose.connect('mongodb://localhost/experience',{ useNewUrlParser: true })

//测试数据库是否连接成功
mongoose.connection.on("error", (err) => {
    console.log(err)
})
mongoose.connection.on('open',() => {
    console.log("数据库连接成功!");
})

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
app.use('/',require('./router/index.js'))






//设置监听端口
app.listen(5000)