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
  }

  addMessage(user, content) {
    const newId = Math.floor((Math.random() * 100) + 4)
    const newMessage = { id: newId, username: user, content: content }
    const currentMessages = this.state.messages;
    const newMessageArray = [...currentMessages, newMessage]
    this.setState({ currentUser: user, messages: newMessageArray });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
