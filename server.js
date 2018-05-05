//https://medium.freecodecamp.org/building-npm run a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var db             = require('./config/db');
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
                      
  // Make sure you add the database name and not the collection name
  db = database.db("adam_sandbox");
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})

// require('./app/routes')(app, {});
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });