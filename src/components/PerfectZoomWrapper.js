import React from 'react';
import * as PropTypes from 'prop-types';
import PerfectZoom from './PerfectZoom';
import { PefectZoomProps } from './context/PerfectZoomContext';
import { realImageStates } from '../lib/imageState';
import '../assets/index.css';

class PerfectZoomWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      realImageState: realImageStates.NOT_LOADED
    };
  }

  setRealImageState = (state) => {
    if (Object.values(realImageStates).includes(state)) {
      this.setState({ realImageState: state });
    }
  };

  render() {
    return (
      <PefectZoomProps.Provider
        value={{
          ...this.props,
          realImageState: this.state.realImageState,
          setRealImageState: this.setRealImageState
        }}
      >
        <PerfectZoom />
      </PefectZoomProps.Provider>
    );
  }
}

PerfectZoomWrapper.propTypes = {
  source: PropTypes.shape({
    thumbnailURL: PropTypes.string.isRequired,
    thumbnailSize: PropTypes.arrayOf(PropTypes.number),
    imageURL: PropTypes.string
  }).isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.number,
  rectangleStyles: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number
  }),
  translate: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  loader: PropTypes.func,
  allowDownload: PropTypes.bool
};

PerfectZoomWrapper.defaultProps = {
  placement: 'right',
  align: 'center',
  margin: 20,
  allowDownload: false,
  rectangleStyles: {
    size: 2,
    color: '#66ff99'
  }
};

export default PerfectZoomWrapper;
