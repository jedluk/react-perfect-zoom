import React from 'react';
import { INITIAL_POSITION } from '../../lib/rectangleCoordinates';
import { getRelativeCoordinates, getPositions, isOutsideImageRectangle } from './mixins';
import { isNumber } from '../../lib/utils';
import { realImageStates } from '../../lib/imageState';
import { withPerfectZoomProps } from '../context/PerfectZoomContext';

const EXIT_MARGIN = 10;

export default function withTouchEvents(Component) {
  return withPerfectZoomProps(['realImageState', 'setRealImageState'])(
    class extends React.Component {
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
        if (this.props.realImageState === realImageStates.NOT_LOADED) {
          this.props.setRealImageState(realImageStates.IN_PROGRESS);
        }
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
          const currentPosition = getRelativeCoordinates(
            this.thumbnailRect,
            e.touches[0]
          );
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
    }
  );
}
