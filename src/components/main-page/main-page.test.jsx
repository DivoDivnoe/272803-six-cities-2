import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

describe(`MainPage component`, () => {
  it(`is rendered correctly`, () => {
    const offers = [
      {
        id: 1,
        type: `apartment`,
        price: 0,
        rating: 0,
        picture: `some/src`,
        images: [`some/src`],
        title: `some title`,
        goods: [`first`, `second`],
        bedrooms: 0,
        maxAdults: 0,
        description: `some desc.`,
        isPremium: true,
        host: {
          id: 1,
          isPro: true,
          name: `Angelina`,
          avatarUrl: `some/src`
        }
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
