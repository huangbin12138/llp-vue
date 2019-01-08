const http = require('http');
const url = require('url');

function start(route) {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    route(pathname);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('hello');
    res.write(JSON.stringify({data: 'hello', code: 200}));
    res.end();
  }).listen(8100);

  console.log('server has start');
}

exports.start = start;
