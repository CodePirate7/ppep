const {news} = require('../model/schema.js')

//发布新闻
exports.add = ( req , res ) => {
    const title = req.body.title
    const content = req.body.content

    news.create({title,content},(err,data) => {
        if (err) {
            res.send({code: 1,msg: '新闻发布失败!请稍后重试!'})
        }
        res.send({code: 0,msg: "发布成功!"})
    })
}

//新闻列表
exports.views = ( req , res ) => {
    Promise.all([
        //写分页功能
        news.find().skip((req.body.page - 1) * req.body.limit).limit(Number(req.body.limit)),
        //计算总共有多少条数据
        news.countDocuments()
    ]).then(data => {
        res.send({
            code: 0,
            data: data[0],
            count: data[1]
        })
    }) 
}




