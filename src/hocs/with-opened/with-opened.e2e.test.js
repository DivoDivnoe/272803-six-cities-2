import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withOpened from './with-opened';

Enzyme.configure({adapter: new Adapter()});

const mockComponent = (props) => (
  <div onClick={props.onToggle}>
    {props.isOpened && <span>Some text</span>}
  </div>
);

mockComponent.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

describe(`component, returned by withOpened function`, () => {
  it(`switches state correctly`, () => {
    const Component = withOpened(mockComponent);

    const wrapper = mount(<Component />);

    expect(wrapper.find(`span`)).toHaveLength(0);

    wrapper.find(`div`).simulate(`click`);
    expect(wrapper.find(`span`)).toHaveLength(1);
  });
});
