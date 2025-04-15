const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/home',(req,res)=>{
    res.send('hello i am home')
})

app.listen(3000,()=>{
    console.log(`服务器已启动,端口监听为${port}...`);
})