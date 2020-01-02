import React from 'react';
import { INITIAL_POSITION } from '../../lib/rectangleCoordinates';
import { getRelativeCoordinates, getPositions, isOutsideImageRectangle } from './mixins';
import { stopBodyScrolling } from './mixins';
import { isNumber } from '../../lib/utils';

const EXIT_MARGIN = 10;

export default function withTouchEvents(Component) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.imageRef = React.createRef();
      this.initialBodyOverflow = {};
      this.thumbnailRect = {};
      this.getPositions = getPositions.bind(this);
      this.isOutsideImageRectangle = isOutsideImageRectangle(EXIT_MARGIN);
      this.events = {
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd
      };
    }

    state = {
      startPosition: { ...INITIAL_POSITION },
      currentPosition: { ...INITIAL_POSITION }
    };

    componentDidMount() {
      const { overflowX, overflowY } = document.body.style;
      this.initialBodyOverflow = { overflowX, overflowY };
    }

    handleTouchStart = (e) => {
      this.thumbnailRect = this.imageRef.current.getBoundingClientRect();
      const startPosition = getRelativeCoordinates(this.thumbnailRect, e.touches[0]);
      this.setState({ startPosition });
    };

    handleTouchMove = (e) => {
      if (!isNumber(this.state.startPosition.x)) {
        return;
      }
      if (this.isOutsideImageRectangle(this.thumbnailRect)(e)) {
        this.handleTouchEnd();
      } else {
        const currentPosition = getRelativeCoordinates(this.thumbnailRect, e.touches[0]);
        this.setState({ currentPosition });
      }
    };

    handleTouchEnd = () => {
      this.setState({
        startPosition: { ...INITIAL_POSITION },
        currentPosition: { ...INITIAL_POSITION }
      });
    };

    render() {
      const positions = this.getPositions();
      return (
        <Component
          {...this.props}
          positions={positions}
          imageRef={this.imageRef}
          events={this.events}
        />
      );
    }
  };
}
