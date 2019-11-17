import React from 'react';
import renderer from 'react-test-renderer';
import HotelCardsList from './hotel-cards-list.jsx';

jest.mock(`../hotel-card/hotel-card.jsx`, () => jest.fn().mockReturnValue(null));

describe(`HotelCardsList component`, () => {
  it(`is rendered correctly`, () => {
    const classNames = [``];

    const offers = [
      {
        id: 1,
        city: {
          name: `somecity`,
          location: {
            latitude: 0,
            longitude: 0,
            zoom: 1
          }
        },
        type: `apartment`,
        price: 0,
        rating: 0,
        previewImage: `some/src`,
        images: [`some/src`],
        title: `some title`,
        goods: [`first`, `second`],
        bedrooms: 0,
        maxAdults: 0,
        description: `some desc.`,
        isPremium: true,
        isFavorite: false,
        host: {
          id: 1,
          isPro: true,
          name: `Angelina`,
          avatarUrl: `some/src`
        },
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 1
        }
      }
    ];
    const onActiveHotel = jest.fn();
    const onDisactiveHotel = jest.fn();

    const tree = renderer
      .create(
          <HotelCardsList
            offers={offers}
            classNames={classNames}
            onActiveHotel={onActiveHotel}
            onDisactiveHotel={onDisactiveHotel}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
