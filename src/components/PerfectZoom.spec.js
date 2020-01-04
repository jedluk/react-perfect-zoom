import React from 'react';
import PerfectZoom from './PerfectZoom';
import { mount } from 'enzyme';

// TODO: e2e tests for entire component
describe('Perfect Zoom component', () => {
  it('render thumbnail on initial render', () => {
    const wrapper = mount(
      <PerfectZoom placement="right" source="image.jpg" size={[200, 300]} />
    );
    expect(wrapper.find("[alt='thumbnail']").length).toEqual(1);
    expect(wrapper.find("[alt='thumbnail']").length).toEqual(1);
  });
});
