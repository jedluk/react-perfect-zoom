import React from 'react';
import { Thumbnail } from '../Thumbnail';
import { shallow } from 'enzyme';

describe('Thumbnail component', () => {
  const source = {
    thumbnail: {
      url: 'image.jpg',
      size: [300, 500]
    }
  };
  const positions = {
    currentX: 10,
    currentY: 10,
    clickX: null,
    clickY: null
  };

  it('render image picker container', () => {
    positions.clickX = null;
    positions.clickY = null;
    const wrapper = shallow(
      <Thumbnail imageRef={React.createRef()} source={source} positions={positions} />
    );
    expect(wrapper.at(0).hasClass('perfect-zoom-image-picker')).toBeTruthy();
    // no rectangle !! (only image exists)
    expect(wrapper.children().length).toEqual(1);
  });

  it('render rectangle when positions are set', () => {
      positions.clickX = 100;
      positions.clickY = 100;
      const wrapper = shallow(
        <Thumbnail imageRef={React.createRef()} source={source} positions={positions} />
      );
      expect(wrapper.children().length).toEqual(2);
  });
});
