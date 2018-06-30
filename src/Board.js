import React from "react";

import Location from "./Location";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      snake: [],
      life: true,
      direction: 2,
      moveBacklog: [],
    };

    for (let i = 0; i < 400; i++) {
      this.state.locations.push(0);
    }

    for (let i = 0; i < 3; i++) {
      this.state.snake.push(210 - i);
    }

    this.state.locations[Math.floor(Math.random() * 400)] = 1;

    setInterval(this.move, 200);
    window.addEventListener("keydown", this.handleKey);
  }

  move = () => {
    const locations = [...this.state.locations];
    const snake = [...this.state.snake];

    // Remove the current snake from the board.
    snake.forEach(location => (locations[location] = 0));

    let difference = 0;
    const direction = this.state.moveBacklog.shift() || this.state.direction;
    switch (direction) {
      // up
      case 1:
        difference = -20;
        break;
      // right
      case 2:
        difference = 1;
        break;
      // down
      case 3:
        difference = 20;
        break;
      // left
      case 4:
        difference = -1;
        break;
    }

    // Place the next snake head in its index location.
    snake.unshift(snake[0] + difference);

    // Test for valid positioning.
    let fail = false;
    // Test for crossing edges.
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] < 0 || snake[i] >= 20 * 20) {
        fail = true;
      }

      // Test for accidental wrap around from structure.
      if (Math.abs((snake[i] % 20) - (snake[i + 1] % 20)) > 1) {
        fail = true;
      }
    }

    // Test for intercepted piece.
    // If the snake's head is already set to a truthy value.
    if (locations[snake[0]]) {
      // Place another piece where the snake is not.
      let local = Math.floor(Math.random() * 400);
      while (locations[local]) {
        local = Math.floor(Math.random() * 400);
      }
      locations[local] = 1;
    } else {
      // Otherwise, remove the back piece.
      snake.pop();
    }

    // Test for interception with itself.
    for (let i = 1; i < snake.length; i++) {
      if (snake[0] === snake[i]) fail = true;
    }

    // Place the snake on the board.
    snake.forEach((location, index) => {
      // Three for head styling.
      if (index === 0) locations[location] = 3;
      // Two for body styling.
      else locations[location] = 2;
    });

    if (fail) {
      this.setState({ life: false });
      // Clear timer here if desired.
    }

    this.setState({ locations, snake, direction });
  };

  handleKey = event => {
    let direction = 0;
    // Respond to both ASDF and arrow keys.
    switch (event.keyCode) {
      // Up
      case 38:
      case 87:
        direction = 1;
        break;
      // Right
      case 39:
      case 68:
        direction = 2;
        break;
      // Down
      case 40:
      case 83:
        direction = 3;
        break;
      // Left
      case 37:
      case 65:
        direction = 4;
        break;
    }

    // If a valid key was pressed and it is not in the opposite direction, change direction.
    if (direction !== 0 && (this.state.direction - direction) % 2 !== 0) {
      const moveBacklog = [...this.state.moveBacklog];
      moveBacklog.push(direction);
      this.setState({ moveBacklog });
    }
  };

  render = () => {
    return (
      <div className="Board" style={this.defaultStyle}>
        {this.state.life ? (
          this.state.locations.map((location, index) => (
            <Location active={location} key={index} />
          ))
        ) : (
          <p>DEAD</p>
        )}
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
