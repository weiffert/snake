import React from "react";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 500,
      wrap: false,
    };
  }

  updateForm = event => {
    const value = this.state[event.target.name];

    const state = { ...state };
    state[event.target.id] = event.target.value;
    console.log(event.target.id);
    console.log(event.target.value);
    console.table(state);
    this.setState(state);
  };

  updateCheckbox = event => {};

  render = () => {
    return (
      <div className="Splash">
        <form onChange={this.updateForm} onSubmit={this.props.start}>
          <label for="speed">Speed</label>
          <input
            type="range"
            id="speed"
            min="50"
            max="1000"
            step="25"
            value={this.state.speed}
          />
          <input
            type="checkbox"
            id="wrap"
            value={this.state.wrap ? "checked" : "unchecked"}
          />
          <label for="wrap">Enable wrap around</label>
        </form>
      </div>
    );
  };
}

export default Splash;
