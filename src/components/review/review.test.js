import React from 'react';
import renderer from 'react-test-renderer';
import Review from './review.jsx';

describe(`Review component`, () => {
  it(`is rendered correctly`, () => {
    const review = {
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
    };

    const tree = renderer
      .create(
          <Review
            review={review}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
