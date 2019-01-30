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
    let userCount = wss.clients.size;

    let users ={
        userCount:userCount,
        type:"clientCountMessage"
    }

    wss.broadcast(JSON.stringify(users))
 

    ws.on('message', function (message) {
        let parsedMessage =  JSON.parse(message);
        let messageType = parsedMessage.type;
        console.log("What is the message type", messageType);

        if(messageType === "postNotification"){
        // do thing
        let notificationMessage = JSON.parse(message);
        notificationMessage.type="incomingNotification"
        const sendNotification = JSON.stringify(notificationMessage)
        wss.broadcast(sendNotification)
        } 
        
        else if(messageType === "postMessage"){
        let parsedMessage = JSON.parse(message);
        parsedMessage.id = uuidv4();
        parsedMessage.type = "incomingMessage";
        const messageWithId = JSON.stringify(parsedMessage);
        // console.log("Testing Notification",messageWithId);

        wss.broadcast(messageWithId);
        console.log("User "+parsedMessage.username+" said "+parsedMessage.content)
        }
        // if (messageWithId.length) {
        //     f.write(text);
        //     document.getElementById("chatbox").contentWindow.scrollByPages(1);
        //   }
    })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        let userCount = wss.clients.size;

        let users ={
            userCount:userCount,
            type:"clientCountMessage"
        }
    
    console.log('Client disconnected')});

  

    wss.broadcast(JSON.stringify(users))

});