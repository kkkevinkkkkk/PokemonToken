import logo from '../static/logo.jpg';
import '../static/App.css';
import React from "react";

export function Homepage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Homepage-title">
          Welcome to Pokemon's world!
        </div>
      </header>
    </div>
  );
}