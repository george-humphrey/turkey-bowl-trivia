const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

var getQuestion = function (questionId, callback) {
  var q = `SELECT * FROM trivia where id = ${questionId}`;
  connection.query(q, function (err, results, fields) {
    if (err) {
      console.log('problem with database getQuestion')
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getQuestion
};