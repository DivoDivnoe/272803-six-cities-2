import React from 'react';
import renderer from 'react-test-renderer';
import Page from './page.jsx';

jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));

describe(`Page component`, () => {
  it(`is rendered correctly`, () => {
    const user = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: true
    };

    const tree = renderer
      .create(<Page user={user} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
