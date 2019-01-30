import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] //messages coming from the server will be stored here when they arrive 
    };
  }

  messageChange = (event) => {
    if (event.key === 'Enter') {
      console.log("Heyoooo",this.state.messages);
  
    let newValue = event.target.value
    let newData = {
      username: this.state.currentUser.name,
      content: newValue,
      type: "postMessage",
    }
    // this.setState({
    //   messages: [...this.state.messages,newData]
      
    // })

    this.socket.send(JSON.stringify(newData))
    console.log("User", newData.username + " said " + newData.content)
    // console.log("Getting the user message here first before terminal window", newData.message.username)

  }
}

  userChange = (event) => {
    if (event.key === 'Enter'){  
    let newValue = event.target.value
    let oldName = this.state.currentUser.name
    console.log("Old Name", oldName)
    console.log("Testing for user value here", newValue)
    

    let newUsernameObject = {
        oldName: this.state.name,
        newName: newValue,
        content: "User changed names",
        type: "postNotification"
    }
    console.log("testing HERE", newValue)
    this.socket.send(JSON.stringify(newUsernameObject))

    this.setState({
      currentUser: {
        name: newValue,
        // content: "User changed names"
      } 
      
    })

  }
}


// in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
 



  this.socket = new WebSocket("ws://localhost:3001")
  this.socket.onmessage =  (event) => {
    const parsedMessage = JSON.parse(event.data);
  
    console.log("DATA", parsedMessage);
    switch(parsedMessage.type) {
      case "incomingMessage":
        // handle incoming message
        this.setState({
          messages: [...this.state.messages, parsedMessage]
        })

        console.log("incomingMessage")
        break;
      case "incomingNotification":
        // handle incoming notification
        this.setState({
          messages: [...this.state.messages, parsedMessage]
        })
        console.log("incomingNotification")
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + event.type);
    }
    // this.setState({
    //   messages: [...this.state.messages, parsedMessage]
    // })
    
    console.log("TESTING HERE", parsedMessage);
  }
// this.socket.onopen = () => {
//     // when the socket opens
  
// }




}

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar userChange={this.userChange} messageChange={this.messageChange} currentUser={this.state.currentUser} />
        <MessageList messages={this.state.messages} />
        {/* <Notification messages={this.state.messages} /> */}
      </div>
    )
  }
}

export default App;










