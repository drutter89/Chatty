// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
  

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function (message) {
    // do thing
    // console.log("User", message.username + " said " + message.content);
    // console.log(JSON.parse(message).username)
    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidv4();
    const messageWithId = JSON.stringify(parsedMessage);
    console.log("Testing here",messageWithId);

    wss.broadcast(messageWithId);
    console.log("User "+parsedMessage.username+" said "+parsedMessage.content)
})

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});