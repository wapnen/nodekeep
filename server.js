const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');
const db = require('./config/db');
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
const port = 8000;


mongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
});
