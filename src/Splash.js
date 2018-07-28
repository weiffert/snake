import React from "react";

import "./Splash.css";

class Splash extends React.Component {
  render = () => {
    return (
      <div className="Splash">
        <div>
          <form onChange={this.props.updateForm} onSubmit={this.props.start}>
            <div>
              <label for="speed">Speed</label>
              <input
                type="range"
                id="speed"
                min="50"
                max="300"
                step="5"
                value={this.props.speed}
              />
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
          <h1>Press any key to start</h1>
        </div>
      </div>
    );
  };
}

export default Splash;
