import React, {Component} from "react";




class Notification extends Component{
    render(){
        console.log("TESTING NOTIFICATIONS",this.props)
        return (
            <div className="message system">
            {this.props.oldName} changed their name to {this.props.newName}.
          </div>  
        );
    }
}

export default Notification;