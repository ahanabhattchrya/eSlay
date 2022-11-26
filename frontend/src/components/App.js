import logo from '../images/logo.svg';
import './css/App.scss';
import React from "react";
import ReactDOM from 'react-dom';
import Register from './register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>E-Slay</h1> {/* Remove this line later and add to home.js, otherwise it will be rendered in all components*/}
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;