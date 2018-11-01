const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// express setup

const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const clients = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  //get number of active users and send to all open connections

  function sendActiveUsers() {
    const numberUsers = wss.clients.size;
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        const message = {
          type: "numUsers",
          number: numberUsers
        }
        client.send(JSON.stringify(message));
      }
    });
  }
  sendActiveUsers();

  function getRandomColour() {
    const letters = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
  }

  // generate a random colour to assign to each specific connection:

  const wsColour = getRandomColour();

  ws.on('message', function incoming(data) {
    const incomingData = JSON.parse(data);
    const { type, currentUser, messages} = incomingData;
    const id = uuidv1();

    console.log(typeof message.content)

    const extension = message.content.slice(-3);


    let responseType;

    switch(type) {
      case "postMessage":
        responseType = "incomingMessage";
        break;
      case "postNotification":
        responseType = "incomingNotification";
        break;
    }

    const message = {
      id: id,
      type: responseType,
      username: currentUser,
      content: messages,
      colour: wsColour
    }

    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    sendActiveUsers();
    console.log('Client disconnected');
  });
});