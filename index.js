const http = require("http"); 
const fs = require("fs");
const gear = require('./lib/gear_list.js');
const querystring = require('querystring');
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

app.get('/', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/get*', (req, res) => {
  const getid = querystring.parse(req.url.toLowerCase().slice(5)).id;
  const getresult = gear.get(getid);
  if (getresult) {
    res.type('text/plain');
    res.send('Searching for id #' + getid + ':' + '\n' + JSON.stringify(getresult));
  }
  else {
    res.type('text/plain');
    res.send('Item not found');
  };

})

app.get('/delete*', (req, res) => {
  const delid = querystring.parse(req.url.toLowerCase().slice(8)).id;
  const delresult = gear.delete(delid);
  if (delresult) {
    res.type('text/plain');
    res.send('Id #' + delid + ' removed');
  }
  else {
    res.type('text/plain');
    res.send('Id #' + delid + ' not found');
      }
})

app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});