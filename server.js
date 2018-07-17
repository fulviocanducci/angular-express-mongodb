const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//mongodb
mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true
});

//mongodb model
var schemaTodo = new mongoose.Schema({ description: String}, {collection: 'todo',versionKey: false});
var Todo = mongoose.model('todo', schemaTodo);

//app.use.*
app.use(express.static(__dirname + '/dist/app-todo'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//app routes
app.get('/api/todo', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) res.send(err);
    console.log(todos);
    res.json(todos);
  });
});
app.post('/api/todo/create', function (req, res) {
  var addTodo = new Todo({
    'description': req.body.description
  });
  addTodo.save(function (err) {
    if (err) return handleError(err);
  });
  res.json(addTodo);
});

//page static angular (ng)
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/app-todo/index.html'));
});

//port server www
app.listen(process.env.PORT || 8080);

//Ok
console.log("App listening on port 8080");
