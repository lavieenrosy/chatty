import React, {Component} from 'react';

class Message extends Component {

  render() {
    const {type, username, content} = this.props;
    console.log(type, username, content);

    let messageDiv;

    if (type === "incomingMessage") {
      messageDiv = (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else if (type === "incomingNotification") {
      messageDiv = (
        <div className="message system">{this.props.content}
        </div>
      );
    }

    return (<div>{messageDiv}</div>)
  }
}
export default Message;
