import React, {Component} from 'react';

class Message extends Component {

  render() {
    const { type, username, content, colour } = this.props;

    let message;
    let userColour = { color: colour };

    switch(type) {
      case 'incomingMessage':
        message = (
          <div className="message">
            <span className="message-username" style={ userColour }>{ username }</span>
            <span className="message-content">{ content }</span>
          </div>
        );
        break;
      case 'incomingNotification':
        message = (
          <div className="message system">{ content }
          </div>
        );
        break;
      case 'incomingImage':
        message = (
          <div className="message">
            <span className="message-username" style={ userColour }>{ username }</span>
            <span className="message-content"><img className="image" src={ content } /></span>
          </div>
        );
        break;
    }

    return (<div>{ message }</div>);
  }
}
export default Message;
