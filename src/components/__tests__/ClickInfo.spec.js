import React from 'react';
import ClickInfo from '../ClickInfo';
import { shallow } from 'enzyme';

describe('ClickInfo component', () => {
  const positions = {
    currentX: 10,
    currentY: 10,
    clickX: 5,
    clickY: 5
  };
  it('display current and click mouse position', () => {
    const wrapper = shallow(<ClickInfo positions={positions} />);

    expect(/Current.*\(\d,\d\)/.test(wrapper.text())).toBeTruthy();
    expect(/Click.*\(\d,\d\)/.test(wrapper.text())).toBeTruthy();
  });
  it('do not display positions when values are not a numbers', () => {
    const wrapper = shallow(<ClickInfo />);
    expect(wrapper.text().trim()).toEqual('');
  });
});
