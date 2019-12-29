import React from 'react';
import { isNumber, isElement } from '../lib/utils';

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
    // virtual link will be removed via garbage collector when exiting function (not attached to a DOM)
    const virtualLink = document.createElement('a');
    virtualLink.download = 'cropped_image.png';
    virtualLink.href = canvas.toDataURL('image/png;base64');
    virtualLink.click();
  };

  getScaledImageDimensions = ({ clickX, clickY, currentX, currentY }) => {
    const { image } = this.props;
    const scale = image.naturalHeight / image.clientHeight;
    return {
      x: Math.floor(Math.min(clickX, currentX) * scale),
      y: Math.floor(Math.min(clickY, currentY) * scale),
      width: Math.floor(Math.abs(clickX - currentX) * scale),
      height: Math.floor(Math.abs(clickY - currentY) * scale)
    };
  };

  render() {
    const { image, positions } = this.props;
    if (!Object.values(positions).every(isNumber) || !isElement(image)) {
      return null;
    }
    const { width, height } = this.getScaledImageDimensions(positions);
    return (
      <canvas
        ref={this.canvasRef}
        width={width}
        height={height}
        style={{ display: 'none' }}
      />
    );
  }
}

export default Canvas;
