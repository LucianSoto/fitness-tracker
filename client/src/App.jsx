import logo from './assets/logo192.png';
import { useEffect, useState, useRef } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import Nav from './components/Nav'
import User from './components/User'

function App() {
  //https://www.geeksforgeeks.org/how-to-validate-password-is-strong-or-not-in-reactjs/
  //// for validating password/strength with react
  return (
    <div className="App">
      <header className="">
        <p>💪</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="left-arm">💪</p>
        <h1>MERN FITNESS TRACKER!!! 💯</h1>
      </header>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/user/:user" element={<User />} />
      </Routes>
      {/* <Nav /> */}
    </div>
  );
}

export default App;
