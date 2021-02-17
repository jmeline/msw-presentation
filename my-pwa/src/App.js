import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="grid-container">
          {[...range(100, 126)].map((x) => (
            <div className="grid-item">
              <img alt="puppy" src={`https://place-puppy.com/${x}x${x}`} />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
