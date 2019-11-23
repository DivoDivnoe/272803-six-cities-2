import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withCommentData from './with-comment-data';

Enzyme.configure({adapter: new Adapter()});

const MockCompoment = (props) => {
  const {rating, review, onChange} = props;

  const handleChange = (evt) => {
    const {target} = evt;
    const {name: fieldName, value} = target;

    onChange(fieldName, value);
  };

  return (
    <form>
      <input type="radio" value="5" onChange={handleChange} checked={rating === 5} />
      <input type="radio" value="1" onChange={handleChange} checked={rating === 1} />
      <textarea onChange={handleChange} value={review} />
    </form>
  );
};

MockCompoment.propTypes = {
  rating: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};


describe(`Component return by withCommentData function`, () => {
  it(`has empty fields by default`, () => {
    const MockComponentWrapped = withCommentData(MockCompoment);

    const wrapper = mount(
        <MockComponentWrapped />
    );

    expect(wrapper.find(`input[checked="checked"]`)).toHaveLength(0);
    expect(wrapper.find(`textarea`).props().value).toEqual(``);
  });

  it(`changes state correctly`, () => {
    const MockComponentWrapped = withCommentData(MockCompoment);

    const wrapper = mount(
        <MockComponentWrapped />
    );

    wrapper.find(`input`).first().simulate(`change`, {
      target: {
        name: `rating`,
        value: `5`
      }
    });
    expect(wrapper.state().rating).toEqual(`5`);
  });
});
