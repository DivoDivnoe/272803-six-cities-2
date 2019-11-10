import React from 'react';
import renderer from 'react-test-renderer';
import CitiesWrapper from './cities-wrapper.jsx';

describe(`MainPage component`, () => {
  it(`is rendered correctly`, () => {
    const offers = 1;

    const tree = renderer
      .create(<CitiesWrapper offers={offers} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
