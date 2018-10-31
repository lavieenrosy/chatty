import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = { content: '', user: '' };

    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleMessageInput(event) {
    const newMessage = event.target.value;
    this.setState({ content: newMessage });
  }

  handleUserInput(event) {
    const userName = event.target.value;
    this.setState({ user: userName });
  }

  onSubmit(event) {
    const keyPress = event.key;
    if (keyPress === "Enter") {
      const content = this.state.content;
      const user = this.state.user;
      this.props.addMessage(user, content);
      event.target.value = "";
    }
  }



  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} onKeyUp={this.handleUserInput} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageInput} onKeyPress={this.onSubmit}/>
      </footer>
    );
  }
}
export default ChatBar;
