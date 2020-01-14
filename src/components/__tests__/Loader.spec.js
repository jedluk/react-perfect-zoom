import React from 'react';
import Loader from '../Loader';
import { shallow } from 'enzyme';

describe('Loader component', () => {
  it('display bouncing loader stack', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.at(0).hasClass('bouncing-loader')).toBeTruthy();
    expect(wrapper.children().length).toEqual(3);
  });
  it('add custom styles to bouncing loader stack', () => {
    const wrapper = shallow(<Loader position={{ top: 10, left: 20 }} color="#ccffaa" />);
    expect(wrapper.at(0).prop('style')).toEqual({ top: 10, left: 20 });
    wrapper
      .children()
      .forEach((child) =>
        expect(child.prop('style')).toEqual({ backgroundColor: '#ccffaa' })
      );
  });
});
