import React from "react";

class Splash extends React.Component {
  render = () => {
    return (
      <div className="Splash">
        <form onChange={this.props.updateForm} onSubmit={this.props.start}>
          <label for="speed">Speed</label>
          <input
            type="range"
            id="speed"
            min="50"
            max="1000"
            step="25"
            value={this.props.speed}
          />
          <input
            type="checkbox"
            id="wrap"
            value={this.props.wrap ? "checked" : "unchecked"}
          />
          <label for="wrap">Enable wrap around</label>
        </form>
        <h1>Press any key to start</h1>
      </div>
    );
  };
}

export default Splash;
