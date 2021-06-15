const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const sampleTrivia = require('./sampleTrivia.js')

const connection = mysql.createConnection(mysqlConfig);

const parseTriviaPart = function (part) {
  return typeof part === 'string' ? part.replace(/'/g, "\\'").replace(/"/g, '\\"') : JSON.stringify(part)
}

const addTrivia = function (trivia, callback = () => { }) {
  let question = parseTriviaPart(trivia.question);
  let true_answer = parseTriviaPart(trivia.true_answer);
  let false_answer1 = parseTriviaPart(trivia.false_answer1);
  let false_answer2 = parseTriviaPart(trivia.false_answer2);
  let false_answer3 = parseTriviaPart(trivia.false_answer3);

  var q = `INSERT INTO trivia (id, question, true_answer, false_answer1, false_answer2, false_answer3) VALUES (null, "${question}", "${true_answer}", "${false_answer1}", "${false_answer2}", "${false_answer3}")`;

  connection.query(q, function (err, results, fields) {
    if (err) {
      console.log('problem with adding question to database')
      console.log(err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
  connection.end();
};

const seed = (data) => {
  for (var i = 0; i < data.length; i++) {
    console.log(i)
    addTrivia(data[i])
  }
};

seed(sampleTrivia);
