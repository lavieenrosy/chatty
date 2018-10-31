import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages.map(message => {
      return <Message
        key = {message.id}
        username = {message.username}
        content = {message.content}
      />
    });

    return (
      <main className="messages">
        { messages }
        <div className="message system">
{/*          Anonymous1 changed their name to nomnom.*/}
        </div>
      </main>
    );
  }
}
export default MessageList;

// {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// }