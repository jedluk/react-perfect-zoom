import React from 'react';
import { INITIAL_POSITION } from '../../lib/rectangleCoordinates';
import {
  getRelativeCoordinates,
  getPositions,
  toggleBodyVisibility,
  isOutsideImageRectangle
} from './mixins';
import { withPerfectZoomProps } from '../context/PerfectZoomContext';
import { realImageStates } from '../../lib/imageState';
import { isNumber } from '../../lib/utils';

const EXIT_MARGIN = 4;

export default function withMouseEvents(Component) {
  class CoordinatesProvider extends React.Component {
    constructor(props) {
      super(props);
      this.imageRef = React.createRef();
      this.thumbnailRect = {};
      this.initialBodyOverflow = {};
      this.getPositions = getPositions.bind(this);
      this.isOutsideImageRectangle = isOutsideImageRectangle(EXIT_MARGIN);
      this.events = {
        onClick: this.handleClick,
        onMouseMove: this.handleMouseMove
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

    handleMouseMove = (e) => {
      if (!isNumber(this.state.startPosition.x)) {
        return;
      }
      if (this.isOutsideImageRectangle(this.thumbnailRect)(e)) {
        this.setState({
          startPosition: { ...INITIAL_POSITION },
          currentPosition: { ...INITIAL_POSITION }
        });
        toggleBodyVisibility(this.initialBodyOverflow);
      } else {
        this.setState({
          currentPosition: getRelativeCoordinates(this.thumbnailRect, e)
        });
      }
    };

    handleClick = (e) => {
      if (this.props.realImageState === realImageStates.NOT_LOADED) {
        this.props.setRealImageState(realImageStates.IN_PROGRESS);
      }
      toggleBodyVisibility({ overflowX: 'hidden', overflowY: 'hidden' });
      this.thumbnailRect = this.imageRef.current.getBoundingClientRect();
      this.setState({
        startPosition: getRelativeCoordinates(this.thumbnailRect, e)
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
  }
  return withPerfectZoomProps(['realImageState', 'setRealImageState'])(
    CoordinatesProvider
  );
}
