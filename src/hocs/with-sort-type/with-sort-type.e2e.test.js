import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withSortType from './with-sort-type';

Enzyme.configure({adapter: new Adapter()});

const mockComponent = (props) => (
  <div>
    {props.renderSorting()}
  </div>
);

mockComponent.propTypes = {
  renderSorting: PropTypes.func.isRequired
};

describe(`component, returned by withSortType function`, () => {
  it(`switches state correctly`, () => {
    const Component = withSortType(mockComponent);
    const wrapper = mount(<Component />);

    expect(wrapper.state().sortType).toEqual(`POPULAR`);

    wrapper.find(`.places__sorting-type`).simulate(`click`);
    wrapper.find(`li`).at(3).simulate(`click`);
    expect(wrapper.state().sortType).toEqual(`TOP_RATED`);
  });
});
