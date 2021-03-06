import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Notification from "./Notification.jsx";



class App extends Component {
  
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //messages coming from the server will be stored here when they arrive 
      users:0
    };
  }

  messageChange = (event) => {
    if (event.key === 'Enter') {
      // console.log("Heyoooo",this.state.messages);
  
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
    // console.log("User", newData.username + " said " + newData.content)
    // console.log("Getting the user message here first before terminal window", newData.message.username)

  }
}

  userChange = (event) => {
    if (event.key === 'Enter'){  
    let oldName = this.state.currentUser.name
    let newValue = event.target.value
    // console.log("Old Name", oldName)
    // console.log("Testing for user value here", newValue)
    

    let newUsernameObject = {
        oldName: oldName,
        newName: newValue,
        content: "User changed names",
        type: "postNotification"
    }
    // console.log("testing HERE", newUsernameObject.oldName)
    this.socket.send(JSON.stringify(newUsernameObject))

    this.setState({
      currentUser: {
        name: newValue,
        
        // content: "User changed names"
      } 
      
    })
    // console.log("TESTING NEWNAME AGAIN",newValue);
    // console.log("TESTING OLDNAME AGAIN",oldName);
    // console.log("TESTING OBJECT HERE", newUsernameObject);


  }
}


// in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
 



  this.socket = new WebSocket("ws://localhost:3001")
  this.socket.onmessage =  (event, users) => {
    const parsedMessage = JSON.parse(event.data);

    // const userCount = JSON.parse(users);
    // console.log("userCount HERE", userCount)
  
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
      case "clientCountMessage":
        this.setState({
          users: parsedMessage.userCount
        })
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + parsedMessage.type);
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
    console.log("InsideRender",this.state.currentUser)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h2 className="user-count">{this.state.users}</h2>
        </nav>
        <ChatBar userChange={this.userChange} messageChange={this.messageChange} currentUser={this.state.currentUser} />
        <MessageList messages={this.state.messages} />
        {/* <Notification newName={this.state.currentUser.newName} oldName={this.state.currentUser.oldName} /> */}
      </div>
    )
  }
}

export default App;










