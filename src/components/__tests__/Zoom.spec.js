import React from 'react';
import { Zoom } from '../Zoom';
import Canvas from '../Canvas';
import { shallow } from 'enzyme';
import { realImageStates } from '../../lib/imageState';

describe('Zoom component', () => {
  const positions = {
    currentX: 25,
    currentY: 20,
    clickX: 10,
    clickY: 10
  };
  const thumbnailRef = {
    current: {
      naturalHeight: 900,
      naturalWidth: 1600,
      clientHeight: 500,
      clientWidth: 300
    }
  };
  const source = {
    url: 'image.jpg'
  };

  it('render nothing when positions are not passed or positions are not numbers', () => {
    const wrapper = shallow(
      <Zoom source={source} positions={{}} align="center" placement="right" />
    );
    wrapper.debug();
    expect(wrapper.children().length).toEqual(0);
    wrapper.setProps({ thumbnailRef });
    expect(wrapper.children().length).toEqual(0);
    wrapper.setProps({ positions: { ...positions, currentX: 'not a number' } });
    expect(wrapper.children().length).toEqual(0);
  });

  it('render image and image container when reference is passsed', () => {
    const wrapper = shallow(
      <Zoom
        source={source}
        thumbnailRef={thumbnailRef}
        positions={positions}
        placement="right"
        align="center"
      />
    );

    expect(wrapper.find("[alt='realImage']")).toBeDefined();
    expect(wrapper.find('.perfect-zoom-container')).toBeDefined();
  });

  it('apply margin to image / top and left property to container when real image is loaded', () => {
    const wrapper = shallow(
      <Zoom
        source={source}
        thumbnailRef={thumbnailRef}
        positions={positions}
        placement="right"
        align="center"
        realImageState={realImageStates.LOADED}
      />
    );
    expect(wrapper.find('.perfect-zoom-container').prop('style')).toHaveProperty('top');
    expect(wrapper.find('.perfect-zoom-container').prop('style')).toHaveProperty('left');
    expect(
      Object.keys(wrapper.find("[alt='realImage']").prop('style')).every((key) =>
        /^margin/.test(key)
      )
    ).toBeTruthy();
  });

  it('does not apply margin styles when real image is not loaded', () => {
    const wrapper = shallow(
      <Zoom
        source={source}
        thumbnailRef={thumbnailRef}
        positions={positions}
        placement="right"
        align="center"
        realImageState={realImageStates.IN_PROGRESS}
      />
    );
    expect(wrapper.find('.perfect-zoom-container').prop('style')).toBeUndefined();
  })

  it('render Canvas component based on allowDownload props truthfulness', () => {
    const wrapper = shallow(
      <Zoom
        allowDownload
        thumbnailRef={thumbnailRef}
        source={source}
        placement="right"
        align="center"
        positions={positions}
      />
    );
    expect(wrapper.find(Canvas)).toHaveLength(1);
    wrapper.setProps({ allowDownload: false });
    expect(wrapper.find(Canvas)).toHaveLength(0);
  });
});
