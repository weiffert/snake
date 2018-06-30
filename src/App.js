import React, { Component } from "react";
import "./App.css";

import Board from "./Board";

/* 
 * TODO: 
 * fix death screen.
 * customize size to fit screen.
 * make rectangles square.
 * make a scoring system.
 *  store high scores locally.
 * customize stye of play.
 *  speed
 *  wrap around
 * comment
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
