import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

describe(`MainPage component`, () => {
  it(`is rendered correctly`, () => {
    const offers = [
      {
        type: `apartment`,
        price: 0,
        rating: 0,
        picture: `some src"`,
        description: `some description`,
        isPremium: false,
      }
    ];

    const tree = renderer
      .create(
          <MainPage
            offers={offers}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
