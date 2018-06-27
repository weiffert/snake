import React from "react";

import Location from "./Location";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      life: true,
      snake: [],
      direction: 2,
    };

    for (let i = 0; i < 400; i++) {
      this.state.locations.push(false);
    }

    for (let i = 0; i < 3; i++) {
      this.state.snake.push(209 + i);
    }

    setInterval(this.move, 200);
    window.addEventListener("keydown", this.handleKey);
  }

  move = () => {
    const locations = [...this.state.locations];
    const snake = [...this.state.snake];
    snake.forEach(location => (locations[location] = false));

    let difference = 0;
    switch (this.state.direction) {
      case 1:
        difference = -20;
        break;
      case 2:
        difference = 1;
        break;
      case 3:
        difference = 20;
        break;
      case 4:
        difference = -1;
        break;
    }

    snake.shift();
    snake.push(snake[snake.length - 1] + difference);

    let fail = false;
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] < 0 || snake[i] >= 20 * 20) {
        fail = true;
      }
      if (Math.abs((snake[i] % 20) - (snake[i + 1] % 20)) > 1) {
        fail = true;
      }
    }

    snake.forEach(location => (locations[location] = true));
    if(fail)
      alert(snake);

    this.setState({ locations, snake });
  };

  handleKey = event => {
    let direction = 0;
    switch (event.keyCode) {
      case 37:
      case 65:
        direction += 1;
      case 40:
      case 83:
        direction += 1;
      case 39:
      case 68:
        direction += 1;
      case 38:
      case 87:
        direction += 1;
    }
    if (direction != 0) this.setState({ direction });
  };

  render = () => {
    return (
      <div className="Board" style={this.defaultStyle}>
        {this.state.locations.map((location, index) => (
          <Location active={location} key={index} />
        ))}
      </div>
    );
  };

  defaultStyle = {
    width: `100vw`,
    height: `100vh`,
    display: `flex`,
    flexWrap: `wrap`,
  };
}

export default Board;
