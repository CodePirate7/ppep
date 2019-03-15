const express =  require("express"),
      path = require('path'),
      multer = require("multer"),
      {news} = require("../model/schema")

//指定保存的目录
const storage = multer.diskStorage({
    destination: path.join(process.cwd(),'public/upload/news'),
    filename: (req,file,callback) => {
        const h = file.originalname.split('.')
        const filename = `${Date.now()}.${h[h.length - 1]}`
        callback(null,filename)
    }
})

const upload = multer({
    storage,
})

exports.newsupload = ( req , res ) => {
    upload.single('file')(req,res,err=>{
        if(err) {
            return res.send({code: 1})
        }
        res.send({code: 0,data: {
            src: `/upload/news/${req.file.filename}`
        }})
    })
}