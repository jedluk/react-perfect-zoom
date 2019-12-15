import React, { Component } from 'react';
import './App.css';
import sample from './sample.jpg';

const INITIAL_POSITION = { x: null, y: null };
class App extends Component {
  state = {
    mousePosition: { ...INITIAL_POSITION }
  }
  handleMouseMove = e =>
    this.setState({ mousePosition: { x: e.pageX, y: e.pageY } })

  handleMouseLeave = e => this.setState({ mousePosition: { ...INITIAL_POSITION } })

  render() {
    const { x: posX, y: posY } = this.state.mousePosition;
    return (
      <div className="App">
        <div>
          <div style={{ position: 'relative' }}>
            <img
              onMouseMove={this.handleMouseMove}
              onMouseLeave={this.handleMouseLeave}
              id="k13x"
              alt="main"
              src={sample}
            />
          </div>
          <p>
            {posX && <h4 className="d-inline">X: {posX}</h4>}
            &nbsp;
            {posY && <h4 className="d-inline">Y: {posY}</h4>}
          </p>
        </div>
        <div>Target </div>
      </div>
    );
  }
}

export default App;
