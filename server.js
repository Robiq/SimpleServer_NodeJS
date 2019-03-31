const HTTP_PORT = 8880;

const fs = require('fs');
const http = require('http');
// ----------------------------------------------------------------------------------------

// Create a server for the client html page
var handleRequest = function(request, response) {
    // Render the single client html file for any request the HTTP server receives
    console.log('request received(http): ' + request.url);
    try{
        if(request.url === '/quotes') {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(fs.readFileSync('./quotes.json'));
        } else if (request.url === '/favicon.ico') {
            response.writeHead(200, {'Content-Type': 'image/x-icon'} );
            response.end();
            console.log('favicon requested');
        } else{
            console.log('Invalid URL requested');
            response.writeHead(404);
            response.end();
        }
    }catch(e){
        console.log("Exception when serving file(http): ", e);
    }
};

var httpServer = http.createServer(handleRequest);
httpServer.listen(HTTP_PORT, '0.0.0.0');


console.log('Server running. Visit https://localhost:' + HTTP_PORT + ' in Firefox/Chrome (note the HTTPS; there is no HTTP -> HTTPS redirect!)');