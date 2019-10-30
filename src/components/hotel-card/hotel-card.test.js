import React from 'react';
import renderer from 'react-test-renderer';
import HotelCard from './hotel-card.jsx';

describe(`HotelCard component`, () => {
  it(`is rendered correctly`, () => {
    const mocks = {
      data: {
        id: 1,
        city: {
          name: `somecity`,
          location: {
            latitude: 0,
            longitude: 0
          }
        },
        type: `apartment`,
        price: 0,
        rating: 0,
        picture: `some/src`,
        images: [`some/src`],
        title: `some title`,
        goods: [`first`, `second`],
        bedrooms: 0,
        maxAdults: 0,
        description: `some desc.`,
        isPremium: true,
        host: {
          id: 1,
          isPro: true,
          name: `Angelina`,
          avatarUrl: `some/src`
        },
        location: {
          latitude: 0,
          longitude: 0
        }
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
