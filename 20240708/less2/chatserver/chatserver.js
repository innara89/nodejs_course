const WebSocket = require('ws');
const http = require('http');
const path = require ('path');
const fs = require('fs');

//1.create  server

const server = http.createServer((request, response) => {

    //3.create default response
    //3.1 parse url and filename
    // if not path not definded' return 'index.html'

    const url = request.url === '/' ? 'index.html' : request.url;

    //console.log(request.url) ;
    const filePath = path.join(__dirname, 'public', url);
    const filetype = path.extname(filePath);
    let ftypetemp = 'text/html';
    switch (filetype) {
        case '.jpg':
            ftypetemp = 'image/jepg';
            break;
        case '.css':
            ftypetemp = 'text/css';
            break;

        case '.json':
            ftypetemp = 'application/json';
            break;

    }

    console.log(filePath)
    fs.readFile(filePath, (error, content) => {
        if (error != null) {
            if (error.code = 'ENOENT') {
                const errorfile = path.join(__dirname, 'public', '404.html');
                fs.readFile(errorfile, (err, data) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(data);
                })
            }
            else {
                response.writeHead(500);
                response.end('Error');
            }

        }
        else {

            response.writeHead(200, { 'Content-Type': ftypetemp });
            response.end(content);
        }


    });
});

const wss = new WebSocket.Server({ server });


//handling client connection
wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`recived : ${message}`);
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(message);
            }
            
        });
    })
    console.log('connected to chat');
    ws.send('welcome to chat');
});




const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)

});