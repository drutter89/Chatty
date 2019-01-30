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
    let newValue = event.target.value
    console.log("Testing for user value here", newValue)
    this.setState({
      currentUser: {
        name: newValue
        
      } 
      
    })
    console.log("testing HERE", newValue)

  }


// in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);



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
          messages: [...this.state.messages, "NOTIFICATION SOMETHING CHANGED"]
        })
        console.log("incomingNotification", messages)
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
  
  
  
       
      </div>
    )
  }
}

export default App;










