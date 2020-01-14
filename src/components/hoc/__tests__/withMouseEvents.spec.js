import React from 'react';
import withMouseEvents from '../withMouseEvents';
import { shallow } from 'enzyme';

const Simple = (props) => <div>test mouse events</div>;

// download action should be testes as e2e there is no clean way to do it with enzyme
describe('withMouseEvents higher order function', () => {

  it('forward original HTML from underneath component', () => {
    const Component = withMouseEvents(Simple);
    const wrapper = shallow(<Component />);
    expect(wrapper.html()).toEqual("<div>test mouse events</div>");
  });


  it('add imageRef, positions and events props to original component', () => {
    const Component = withMouseEvents(Simple);
    const wrapper = shallow(<Component />);
    const WrappedComponent = wrapper.dive().dive();
    expect(WrappedComponent.props()).toHaveProperty('positions');
    expect(WrappedComponent.prop('positions')).toEqual({
      clickX: null,
      clickY: null,
      currentX: null,
      currentY: null
    });
    expect(WrappedComponent.props()).toHaveProperty('events');
    Object.values(WrappedComponent.prop('events')).forEach((val) =>
      expect(typeof val).toEqual('function')
    );
    expect(WrappedComponent.props()).toHaveProperty('imageRef');
    expect(WrappedComponent.prop('imageRef').current).toBeNull();
  });

});
