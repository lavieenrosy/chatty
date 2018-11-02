# Chatty

Chatty is a single-page app built with ReactJS on the front end, utilising a WebSocket server on the back end for multi-user real-time updates. 

## Screenshots

Users can change their name and post images. Each socket connection has its own unique display colour:

![Change username and post image](https://github.com/lavieenrosy/chatty/blob/master/build/change-name-post-image.gif?raw=true)

<br/>

The user count changes when clients disconnect:

![User count is dynamically updated](https://github.com/lavieenrosy/chatty/blob/master/build/user-count.gif?raw=true)

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