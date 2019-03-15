const {news} = require('../model/schema.js')

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



