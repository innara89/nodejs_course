const WebSocket = require('ws');
const http = require('http');
const path = require ('path');
const fs = require('fs');



const chatHandler = server => {
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
};

module.exports = { chatHandler };

