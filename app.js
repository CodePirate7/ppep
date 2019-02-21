//导入模块
const express = require('express'),
      mongoose = require('mongoose')

const app = express()

//连接数据库
const db = mongoose.connect('mongodb://localhost/experience',{ useNewUrlParser: true })

//测试数据库是否连接成功
db.on("error", (err) => {
    console.log(err)
})
db.on('open',() => {
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
app.set('views',__dirname + 'view')








//设置监听端口
app.listen(5000)