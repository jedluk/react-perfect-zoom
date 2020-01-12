import React from 'react';
import * as PropTypes from 'prop-types';
import PerfectZoom from './PerfectZoom';
import { UserProps } from './context/UserPropsContext';
import '../assets/index.css';

class PerfectZoomWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realImageLoaded: false
    };
  }

  setRealImageLoaded = () => this.setState({ realImageLoaded: true });

  render() {
    return (
      <UserProps.Provider
        value={{
          ...this.props,
          realImageLoaded: this.state.realImageLoaded,
          setRealImageLoaded: this.setRealImageLoaded
        }}
      >
        <PerfectZoom />
      </UserProps.Provider>
    );
  }
}

PerfectZoomWrapper.propTypes = {
  // source: PropTypes.oneOf([PropTypes.shape({
  //   url: PropTypes.string,
  //   size: PropTypes.arrayOf(PropTypes.number)
  // }),
  // PropTypes.shape({

  // })],
  thumbnailSize: PropTypes.arrayOf(PropTypes.number),
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
  allowDownload: false
};

export default PerfectZoomWrapper;
