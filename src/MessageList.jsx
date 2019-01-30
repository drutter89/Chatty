import React, {Component} from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";
class MessageList extends Component{
    render(){

        let userMessages = this.props.messages.map(message => {
        if(message.type === "incomingMessage"){
           return (<Message key={message.id} message={message} />)

           }else if(message.type === "incomingNotification"){
               console.log("MESSAGE",message)
               return (<Notification oldName={message.oldName} newName={message.newName} />)
           }
        });
    

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