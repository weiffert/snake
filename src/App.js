import React, { Component } from "react";
import "./App.css";

import Board from "./Board";

/* 
 * TODO: 
 * customize size to fit screen.
 * make rectangles square.
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
