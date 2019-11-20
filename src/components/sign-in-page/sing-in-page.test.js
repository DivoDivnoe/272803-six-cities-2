import React from 'react';
import renderer from 'react-test-renderer';
import SignInPage from './sign-in-page.jsx';

describe(`SignInPage component`, () => {
  it(`is rendered correctly`, () => {
    const email = `some@mail`;
    const password = `somepass`;
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const tree = renderer
      .create(
          <SignInPage
            email={email}
            password={password}
            onChange={onChange}
            onSubmit={onSubmit}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
