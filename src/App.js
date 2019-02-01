import React, { Component } from 'react';
import './App.css';
import User from './components/User';
import Rooms from './components/Rooms';
import Messages from './components/Messages';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB84QMblA3334zL4OGI_CQZ1Q4kox3fO0E",
  authDomain: "testing-chat-169df.firebaseapp.com",
  databaseURL: "https://testing-chat-169df.firebaseio.com",
  projectId: "testing-chat-169df",
  storageBucket: "testing-chat-169df.appspot.com",
  messagingSenderId: "692429481551"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      activeRoom: '',
      user: null,
    };
    
    }
    setRoom(room) {
      this.setState({ activeRoom: room })
    }
  
    setUser(user) {
      this.setState({ user:user});
    }
   
  
    
    render() {
      return (
        <div className="App">
        < User firebase={firebase} 
        setUser={this.setUser.bind(this)} 
        user={this.state.user} />
        < Rooms firebase={firebase} 
        activeRoom={this.state.activeRoom} 
        setRoom={this.setRoom.bind(this)} />
        < Messages firebase={firebase} 
        activeRoom={this.state.activeRoom} 
        setRoom={this.state.activeRoom.key} 
        user={this.state.user}/>
         </div>
      );
    }
  }
  
  export default App;