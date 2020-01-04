import React from 'react';
import Zoom from './Zoom';
import Canvas from './Canvas';
import { shallow } from 'enzyme';

describe('Zoom component', () => {
  const positions = { currentX: 25, currentY: 20, clickX: 10, clickY: 10 };
  const imgRef = {
    current: { naturalHeight: 900, naturalWidth: 1600, clientHeight: 500 }
  };

  it('render nothing when image reference is not provided', () => {
    const wrapper = shallow(<Zoom />);
    expect(wrapper.children().length).toEqual(0);
    wrapper.setProps({ positions });
    expect(wrapper.children().length).toEqual(0);
  });

  it('render nothing when positions are not passed or positions are not numbers', () => {
    const wrapper = shallow(<Zoom />);
    expect(wrapper.children().length).toEqual(0);
    wrapper.setProps({ imgRef });
    expect(wrapper.children().length).toEqual(0);
    wrapper.setProps({ positions: { ...positions, currentX: 'not a number' } });
    expect(wrapper.children().length).toEqual(0);
  });

  it('render image and image container whenreference is passsed', () => {
    const wrapper = shallow(<Zoom imgRef={imgRef} positions={positions} />);
    expect(wrapper.find("[alt='realImage']")).toBeDefined();
    expect(wrapper.find('.perfect-zoom-container')).toBeDefined();
  });

  it('apply margin to image / top and left property to container', () => {
    const wrapper = shallow(<Zoom imgRef={imgRef} positions={positions} />);
    expect(wrapper.find('.perfect-zoom-container').prop('style')).toHaveProperty('top');
    expect(wrapper.find('.perfect-zoom-container').prop('style')).toHaveProperty('left');
    expect(
      Object.keys(wrapper.find("[alt='realImage']").prop('style')).every((key) =>
        /^margin/.test(key)
      )
    ).toBeTruthy();
  });

  it('render Canvas component based on allowDownload props truthfulness', () => {
    const wrapper = shallow(
      <Zoom allowDownload imgRef={imgRef} placement="right" positions={positions} />
    );
    expect(wrapper.find(Canvas)).toHaveLength(1);
    wrapper.setProps({ allowDownload: false });
    expect(wrapper.find(Canvas)).toHaveLength(0);
  });
});
