import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withActiveItem from './with-active-item';

Enzyme.configure({adapter: new Adapter()});

const mockItems = [{id: 1}, {id: 2}, {id: 3}];
const mockComponent = (props) => (
  <div>
    <ul>
      {mockItems.map((item, index) => (
        <li
          key={`item-${index}`}
          onMouseEnter={() => props.onChangeActiveItem(item)}
          onMouseLeave={props.onResetActiveItem}
        />
      ))}
    </ul>
  </div>
);

mockComponent.propTypes = {
  onChangeActiveItem: PropTypes.func.isRequired,
  onResetActiveItem: PropTypes.func.isRequired
};

describe(`component, returned by withActiveItem function`, () => {
  it(`switches state correctly`, () => {
    const Component = withActiveItem(mockComponent);
    const wrapper = mount(<Component />);

    expect(wrapper.state().activeItem).toEqual({});

    wrapper.find(`li`).at(1).simulate(`mouseenter`);
    expect(wrapper.state().activeItem).toEqual({id: 2});

    wrapper.find(`li`).at(1).simulate(`mouseleave`);
    expect(wrapper.state().activeItem).toEqual({});
  });
});
