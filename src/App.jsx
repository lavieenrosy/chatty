import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

class App extends Component {



  constructor(props) {
    super(props);

    this.state = { currentUser: data.currentUser, messages: data.messages };
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
    this.handleMessage = this.handleMessage.bind(this);
  }

  addMessage(user, content) {
    const newMessage = { currentUser: user, messages: content }
    // const currentMessages = this.state.messages;
    // const newMessageArray = [...currentMessages, newMessage]
    // this.setState({ currentUser: user, messages: newMessageArray });
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

    // establish connection to WebSocket server

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
