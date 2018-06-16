//KNOWLEDGE BASE
//https://blog.kevinchisholm.com/javascript/node-js/making-a-simple-http-server-with-node-js-part-iv/
//https://github.com/request/request
//https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190

var http = require('http');
var fs = require('fs');
var path = require('path');
var dblib = require('./dblib');

extensions = { //list of file extensions which are used throuhgout the project
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript"
};

function getFile(filePath, res, extensionType) {
  fs.exists(filePath, function (exists) {
    if (exists) {
      fs.readFile(filePath, function (err, contents) {
        if (!err) {
          //if there was no error
          //send the contents with the default 200/ok header
          res.writeHead(200, {
            "Content-type": extensionType,
            "Content-Length": contents.length
          });
          res.end(contents);
        } else {
          //for our own troubleshooting
          console.dir(err);
        };
      });
    } else {
      res.end('404 Not Found')
    };
  });
};

http.createServer(function (req, res) {
  var fileName = path.basename(req.url) || 'index.html';
  var ext = path.extname(fileName);
  var localFolder = __dirname + '/Trollo/';

  if (!extensions[ext]) {
    //for now just send a 404 and a short message
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('File unsupported!');
  };
  getFile((localFolder + fileName), res, extensions[ext]);
  if (req.method === 'POST') {//getting POST request from webpage
    var body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => { //log a value taken from POST and display it
      console.log(body);
      if (body == 'przycisk=') {
       var returnFromDb = dblib.findAll();//TODO: wait for result from DB
       console.log(returnFromDb);
      }
      else {
        var values = body.split('&');
        dblib.insert(values[0].slice(6), values[1].slice(8)); //will be used to insert new records to DB. as for now, it is executing insert with some random values
      }
      // for(var i = 0; i < values.length; i++){
      //   console.log(values[i]); //log what has been sent
      // }
      
    });

  }

}).listen(8080);