import React from 'react';
import * as PropTypes from 'prop-types';
import PerfectZoom from './PerfectZoom';
import { PefectZoomProps } from './context/PerfectZoomContext';
import { realImageStates } from '../lib/imageState';
import { pick } from '../lib/utils';
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
          ...pick(this.props, Object.keys(PerfectZoomWrapper.propTypes)),
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
  source: PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string,
      size: PropTypes.arrayOf(PropTypes.number),
      realSize: PropTypes.arrayOf(PropTypes.number)
    }),
    PropTypes.shape({
      thumbnail: PropTypes.shape({
        url: PropTypes.string.isRequired,
        size: PropTypes.arrayOf(PropTypes.number)
      }),
      realImage: PropTypes.shape({
        url: PropTypes.string.isRequired,
        size: PropTypes.arrayOf(PropTypes.number)
      })
    })
  ]).isRequired,
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
