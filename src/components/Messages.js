import React, { Component } from 'react';


class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            displayedMessages:  [],
            newMessages: '',
            roomId: '',
            username: ''
            

        }
        this.messagesRef = this.props.firebase.database().ref( 'messages' );
    }
    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ displayedMessages: this.state.displayedMessages.concat( message ) });
           //console.log(snapshot.val()); 
           });
        }

                  

           createMessage(newMessages) {
            if (!this.props.activeRoom || !newMessages ) { return }
            this.messagesRef.push({
             username: this.props.user ? this.props.user.displayName : "Guest",
             content: newMessages,
             sentAt: "<timestamp>",
             roomId: this.props.activeRoom.key,
            });
            this.setState({ newMessages: ''});
         }
         handleChange(event) {
             this.setState({ newMessages: event.target.value });
         }
         
        handleSubmit(event) {
         event.preventDefault();
         this.setState({ newMessages: this.state.value });
         this.state.value = ""
       };

       render () {
   
        return (
            <div id="room-component">
                <h3 className="chat-room"> {this.props.activeRoom ? this.props.activeRoom.name : ''}</h3>
            <ul id="messages">
                {this.state.displayedMessages.filter( message => message.roomId === this.props.activeRoom.key).map(( message) =>
                  <div key={message.key}>
                    <div className="content">
                    <p>{message.content}</p>
                    <p>{message.username}</p>
                   </div>
                </div>
                )}
            </ul>
            
            <div className="message-box">
            
            <form onSubmit = { (e) => { e.preventDefault(); this.createMessage(this.state.newMessages) } }>
                <label>        
                  Type Message:
                  <input type="text" value= { this.state.newMessages } onChange={this.handleChange.bind(this) } />
                </label>
                <input type="submit" />
            </form>
             
         </div>
         
        </div>
        );
      }
    }

export default Messages;