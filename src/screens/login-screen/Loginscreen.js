import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "@firebase/auth";
  import { addDoc, collection } from "@firebase/firestore";
  import React, { useRef, useState } from "react";
  import { useHistory } from "react-router-dom";
  import { auth, db } from "../../firebase";
  import "./Loginscreen.css";
  
  export default function LoginScreen({ setUser }) {
    let history = useHistory();
  
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const register = async () => {
  
      try {
        const responseFromAuth = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const userId = responseFromAuth.user.uid;
  
        // saving to firestore
        await addDoc(collection(db, "users"), {
          email: email,
          uid: userId,
        });
  
        // save user to localstorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            uid: userId,
          })
        );
  
        // set user as active in app
        setUser({
          email: email,
          uid: userId,
        });
  
        history.push("/chat");
      } catch (error) {
        alert(error);
      }
    };
  
    const login = async () => {
  
      try {
        const responseFromAuth = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const userId = responseFromAuth.user.uid;
  
        // save user to localstorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            uid: userId,
          })
        );
  
        // set user as active in app
        setUser({
          email: email,
          uid: userId,
        });
  
        history.push("/chat");
      } catch (error) {
        alert(error);
      }
    };
  
    React.useEffect(() => {
      // get user from localstorage
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user) {
        setUser(user);
        history.push("/chat");
      }
    }, [history, setUser]);
  
    return (
      <div className="login-screen-container">
        <p className="login-title">Welcome!</p>
  
        <div>
          <p>Email</p>
          <input placeholder="your.email@example.com" value={email}  onChange={e=>setEmail(e.target.value)} />
        </div>
  
        <div>
          <p>Password</p>
          <input type="password" placeholder="Strong passowrd" value={password}  onChange={e=>setPassword(e.target.value)}/>
        </div>
  
        <button onClick={register} className="register-button">Register</button>
        <button onClick={login}>Login</button>
      </div>
    );
  }