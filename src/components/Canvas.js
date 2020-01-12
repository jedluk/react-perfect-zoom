import React from 'react';
import * as PropTypes from 'prop-types';
import { areValidPositions } from '../lib/placement';

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key.toLowerCase() === 'd') {
      const { image, positions } = this.props;
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { x, y, width, height } = this.getScaledImageDimensions(positions);
      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
      this.downloadImage(canvas);
      ctx.clearRect(0, 0, width, height);
    }
  };

  downloadImage = (canvas) => {
    // virtual link will be removed by garbage collector when exiting function
    // (element is not attached to a DOM)
    const virtualLink = document.createElement('a');
    virtualLink.download = 'cropped_image.png';
    virtualLink.href = canvas.toDataURL('image/png;base64');
    virtualLink.click();
  };

  getScaledImageDimensions = ({ clickX, clickY, currentX, currentY }) => {
    const { image, scale } = this.props;
    return {
      x: Math.floor(Math.min(clickX, currentX) * scale),
      y: Math.floor(Math.min(clickY, currentY) * scale),
      width: Math.floor(Math.abs(clickX - currentX) * scale),
      height: Math.floor(Math.abs(clickY - currentY) * scale)
    };
  };

  render() {
    const { image, positions } = this.props;
    if (!areValidPositions(positions) || !image) {
      return null;
    }
    const { width, height } = this.getScaledImageDimensions(positions);
    return (
      <canvas
        ref={this.canvasRef}
        width={width}
        height={height}
        className="perfect-zoom-canvas"
      />
    );
  }
}

Canvas.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Element)]),
  positions: PropTypes.shape({
    clickX: PropTypes.number,
    clickY: PropTypes.number,
    currentX: PropTypes.number,
    currentY: PropTypes.number
  })
};

export default Canvas;
