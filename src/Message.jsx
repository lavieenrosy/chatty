import React, {Component} from 'react';

class Message extends Component {

  render() {
    const {type, username, content, colour} = this.props;

    let message;
    let userColour = {color: this.props.colour};

    switch(type) {
      case "incomingMessage":
        message = (
          <div className="message">
            <span className="message-username" style={userColour}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
        break;
      case "incomingNotification":
        message = (
          <div className="message system">{this.props.content}
          </div>
        );
        break;
    }

    return (<div>{ message }</div>);
  }
}
export default Message;
