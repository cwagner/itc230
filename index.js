const http = require("http"); 
const fs = require("fs");
const gear = require('./lib/gear_list.js');
const querystring = require('querystring');
const express = require("express");
const app = express();

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

app.get('/', (req, res) => {
  res.type('text/html');
  res.render('home', {gear: gear.getAll()});
});

app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/get', (req, res) => {
  const getid = req.query.id;
  const getresult = gear.get(getid);
  if (getresult) {
    res.type('text/plain');
    res.send('Searching for id #' + getid + ':' + '\n' + JSON.stringify(getresult));
  }
  else {
    res.type('text/plain');
    res.send('Item not found');
  };
});

app.get('/delete', (req, res) => {
  const delid = req.query.id;
  const delresult = gear.delete(delid);
  res.render('delete', {result: delresult, items: gear.getAll().length, id: delid});
});

app.get('/details', (req, res) => {
  let result = gear.get(req.query.id);
  res.render('details', {result: result});
})

app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});