const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/key');
const UserDate = mongoose.model('myUser');
//用当前的配置信息，调用jwtFromRequest请求，来验证对应的token
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//验证头中提取，默认为'bearer'
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);
    UserDate.findById(jwt_payload.id)
      .then(user => {
        if(user) return done(null, user)
        return done(null, false)
      })
      .catch(err => {
        console.log(err);
      })
}));
}