// Create web server
// 1. Create web server
// 2. Create a route for the comments page
// 3. Create a route for the comment form
// 4. Create a route for the comment submission

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

// Create web server
var server = http.createServer(function(req, res) {
  // Parse the request URL
  var url_parts = url.parse(req.url);

  // Route for the comments page
  if (url_parts.pathname == '/comments') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h2>Comments</h2>');

    // Read the comments from the file
    fs.readFile('comments.txt', 'utf8', function(err, data) {
      if (err) {
        res.write('<p>There are no comments yet.</p>');
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  }

  // Route for the comment form
  else if (url_parts.pathname == '/comment') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h2>Submit a comment</h2>');
    res.write('<form method="POST" action="/submit_comment">');
    res.write('Name: <input name="name"><br>');
    res.write('Comment: <textarea name="comment"></textarea><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
  }

  // Route for the comment submission
  else if (url_parts.pathname == '/submit_comment') {
    var comment_data = '';
    req.on('data', function(chunk) {
      comment_data += chunk;
    });

    req.on('end', function() {
      var comment = querystring.parse(comment_data);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h2>Comment submitted</h2>');
      res.write('Name: ' + comment['name'] + '<br>');
      res.write('Comment: ' + comment['comment'] + '<br>');
      res.end();

      // Append the comment to the file
      var stream = fs.createWriteStream('comments.txt', {'flags': 'a'});
      stream.write(comment['name'] + ':
