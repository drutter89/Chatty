import React, {Component} from "react";


class ChatBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
          content: ''
        }
      }
    
   
      
    
    render(props){
        return (
            <footer className="chatbar">
            <input onChange= {this.props.userChange} className="chatbar-username" placeholder="enter your username" defaultValue={this.props.currentUser.name}/>
            <input onKeyPress={this.props.messageChange} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>   
        );
    }
}




export default ChatBar;

