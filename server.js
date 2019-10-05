const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

//使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const myUser = require('./api/user');
const file = require('./api/file');
app.use('/api/user', myUser);
app.use('/api/file', file);

//连接数据库
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('open', () => {
    console.log('MongoDB Connection Successed');
});
db.on('error', () => {
    console.log('MongoDB Connection Error');
})

//使用routes
app.get("/tt", function(req,res){
  res.json({
    a: 1,
  })
});

//passport初始化，把passport传递过去，就可以在另一个文件中使用
app.use(passport.initialize());
require('./config/passport')(passport);

//监听端口号
const port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log(`server running on ${port}`);
});