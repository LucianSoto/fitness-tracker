import logo from './assets/logo192.png';
import { useEffect, useState, useRef } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import SignIn from './components/SignIn';
import Nav from './components/Nav'

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
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
