import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { INITIAL_POSITION } from '../lib/rectangleCoordinates';
import { isNumber, inCloseRange, getProperty } from '../lib/utils';
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
    this.imgRectangle = {};
  }

  handleMouseMove = (e) => {
    if (this.isOutsideImageRectangle(e)) {
      this.setState({
        mousePosition: { ...INITIAL_POSITION },
        clickPosition: { ...INITIAL_POSITION }
      });
      this.toggleBodyVisibility('auto');
    } else {
      const mousePosition = this.getCoordinates(e);
      this.setState({ mousePosition });
    }
  };

  handleClick = (e) => {
    this.toggleBodyVisibility('hidden');
    this.imgRectangle = this.imgRef.current.getBoundingClientRect();
    const clickPosition = this.getCoordinates(e);
    this.setState({ clickPosition });
  };

  getCoordinates = ({ pageX, pageY }) => {
    const { x, y } = this.imgRectangle;
    return {
      x: Math.floor(pageX - x),
      y: Math.floor(pageY - y)
    };
  };

  getCurrentPositions = () => ({
    clickX: this.state.clickPosition.x,
    clickY: this.state.clickPosition.y,
    currentX: this.state.mousePosition.x,
    currentY: this.state.mousePosition.y
  });

  isOutsideImageRectangle = ({ pageX: x, pageY: y }) => {
    const { right, left, top, bottom } = this.imgRectangle;
    return (
      inCloseRange(x, right) ||
      inCloseRange(x, left) ||
      inCloseRange(y, top) ||
      inCloseRange(y, bottom)
    );
  };

  toggleBodyVisibility = (value) => {
    const { scrollHeight, scrollWidth } = document.body;
    if (scrollHeight <= window.innerHeight) {
      document.body.style.overflowY = value;
    }
    if (scrollWidth <= window.innerWidth) {
      document.body.style.overflowX = value;
    }
  };

  render() {
    const {
      source,
      thumbnailSize,
      translate,
      margin,
      rectangleStyles,
      placement
    } = this.props;
    const positions = this.getCurrentPositions();
    return (
      <div className="pos-relative">
        <Thumbnail
          ref={this.imgRef}
          source={source}
          size={thumbnailSize}
          positions={positions}
          rectangleStyles={rectangleStyles}
          handleClick={this.handleClick}
          handleMouseMove={this.handleMouseMove}
        />
        {getProperty(process, 'env.REACT_APP_PERFECT_ZOOM_DEBUG', false) && (
          <ClickInfo positions={positions} />
        )}
        {isNumber(positions.currentX) && (
          <Zoom
            imgRef={this.imgRef}
            source={source}
            placement={placement}
            translate={translate}
            margin={margin}
            positions={positions}
          />
        )}
      </div>
    );
  }
}

PerfectZoom.propTypes = {
  source: PropTypes.string.isRequired,
  thumbnailSize: PropTypes.arrayOf(PropTypes.number),
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  margin: PropTypes.number,
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  }),
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};

PerfectZoom.defaultProps = {
  placement: 'right',
  size: [300, 500],
  margin: 20
};
