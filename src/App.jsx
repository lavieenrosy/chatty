import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: 'Anonymous', messages: [], users: 0 };
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001');
    this.handleMessage = this.handleMessage.bind(this);
  }

  sendMessage(user, content) {

    // if the username has changed, set content to display notification
    if (user !== this.state.currentUser) {
      const newMessage = { type: 'postNotification', currentUser: user, content: `${this.state.currentUser} has changed their name to ${user}` }
      this.socket.send(JSON.stringify(newMessage));
    }

    // if the user's message ends with 'jpg', 'png', or 'gif', assign it an image type
    const extension = content.slice(-3);
    if (extension === 'jpg' || extension === 'png' || extension === 'gif') {
      const newMessage = { type: 'image', currentUser: user, content: content }
      this.socket.send(JSON.stringify(newMessage));

    // everything else is a standard message handled below
    } else {
      const newMessage = { type: 'postMessage', currentUser: user, content: content }
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  handleMessage(message) {
    const newMessage = JSON.parse(message.data);
    const type = newMessage.type;

    if (type === 'numUsers') {
      const { number } = newMessage;
      this.setState({ users: number });
    } else {
      const { id, username } = newMessage;
      const currentMessages = this.state.messages;
      const messages = [...currentMessages, newMessage];
      this.setState({id, currentUser: username, messages});
    }
  }

  componentDidMount() {

    this.socket.onopen = function(event) {
      console.log('Connected to server');
    };

    this.socket.onmessage = this.handleMessage;
  }

  render() {
    return (
      <div>
        <Nav users={this.state.users} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} />

      </div>
    );
  }
}
export default App;
