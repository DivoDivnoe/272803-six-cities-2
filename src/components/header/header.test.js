import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../hotel-cards-list/hotel-cards-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../cities-list/cities-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../sorting/sorting.jsx`, () => jest.fn().mockReturnValue(null));

describe(`MainPage component`, () => {
  it(`is rendered correctly`, () => {
    const user = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: true
    };

    const tree = renderer
      .create(<Header user={user} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
