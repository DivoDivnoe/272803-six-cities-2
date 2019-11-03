import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

describe(`CitiesList component`, () => {
  it(`is rendered correctly`, () => {
    const cities = [`Moscow`, `Gatchina`];
    const city = `Gatchina`;

    const tree = renderer
      .create(
          <CitiesList
            cities={cities}
            city={city}
            onChangeCity={jest.fn()}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
