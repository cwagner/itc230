//const gear = require('./lib/gear_list.js');
const express = require("express");
const app = express();
const gearMethods = require('./lib/gearMethods');
const Gear = require('./models/gear');

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

app.get('/', (req, res) => {
  gearMethods.getAll().then((items) => {
    res.render('home', {gear: items});
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/delete', (req, res) => {
  const id = req.query.id;
  gearMethods.delete(id).then((result) => {
    Gear.count((err, count) => {
      if(err) return next(err);
      res.render('delete', {result: result.n, items: count, id: id});
    });
  }).catch((err) => {
    return next(err);
  });
});

app.get('/details', (req, res) => {
  gearMethods.get(req.query.id).then((item) => {
    res.render('details', {result: item});
  }).catch((err) => {
    return next(err);
  });
});

app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});