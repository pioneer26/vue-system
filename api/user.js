const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserDate = require('../module/data');
const keys = require('../config/key');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/mm', (req, res) => {
  res.json({msg: 1});
})
//@route POST 注册接口 api/user/register
router.post('/register', (req, res) => {
  
  // console.log( req.body )
  // return;
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
        password: req.body.password,
        identity: req.body.identity
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
//@route POST 登录接口 api/user/login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;
    //查询数据库
   UserDate.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json('用户名不存在')
      }
      //密码匹配
      bcrypt.compare(pwd, user.password)
        .then(isMatch =>{
          if(isMatch) {
            const rule = { 
              id: user.id, 
              name: user.name,
              avatar: user.avatar,
              identity: user.identity
            };
            //使用规则、加密名字、过期时间
            jwt.sign(rule, keys.secretOrKey, { expiresIn:4800 }, (err, token) =>{
              if(err) throw err;
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
          } else {
            return res.status(400).json('密码不正确')
          }
      });
    })
})

//@route GET 当前数据接口 api/user/current
//使用jwt就不再用session保存数据
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
})

module.exports = router;