import React from 'react';
import Rectangle from '../Rectangle';
import { shallow } from 'enzyme';

describe('Rectangle component', () => {
  const positions = {
    currentX: 10,
    currentY: 10,
    clickX: 5,
    clickY: 5
  };

  const directions = ['top', 'left', 'right', 'bottom'];
  it('retrun null when positions are not valid', () => {
    const wrapper = shallow(<Rectangle />);
    expect(wrapper.html()).toBeNull();
  });
  it('return 4 divs which represents rectangle borders when positions are valid', () => {
    const wrapper = shallow(<Rectangle positions={positions} />);
    directions.forEach((direction) =>
      expect(wrapper.find(`.perfect-zoom-${direction}-border`)).toBeDefined()
    );
  });
  it('apply top and left styles to all rectangle borders', () => {
    const wrapper = shallow(<Rectangle positions={positions} />);
    directions.forEach((direction) => {
      const style = wrapper.find(`.perfect-zoom-${direction}-border`).prop('style');
      expect(style).toHaveProperty('top');
      expect(style).toHaveProperty('left');
      expect(
        Object.keys(style).some((k) => ['width', 'height'].includes(k))
      ).toBeTruthy();
    });
  });
});
