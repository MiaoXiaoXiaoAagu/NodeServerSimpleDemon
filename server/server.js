const express = require('express');
const bodyParser=require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({storage});

const app=express();
app.use(bodyParser.json())   //JSON解析
   .use(bodyParser.urlencoded({extended: true}));
app.all('*', function(req, res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.get("/getTest",(req,res,next)=>{
    res.send("get successfully");
});
app.post("/postTest",(req,res,next)=>{
    console.log(req.body);
    res.send("post successfully");
});
app.post("/upload/single",upload.single("file"),(req,res,next)=>{
    //console.log(req.body);
    res.send("upload a file");
});
app.post("/upload/multi",upload.array("files"),(req,res,next)=>{
    //console.log(req.body);
    res.send("upload files successfully");
});

app.listen("3333",()=>{
    console.log("正在监听3333端口");
});
