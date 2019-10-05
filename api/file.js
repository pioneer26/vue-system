const express = require('express');
const router = express.Router();
const Profile = require('../module/profile');
const passport = require('passport');

//@route POST api/file/test
router.use('/test', (req, res, next) => {
  res.json({msg: '完事了'})
  next();
})

//@route POST 添加信息接口 api/file/add
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const verfile = {};
  if(req.body.type){
    verfile.type = req.body.type
  }
  if(req.body.describe){
    verfile.describe = req.body.describe
  }
  if(req.body.income){
    verfile.income = req.body.income
  }
  if(req.body.expend){
    verfile.expend = req.body.expend
  }
  if(req.body.cash){
    verfile.cash = req.body.cash
  }
  new Profile(verfile).save()
  .then(file => {
    res.json(file);
  })
})

//@route GET 获取所有信息 api/file
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.find()
    .then(file => {
      if(!file){
        return res.status(400).json('没有内容');
      }
      res.json(file);
    })
    .catch(err => res.status(404).json(err))
})

//@route GET 获取单个信息 api/file/id
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({_id: req.params.id})
    .then(file => {
      if(!file){
        return res.status(400).json('没有内容');
      }
      res.json(file);
    })
    .catch(err => res.status(404).json(err))
})

//@route POST 编辑信息接口 api/file/edit
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const verfile = {};
  if(req.body.type){
    verfile.type = req.body.type
  }
  if(req.body.describe){
    verfile.describe = req.body.describe
  }
  if(req.body.income){
    verfile.income = req.body.income
  }
  if(req.body.expend){
    verfile.expend = req.body.expend
  }
  if(req.body.cash){
    verfile.cash = req.body.cash
  }
 Profile.findOneAndUpdate(
   {_id: req.params.id},
   {$set: verfile},//要更新的内容
   {new: true}//编辑的新内容
 ).then(file => res.json(file))
})

//@route POST 删除信息接口 api/file/delete
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  file.findOneAndRemove({_id: req.params.id})
    .then(file => {
      //删完之后保存，然后把删除后的内容返过去
      file.save().then(file => file.res.json(file));
    })
    .catch(err => res.status(400).json('删除失败'));
})
module.exports = router;