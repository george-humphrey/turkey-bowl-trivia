const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const db = require('../database');

const app = express();
const port = 2620;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/trivia', function (req, res) {
  let id = req.query.id

  db.getQuestion(id, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else if (data === undefined) {
      res.status(404).end();
    } else {
      res.status(200).send(data).end();
    }
  });
});