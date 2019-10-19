import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

describe(`MainPage component`, () => {
  it(`is rendered correctly`, () => {
    const descriptions = [`some`, `thing`];

    const tree = renderer
      .create(
          <MainPage
            descriptions={descriptions}
            onClick={jest.fn()}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
