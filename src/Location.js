import React from "react";

class Location extends React.Component {
  render = () => {
    let style = { ...this.defaultStyle };

    switch(this.props.active) {
      case 1:
        style = {...this.defaultStyle, ...this.oneStyle };
        break;
      case 2:
        style = {...this.defaultStyle, ...this.twoStyle};
        break;
      case 3:
        style = {...this.defaultStyle, ...this.threeStyle };
        break;
      default:
        style = {...this.defaultStyle };
    }

    return <div className="Location" style={style} />;
  };

  oneStyle = {
    backgroundColor: `#ccc`,
  };

  twoStyle = {
    backgroundColor: `#666`,
  }
  
  threeStyle= {
    backgroundColor: `#000`,
  }

  defaultStyle = {
    width: `5%`,
    height: `5%`,
    backgroundColor: `#fff`,
    border: `1px solid #ccc`,
    boxSizing: `border-box`,
  };
}

export default Location;
