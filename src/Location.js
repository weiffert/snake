import React from "react";

class Location extends React.Component {
  render = () => {
    let style = { ...this.defaultStyle };

    if (this.props.active) {
      style = { ...this.defaultStyle, ...this.snakeStyle };
    }

    return <div className="Location" style={style} />;
  };

  snakeStyle = {
    backgroundColor: `#666`,
  };

  defaultStyle = {
    width: `5%`,
    height: `5%`,
    backgroundColor: `#ccc`,
    border: `1px solid white`,
    boxSizing: `border-box`,
  };
}

export default Location;
