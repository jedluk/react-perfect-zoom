import React from 'react';
import withMouseEvents from '../withMouseEvents';
import { shallow } from 'enzyme';

const Simple = (props) => <div>test</div>;
// download action should be testes as e2e there is no clean way to do it with enzyme
describe('withMouseEvents higher order component', () => {
  it('add positions, events and imageRef to underneath component', () => {
    const Component = withMouseEvents(Simple);
    const wrapper = shallow(<Component />);
    expect(wrapper.props()).toHaveProperty('positions');
    expect(wrapper.prop('positions')).toEqual({
      clickX: null,
      clickY: null,
      currentX: null,
      currentY: null
    });
    expect(wrapper.props()).toHaveProperty('events');
    Object.values(wrapper.prop('events')).forEach((val) =>
      expect(typeof val).toEqual('function')
    );
    expect(wrapper.props()).toHaveProperty('imageRef');
    expect(wrapper.prop('imageRef').current).toBeNull();
  });
  it('forward all props from underneath component', () => {
    const Component = withMouseEvents(Simple);
    const wrapper = shallow(<Component test1={2} test2="test" />);
    expect(wrapper.props()).toHaveProperty('test1');
    expect(wrapper.props()).toHaveProperty('test2');
  });
});
