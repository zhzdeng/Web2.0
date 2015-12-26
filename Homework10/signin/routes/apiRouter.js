var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:router');

module.exports = function (db) {
  var userManager = require('../myModels/userManager')(db);

  // 唯一性校验
  router.post('/validate-unique', function(req, res) {
    debug("req.body in validata-unique: ", req.body);
    res.writeHead(200, {"Content-Type": "application/json"});

    userManager.isUnique(req.body)
      .then(function () {
        res.end(JSON.stringify({isUnique: true}));
      })
      .catch(function () {
        res.end(JSON.stringify({isUnique: false}));
      });
  });

  // 改密码
  router.post('/changepassword', function(req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    userManager.findUser(req.session.user.username, req.body.oldpassword)
      .then(function (user) {
        userManager.updateUser(user, {field: 'password', value: req.body.newpassword});
      }).then(function() {
        res.end(JSON.stringify({status: true}));
      })
      .catch(function (error) {
        res.end(JSON.stringify({status: false}));
      });
  });



  return router;
};
