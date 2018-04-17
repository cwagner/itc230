const http = require("http"); 
const fs = require("fs");
const gear = require('./lib/gear_list.js');
const querystring = require('querystring');

http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  const pathstart = path.indexOf('?') == -1 ? 
        path : 
        path.slice(0, path.indexOf('?'));
  switch(pathstart) {
    case '/':
      fs.readFile('public/home.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
      break;
    case '/about':
      fs.readFile('public/about.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
      break;
    case '/get':
      const getid = querystring.parse(path.slice(5)).id;
      const getresult = gear.get(getid);
      if (getresult) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Searching for id #' + getid + ':' + '\n' + JSON.stringify(getresult));
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Item not found');
      };
      break;
    case '/delete':
      const delid = querystring.parse(path.slice(8)).id;
      const delresult = gear.delete(delid);
      if (delresult) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Id #' + delid + ' removed');
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Id #' + delid + ' not found');
      }
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);