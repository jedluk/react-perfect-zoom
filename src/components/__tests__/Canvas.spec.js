import React from 'react';
import Canvas from '../Canvas';
import { shallow } from 'enzyme';

// download action should be testes as e2e there is no clean way to do it with enzyme
describe('Canvas component', () => {
  const positions = {
    currentX: 10,
    currentY: 10,
    clickX: 5,
    clickY: 5
  };
  const image = {
    naturalHeight: 500,
    clientHeight: 300
  };
  it('render nothing when positions are not valid or no image is provided', () => {
    const wrapper = shallow(<Canvas />);
    expect(wrapper.html()).toBeNull();
    wrapper.setProps({ positions });
    expect(wrapper.html()).toBeNull();
    wrapper.setProps({ positions: undefined, image });
    expect(wrapper.html()).toBeNull();
  });
  it('render canvas element with width and height set to numbers when correct props are provideed', () => {
    const wrapper = shallow(<Canvas positions={positions} image={image} />);
    expect(wrapper.find('.perfect-zoom-canvas').length).toEqual(1);
    expect(typeof wrapper.find('.perfect-zoom-canvas').prop('width')).toEqual('number');
    expect(typeof wrapper.find('.perfect-zoom-canvas').prop('height')).toEqual('number');
  });
});
