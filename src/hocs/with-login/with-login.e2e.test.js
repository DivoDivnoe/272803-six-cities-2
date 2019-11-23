import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withLogin from './with-login';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {email, password, onChange} = props;

  const handleChange = (evt) => {
    const {target} = evt;
    const {name: fieldName, value} = target;

    onChange(fieldName, value);
  };

  return (
    <form>
      <input value={email} onChange={handleChange} />
      <input value={password} onChange={handleChange} />
    </form>
  );
};

MockCompoment.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};


describe(`Component return by withLogin function`, () => {
  it(`has empty fields by default`, () => {
    const MockComponentWrapped = withLogin(MockCompoment);

    const wrapper = mount(
        <MockComponentWrapped />
    );

    expect(wrapper.find(`input`).at(0).props().value).toEqual(``);
    expect(wrapper.find(`input`).at(1).props().value).toEqual(``);
  });

  it(`changes state correctly`, () => {
    const MockComponentWrapped = withLogin(MockCompoment);

    const wrapper = mount(
        <MockComponentWrapped />
    );

    wrapper.find(`input`).first().simulate(`change`, {
      target: {
        name: `email`,
        value: `some name`
      }
    });
    expect(wrapper.state().email).toEqual(`some name`);
  });
});
