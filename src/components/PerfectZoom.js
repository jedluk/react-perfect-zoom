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
    this.initialBodyOverflow = {};
  }

  componentDidMount() {
    const { overflowX, overflowY } = document.body.style;
    this.initialBodyOverflow = { overflowX, overflowY };
  }

  handleMouseMove = (e) => {
    if (this.isOutsideImageRectangle(e)) {
      this.setState({
        mousePosition: { ...INITIAL_POSITION },
        clickPosition: { ...INITIAL_POSITION }
      });
      this.toggleBodyVisibility(this.initialBodyOverflow);
    } else {
      const mousePosition = this.getCoordinates(e);
      this.setState({ mousePosition });
    }
  };

  handleClick = (e) => {
    this.imgRectangle = this.imgRef.current.getBoundingClientRect();
    this.toggleBodyVisibility({ overflowX: 'hidden', overflowY: 'hidden' });
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

  isOutsideImageRectangle = ({ pageX: x, pageY: y }) => {
    const { right, left, top, bottom } = this.imgRectangle;
    return (
      inCloseRange(x, right) ||
      inCloseRange(x, left) ||
      inCloseRange(y, top) ||
      inCloseRange(y, bottom)
    );
  };

  toggleBodyVisibility = ({ overflowX, overflowY }) => {
    const { documentElement: elem } = document;
    if (elem.scrollHeight <= elem.clientHeight) {
      document.body.style.overflowY = overflowY;
    }
    if (elem.scrollWidth <= elem.clientWidth) {
      document.body.style.overflowX = overflowX;
    }
  };

  getCurrentPositions = () => ({
    clickX: this.state.clickPosition.x,
    clickY: this.state.clickPosition.y,
    currentX: this.state.mousePosition.x,
    currentY: this.state.mousePosition.y
  });

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
