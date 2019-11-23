import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list.jsx';

jest.mock(`../review/review.jsx`, () => jest.fn().mockReturnValue(null));

describe(`ReviewsList component`, () => {
  it(`is rendered correctly`, () => {
    const reviews = [
      {
        id: 1,
        user: {
          id: 1,
          isPro: true,
          name: `Trump`,
          avatarUrl: `some/src`
        },
        rating: 1,
        comment: `some comment`,
        date: `2019-05-08T14:13:56.569Z`
      }];

    const id = 1;
    const serverStatus = 200;
    const onChangeServerStatus = jest.fn();
    const onLoadReviews = jest.fn();

    const tree = renderer
      .create(
          <ReviewsList
            id={id}
            reviews={reviews}
            serverStatus={serverStatus}
            onChangeServerStatus={onChangeServerStatus}
            onLoadReviews={onLoadReviews}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
