import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { INITIAL_POSITION } from '../lib/coordinates';
import Thumbnail from './Thumbnail';
import Zoom from './Zoom';
import ClickInfo from './ClickInfo';
import '../assets/index.css';

export default class PerfectZoom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mousePosition: { ...INITIAL_POSITION },
      clickPosition: { ...INITIAL_POSITION }
    };
    this.imgRef = React.createRef();
  }

  handleMouseMove = (e) => {
    const mousePosition = this.getCoordinates(e);
    this.setState({ mousePosition });
  };

  handleClick = (e) => {
    const clickPosition = this.getCoordinates(e);
    this.setState({ clickPosition });
  };

  handleReset = () =>
    this.setState({
      mousePosition: { ...INITIAL_POSITION },
      clickPosition: { ...INITIAL_POSITION }
    });

  getCoordinates = ({ pageX, pageY }) => {
    if (!this.imgRef.current) {
      return INITIAL_POSITION;
    }
    const { x, y } = this.imgRef.current.getBoundingClientRect();
    return { x: Math.floor(pageX - x), y: Math.floor(pageY - y) };
  };

  getCurrentPositions = () => ({
    clickX: this.state.clickPosition.x,
    clickY: this.state.clickPosition.y,
    currentX: this.state.mousePosition.x,
    currentY: this.state.mousePosition.y
  });

  render() {
    const positions = this.getCurrentPositions();
    return (
      <>
        <div>
          <Thumbnail
            ref={this.imgRef}
            source={this.props.source}
            size={this.props.size}
            handleClick={this.handleClick}
            handleMouseMove={this.handleMouseMove}
            handleReset={this.handleReset}
            positions={positions}
          />
          <br />
          {process.env.REACT_APP_DEBUG && <ClickInfo positions={positions} />}
        </div>
        <div style={{ marginTop: 200 }}>
          {Object.keys(positions).some(Boolean) && (
            <Zoom
              imgRef={this.imgRef}
              source={this.props.source}
              placement={this.props.placement}
              positions={positions}
            />
          )}
        </div>
      </>
    );
  }
}

PerfectZoom.propTypes = {
  source: PropTypes.string.isRequired,
  size: PropTypes.arrayOf(PropTypes.number),
  rectangleClasses: PropTypes.arrayOf(PropTypes.string),
  placement: PropTypes.oneOf(['left', 'right'])
};

PerfectZoom.defaultProps = {
  placement: 'right',
  size: [300, 500]
};
