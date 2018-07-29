import React from "react";

import Location from "./Location";
import Splash from "./Splash";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      snake: [],
      life: false,
      direction: 2,
      moveBacklog: [],
      speed: 500,
      wrap: false,
      intervalId: "",
    };
  }

  componentDidMount = () => {
    this.resetBoard();
    window.addEventListener("keydown", this.handleKey);
  };

  resetBoard = () => {
    const locations = [];
    for (let i = 0; i < 400; i++) {
      locations.push(0);
    }
    locations[Math.floor(Math.random() * 400)] = 1;

    const snake = [];
    for (let i = 0; i < 3; i++) {
      snake.push(210 - i);
    }
    this.setState({
      locations,
      snake,
      life: false,
      moveBacklog: [],
      direction: 2,
    });
  };

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
    // Wrap around enabled.
    if (this.state.wrap) {
      // Test wrap around up and down.
      if (snake[0] < 0) snake[0] += 20 * 20;
      else if (snake[0] >= 20 * 20) snake[0] -= 20 * 20;

      // Account horizontally
      if (Math.abs((snake[0] % 20) - (snake[1] % 20)) > 1) {
        if (direction == 2) snake[0] -= 20;
        else if (direction == 4) snake[0] += 20;
      }
      // Killer edges enabled
    } else {
        if (snake[0] < 0 || snake[0] >= 20 * 20) {
          fail = true;
        }

        // Test for accidental wrap around from structure.
        if (Math.abs((snake[0] % 20) - (snake[1] % 20)) > 1) {
          fail = true;
        }
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

    this.setState({ locations, snake, direction });

    if (fail) {
      clearInterval(this.state.intervalId);
      this.resetBoard();
    }
  };

  handleKey = event => {
    if (!this.state.life && event.keyCode == 32) {
      this.setState({
        life: true,
        intervalId: setInterval(this.move, this.state.speed),
      });
    } else {
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
    }
  };

  updateForm = event => {
    const value = this.state[event.target.name];

    const state = { ...state };
    state[event.target.id] = event.target.value;
    this.setState(state);
  };

  render = () => {
    return (
      <div className="Board" style={this.defaultStyle}>
        {!this.state.life ? (
          <Splash
            updateForm={this.updateForm}
            speed={this.state.speed}
            wrap={this.state.wrap}
          />
        ) : (
          ""
        )}
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
