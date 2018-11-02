# Chatty

Chatty is a single-page app built with ReactJS on the front end and a WebSocket server on the back end for multi-user real-time updates. 

## Screenshots

New todos are entered it into the form and autocategorized:

![User count is dynamically updated]()

<br/>


## Features

1. Notifications will let all clients know when a user has changed their name
2. User count is dynamically updated as users join or leave the chatroom
3. Individual socket connections will display unique username colours
4. Users can post images

## Dependencies

### Root Directory

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom

### WebSocket Server

* express
* ws
* uuid