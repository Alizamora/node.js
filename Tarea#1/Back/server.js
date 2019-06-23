const http = require("http");
const methods = {PUT: require("./put"), GET:require("./get"), POST: require("./post"), DELETE: require("./delete")};
const { end } = require("./utilitary-functions");

const server = http.createServer((req, res) => {
  if (methods[req.method]) {
    methods[req.method](req, res);
  } else {
    end({ res, s: false, e: 'Server internal error' });
  }
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(1996);
