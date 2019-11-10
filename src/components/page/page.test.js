import React from 'react';
import renderer from 'react-test-renderer';
import Page from './page.jsx';

jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));

describe(`Page component`, () => {
  it(`is rendered correctly`, () => {
    const tree = renderer
      .create(<Page/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
