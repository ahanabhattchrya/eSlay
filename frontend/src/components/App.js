import logo from '../images/logo.svg';
import './css/App.scss';
import React from "react";
import ReactDOM from 'react-dom';
import Login from './login'
import Home from './home'
import Navbar from './navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
