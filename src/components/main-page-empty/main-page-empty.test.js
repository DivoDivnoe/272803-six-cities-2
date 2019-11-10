import React from 'react';
import renderer from 'react-test-renderer';
import MainPageEmpty from './main-page-empty.jsx';

describe(`MainPageEmpty component`, () => {
  it(`is rendered correctly`, () => {
    const tree = renderer
      .create(<MainPageEmpty/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
