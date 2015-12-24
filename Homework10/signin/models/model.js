var db = require('mongojs').connect('mydb', ['mycollection']);

db.mycollection.count({field: value}, function (err, docs) {
  // docs is an array of all the documents in mycollection
});








module.exports = db;
