import React from 'react';
import { PerfectZoom } from '../PerfectZoom';
import { shallow } from 'enzyme';

// TODO: e2e tests for entire component
describe('Perfect Zoom component', () => {
  it('render only thumbnail on initial render', () => {
    const wrapper = shallow(
      <PerfectZoom
        imageRef={React.createRef()}
        positions={{
          clickX: null,
          clickY: null,
          posX: null,
          posY: null
        }}
        events={{
          onClick: () => {},
          onMouseMove: () => {}
        }}
      />
    );
    expect(wrapper.at(0).hasClass('pos-relative')).toBeTruthy();
    expect(wrapper.children().length).toEqual(1);
  });
});
