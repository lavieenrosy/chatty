import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = { content: '', user: '' };

    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleMessageInput(event) {
    const keyUp = event.key;
    if (keyUp === "Enter") {
      const content = this.state.content;
      const user = this.state.user;
      this.props.addMessage(user, content);
      event.target.value = "";
    }
    const newMessage = event.target.value;
    this.setState({ content: newMessage });
  }

  handleUserInput(event) {
    const keyUp = event.key;
    if (keyUp === "Enter") {
      const content = this.state.content;
      const user = this.state.user;
      this.props.addMessage(user, content);
      event.target.value = "";
    }
    const userName = event.target.value;
    this.setState({ user: userName });
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.state.user ? this.props.currentUser : 'Name'} onKeyUp={this.handleUserInput} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageInput} />
      </footer>
    );
  }
}
export default ChatBar;
