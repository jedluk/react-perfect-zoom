import React, { Component } from 'react';
import './App.css';
import sample from './sample.jpg';
import Rectangle from './Rectangle';

const INITIAL_POSITION = { x: null, y: null };
class App extends Component {

  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }


  state = {
    mousePosition: { ...INITIAL_POSITION },
    clickPosition: { ...INITIAL_POSITION }
  }
  handleMouseMove = e =>
    this.setState({ mousePosition: this.getCoordinates(e) })

  handleMouseLeave = e => this.setState({ mousePosition: { ...INITIAL_POSITION } })

  handleClick = e => this.setState({ clickPosition: this.getCoordinates(e) })

  getCoordinates = ({ pageX, pageY }) => {
    if (!this.imgRef.current) {
      return INITIAL_POSITION;
    }
    const { x, y } = this.imgRef.current.getBoundingClientRect();
    return ({ x: Math.floor(pageX - x), y: Math.floor(pageY - y) })
  }

  render() {
    const { x: posX, y: posY } = this.state.mousePosition;
    const { x: clickX, y: clickY } = this.state.clickPosition;
    return (
      <div className="App">
        <div>
          <div style={{ position: 'relative' }}>
            <img
              ref={this.imgRef}
              onMouseMove={this.handleMouseMove}
              onMouseLeave={this.handleMouseLeave}
              onClick={this.handleClick}
              id="k13x"
              alt="main"
              src={sample}
            />
            <Rectangle clickX={clickX} clickY={clickY} currentX={posX} currentY={posY} />
          </div>
          {posX && <h4 className="d-inline">X: {posX}</h4>}
          {" "}
          {posY && <h4 className="d-inline">Y: {posY}</h4>}
          {" "}
          {clickX && <h4 className="d-inline">Click positon: ({clickX},{clickY})</h4>}
        </div>
      </div>
    );
  }
}

export default App;
