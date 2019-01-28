import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id:"HasdfU"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "YlOFwlkf"
        }
      ]
    };
  }

  messageChange = (event) => {
    if (event.key === 'Enter') {
      console.log(this.state.messages);

    let newValue = event.target.value
    let newData = {
      username: this.state.currentUser.name,
      content: newValue,
      id: "FLEIFjsdl"
    }
    this.setState({
      messages: [...this.state.messages,newData]
      
    })
    console.log("testing HERE", newValue)

  }
}

  userChange = (event) => {
    let newValue = event.target.value
    this.setState({
      content: newValue
      
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
}

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar messageChange={this.messageChange} currentUser={this.state.currentUser} />
        <MessageList messages={this.state.messages} />
  
  
  
       
      </div>
    )
  }
}

export default App;










