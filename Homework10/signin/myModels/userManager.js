
var bcrypt = require('bcrypt-as-promised');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:module');
var _ = require('lodash');



module.exports = function (db) {
  var users = db.collection('users');

  return {
    findUser: function (username, password) {
      return users.findOne({username: username}).then(function (user) {
        return user ? bcrypt.compare(password, user.password).then(function() {
          return user;
        }) : Promise.reject("用户不存在");
      });
    },

    isUnique: function (pair) {
      // pair[field] = 名称
      // pair[value] = 值
      var object = {};
      object[pair.field] = pair.value;
      return users.findOne(object)
        .then(function (pair) {
          return pair ? Promise.reject('信息不唯一') : Promise.resolve('信息唯一');
        });
    },

    updateUser: function (user, pair) {
      // pair[field] = 名称
      // pair[value] = 值
      var iteration = 10;
      var object = {};
      object[pair.field] = pair.value;

      // 更改密码
      if (pair.field === 'password') {
        return bcrypt.hash(pair.value, iteration).then(function (hash) {
          object[pair.field] = hash;
          return users.update(
            user,
            {
              $set: object,
              $currentDate: {"lastModified": true}
            },
            {multi: true}
          );
        });
      } else { // 其他更改
        return users.update(
          user,
          {
            $set: object,
            $currentDate: {"lastModified": true}
          },
          {multi: true}
        );
      }
    },

    createUser: function (user) {
      var iteration = 10;
      delete user.passwordagain;
      delete user.check;
      return bcrypt.hash(user.password, iteration).then(function (hash) {
        user.password = hash;
        return users.insert(user);
      });
    },

    checkUser: function (user) {
      var formatErrors = validator.findFormatErrors(user);
      return new Promise(function (resolve, reject) {
        formatErrors ? reject(formatErrors) : resolve(user);
      })
        .then(function() {
          return users.findOne(getQuery(user)).then(function (existedUser) {
            debug('existed user: ', existedUser);
            return existedUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
          });
        });
    }
  };

  function getQuery(user) {
    return {
      $or: _(user).omit('password').omit('passwordagain').pairs().map(pairToObject).value()
    };
  }

  function pairToObject(pair) {
    obj = {};
    obj[pair[0]] = pair[1];
    return obj;
  }
};
