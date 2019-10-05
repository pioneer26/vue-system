1、项目初始化，安装express框架

  在指定的地方新建一个项目名称
    mkdir node-app

  npm init 初始化 package.json文件

  创建入口文件
    touch server.js

  安装express框架
    npm install express

  server.js
    const express = require('express');
    const app = express();//实例化app
    //设置路由
    app.get('/',(req,res) =>{
      res.send('right now');
    })
    const port = process.env.PORT || 8000;//端口号,使用环境变量
    //监听端口号
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    })

  运行服务
    node server.js

  修改package.json文件
    "scripts": {
      "start": "node serve.js",
    }  

  启动服务
    npm run start

2、连接mongoDB数据库，mlab线上免费数据库
  mongodb+srv://test:<password>@cluster0-p1xao.mongodb.net/test?retryWrites=true&w=majority

  开启另一终端，安装mongoose
    npm install mongoose

  引入mongoose
  const mongoose = require('mongoose');

  新建config文件夹，key.js文件
  module.exports = {
    mongoURI:'mongodb+srv://test:cg2262@cluster0-gx8ia.mongodb.net/test?retryWrites=true&w=majority'
  }

  引入key.js
  const db = require('./config/key').mongoURL;
  mongoose.connect(db)
    .then(()=>{
      console.log('连接成功');
    })
    .catch(err=>{
      console.log(err);
    })

3、搭建路由和数据模型
  //路由
  api/user.js
  const express = require('express');
  const router = express.Router();
  const bodyParser = express('body-parser');//引入body-parser中间件
  //get请求
  router.get('/',(req,res)=>{
   res.json(msg:'get请求');
  })
  //post请求
  //必须安装body-parser npm install body-parser
  router.post('/',(req,res)=>{
    //查询数据库中是否有邮箱
    UserDate.findOne({ email: req.body.email })
    .then(user => {
      if (user){
        return res.status(400).json({email: '此邮箱已经被占用'})
      }
      else {
        const newUser = new UserDate({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        })
      }
    })
  })

  module.exports = router;

  server.js里面使用body-parser中间件
  app.use(body-parser.urlencoded({ extended: false }));//使用系统模块querystring来处理
  app.use(body-parser.json())

  //引入路由
  const myuser = require(./api/user.js);
  app.use('./api/user',myuser);

  //访问localhost:8000/api/user/test可以看到返回的json数据  msg:'get请求'

  //数据模型
  /module/data.js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;//实例化Schema
  
  //创建Schema
  const userSchema = new Schema({
    name:{
      type:String,
      requird:true
    },
    ...
  });
  module.exports = User = mongoose.model('myuser',userSchema)

4、搭建注册接口、使用gravatar头像、以及进行bcrypt加密
  //注册接口  http://localhost:8000/api/user/register

  //使用bcrypt进行密码加密
  npm install bcrypt

  router.post('/register', (req, res) => {
  //查询数据库中是否有邮箱
  UserDate.findOne({ email: req.body.email })
    .then((user) => {
      if (user){
        return res.status(400).json({email: '此邮箱已经被注册'})
      }else {
        //gravatar头像
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new UserDate({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        })
        bcrypt.genSalt(10, (err, salt) => {
          //hash为加密后的密码
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // if(err) throw err;//抛出异常错误
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    })
  })

5、搭建登录接口以及使用jwt实现token
  //搭建登录接口 jwt
  安装jwt  npm install jsonwebtoken

6、如何获取token（获取数据的一个令牌，只有这个令牌才能拿到数据）

7、用passport、passport-jwt来验证token，请求的是current