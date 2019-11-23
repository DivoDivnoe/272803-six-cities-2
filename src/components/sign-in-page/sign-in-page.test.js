import React from 'react';
import renderer from 'react-test-renderer';
import SignInPage from './sign-in-page.jsx';

describe(`SignInPage component`, () => {
  it(`is rendered correctly`, () => {
    const email = `some@mail`;
    const password = `somepass`;
    const serverStatus = 200;
    const user = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: true
    };
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onChangeServerStatus = jest.fn();

    const tree = renderer
      .create(
          <SignInPage
            email={email}
            password={password}
            serverStatus={serverStatus}
            user={user}
            onChange={onChange}
            onSubmit={onSubmit}
            onChangeServerStatus={onChangeServerStatus}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
