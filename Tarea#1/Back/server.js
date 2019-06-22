const http = require("http");
const methods = require("./methods");

const server = http.createServer((req, res) => {
  if (methods[req.method]){
    methods[req.method](req, res);
  }else{
    res.end(JSON.stringify({
      success: false,
      error: "Hay un error de algún tipo",
      data: null
    }));
  }
	
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(1996);
