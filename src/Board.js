import React from "react";

import Location from "./Location";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      life: true,
      snake: [],
      direction: 4,
    };

    for (let i = 0; i < 400; i++) {
      this.state.locations.push(0);
    }

    for (let i = 0; i < 3; i++) {
      this.state.snake.push(209 + i);
    }

    this.state.locations[Math.floor(Math.random() * 400)] = 1;

    setInterval(this.move, 200);
    window.addEventListener("keydown", this.handleKey);
  }

  move = () => {
    const locations = [...this.state.locations];
    const snake = [...this.state.snake];
    snake.forEach(location => (locations[location] = 0));

    let difference = 0;
    switch (this.state.direction) {
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

    snake.unshift(snake[0] + difference);

    let fail = false;
    for (let i = 0; i < snake.length; i++) {
      if (snake[i] < 0 || snake[i] >= 20 * 20) {
        fail = true;
      }

      if (Math.abs((snake[i] % 20) - (snake[i + 1] % 20)) > 1) {
        fail = true;
      }
    }

    let next = false;
    snake.forEach(location => {
      if (locations[location]) {
        let local = Math.floor(Math.random() * 400);
        while (locations[local]) local = Math.floor(Math.random() * 400);
        locations[local] = 1;
        next = true;
      }
    });

    if (!next) snake.pop();

    snake.forEach((location, index) => {
      if (index === 0) locations[location] = 3;
      else locations[location] = 2;
    });

    for (let i = 1; i < snake.length; i++) {
      if (snake[0] === snake[i]) fail = true;
    }

    if (fail) this.setState({ life: false });

    this.setState({ locations, snake });
  };

  handleKey = event => {
    let direction = 0;
    // Respond to both ASDF and arrow keys.
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
    if (direction !== 0 && (this.state.direction - direction) % 2 !== 0)
      this.setState({ direction });
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
