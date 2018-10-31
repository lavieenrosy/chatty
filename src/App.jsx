import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { currentUser: "Anonymous", messages: [] };
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
    this.handleMessage = this.handleMessage.bind(this);
  }

  addMessage(user, content) {
    const newMessage = { currentUser: user, messages: content }
    this.socket.send(JSON.stringify(newMessage));
  }

  handleMessage(message) {
    const data = JSON.parse(message.data);
    const {username, content, id} = data;
    const newMessage = {id, username, content}
    const currentMessages = this.state.messages;
    const messages = [...currentMessages, newMessage];
    this.setState({id, currentUser: username, messages});
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
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />

      </div>
    );
  }
}
export default App;
