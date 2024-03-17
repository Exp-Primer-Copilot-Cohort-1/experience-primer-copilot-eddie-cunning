//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function(request, response) {
  var urlObj = url.parse(request.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    var filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.error(err);
      } else {
        response.end(data);
      }
    });
  } else if (pathname === '/addComment') {
    var comment = urlObj.query;
    comments.push(comment);
    response.end(JSON.stringify(comments));
  } else {
    var filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.error(err);
      } else {
        response.end(data);
      }
    });
  }
});
server.listen(8080, function() {
  console.log('服务器已启动, 请访问: http://localhost:8080');
});
