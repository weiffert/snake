import React from "react";

import "./Splash.css";

class Splash extends React.Component {
  render = () => {
    return (
      <div className="Splash">
        <div>
          <h1>Last score: {this.props.score}</h1>
          <form onChange={this.props.updateForm} onSubmit={this.props.start}>
            <div>
              <label for="speed">Fast</label>
              <input
                type="range"
                id="speed"
                min="50"
                max="300"
                step="5"
                value={this.props.speed}
              />
              <label for="speed">Slow</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="wrap"
                value={this.props.wrap ? "checked" : "unchecked"}
              />
              <label for="wrap">Enable wrap around</label>
            </div>
          </form>
          <h1>Press space to start</h1>
        </div>
      </div>
    );
  };
}

export default Splash;
