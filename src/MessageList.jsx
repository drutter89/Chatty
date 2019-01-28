import React, {Component} from "react";
import Message from "./Message.jsx";
class MessageList extends Component{
    render(){

        let userMessages = this.props.messages.map(message => (
            <Message  key={message.id} message={message} />
        ));

        // console.log("testing here",this.props.messages);
        // console.log(userMessages);


       
        return (
            <main className="messages">
                {
                    userMessages
                }
            
            </main>
        );
    }
}

export default MessageList;