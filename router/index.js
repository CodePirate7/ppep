const express = require('express'),
      router = express.Router()

router.get('/',( req , res ) => {
    res.send('这里是主页')
})



module.exports = router