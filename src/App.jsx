import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: 'Anonymous', messages: [], users: 0 };
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
    this.handleMessage = this.handleMessage.bind(this);
  }

  addMessage(user, content) {
    if (user !== this.state.currentUser) {
      const newMessage = { type: "postNotification", currentUser: user, content: `${this.state.currentUser} has changed their name to ${user}` }
      this.socket.send(JSON.stringify(newMessage));
    }

    const extension = content.slice(-3);
    if (extension === 'jpg' || extension === 'png' || extension === 'gif') {
      const newMessage = { type: "image", currentUser: user, content: content }
      this.socket.send(JSON.stringify(newMessage));
    } else {
      const newMessage = { type: "postMessage", currentUser: user, content: content }
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  handleMessage(message) {
    const data = JSON.parse(message.data);
    const type = data.type;

    if (type === "numUsers") {
      const { number } = data;
      this.setState({ users: number });
    } else {
      const {id, type, username, content, colour} = data;
      const newMessage = {id, type, username, content, colour}
      const currentMessages = this.state.messages;
      const messages = [...currentMessages, newMessage];
      this.setState({id, currentUser: username, messages});
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function(event) {
      console.log("Connected to server");
    };

    this.socket.onmessage = this.handleMessage;

  }

  render() {
    return (
      <div>
        <Nav users={this.state.users} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />

      </div>
    );
  }
}
export default App;
