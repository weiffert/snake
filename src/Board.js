import React from "react";

import Location from "./Location";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      life: true,
      snake: [],
    };

    for (let i = 0; i < 400; i++) {
      this.state.locations.push(false);
    }

    for (let i = 0; i < 3; i++) {
      this.state.snake.push([200 + i]);
    }
  }

  render = () => {
    return <div className="Board" style={this.defaultStyle}>
      {this.state.locations.map((location,index) => <Location active={location} key={index}/>)}
    </div>;
  };

  defaultStyle = {
    width: `100vw`,
    height: `100vh`,
    display: `flex`,
    flexWrap: `wrap`,
  };
}

export default Board;
