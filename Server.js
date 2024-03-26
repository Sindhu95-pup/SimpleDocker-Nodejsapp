const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
      filePath = './views/poll.html';
    }
    const contentType = getContentType(filePath);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'text/javascript';
      case '.png':
        return 'image/png';
      case '.jpg':
        return 'image/jpeg';
      default:
        return 'text/plain';
    }
  }
server.listen(port, () => {
  console.log('Server running at http://localhost:${port}/');
});