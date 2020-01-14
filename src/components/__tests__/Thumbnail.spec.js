import React from 'react';
import Thumbnail from '../Thumbnail';
import { shallow } from 'enzyme';

describe('Thumbnail component', () => {
  it('pass props to image element', () => {
    const source = 'image.jpg';
    const positions = {
      currentX: 10,
      currentY: 10,
      clickX: 1,
      clickY: 10
    };
    const size = [300, 500];
    const wrapper = shallow(
      <Thumbnail
        ref={React.createRef()}
        size={size}
        source={source}
        positions={positions}
      />
    );
    expect(wrapper.find("[alt='thumbnail']").length).toEqual(1);
    expect(wrapper.find("[alt='thumbnail']").prop('src')).toEqual(source);
    expect(wrapper.find("[alt='thumbnail']").prop('style')).toHaveProperty(
      'maxHeight',
      size[0]
    );
    expect(wrapper.find("[alt='thumbnail']").prop('style')).toHaveProperty(
      'maxWidth',
      size[1]
    );
  });
});
