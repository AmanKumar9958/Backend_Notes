// HTTP is a set of protocols that allow communication between a client and a server.
// It is the foundation of data communication on the web.
// HTTP is a request-response protocol.

// Creating a server using HTTP..
const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello Aman");
})

server.listen(2000);
