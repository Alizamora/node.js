const http = require("http");
const methods = require("./methods");

const server = http.createServer((req, res) => {
	methods[req.method](req, res);
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(1996);
