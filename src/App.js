import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Chatscreen from './screens/chat-screen/Chatscreen';
import Loginscreen from './screens/login-screen/Loginscreen';
import Navbar from './components/navbar/Navbar';

function App() {

  const [user,setUser]=useState(null);


  return (
    <div className="App">
        <BrowserRouter>
          <Navbar user={user} setUser={setUser}  />
        
        <Switch>
          <Route path="/chat">
            <Chatscreen user={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <Loginscreen user={user} setUser={setUser} />
          </Route>

        </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App;
