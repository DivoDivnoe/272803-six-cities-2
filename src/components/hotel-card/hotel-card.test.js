import React from 'react';
import renderer from 'react-test-renderer';
import HotelCard from './hotel-card.jsx';

describe(`HotelCard component`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      data: {
        type: `apartment`,
        price: 0,
        rating: 0,
        picture: `http://placehold.it/260x200"`,
        description: `some desc`,
        isPremium: true,
      },
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn()
    };
    const {data, onMouseEnter, onMouseLeave} = mocks;

    const tree = renderer.create(
        <HotelCard
          data={data}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
    );

    expect(tree).toMatchSnapshot();
  });
});
