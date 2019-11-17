import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../cities-list/cities-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../hotel-cards-list/hotel-cards-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../reviews-list/reviews-list.jsx`, () => jest.fn().mockReturnValue(null));

describe(`App component`, () => {
  it(`is rendered correctly`, () => {
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
        isFavorite: true,
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

    const leaflet = jest.genMockFromModule(`leaflet`);
    const city = ``;
    const cities = [`Moscow`];
    const setOffers = jest.fn();
    const onChangeCity = jest.fn();
    const setCities = jest.fn();
    const loadOffers = jest.fn();

    const tree = renderer.create(
        <App
          offers={offers}
          leaflet={leaflet}
          reviews={reviews}
          city={city}
          cities={cities}
          setOffers={setOffers}
          onChangeCity={onChangeCity}
          setCities={setCities}
          loadOffers={loadOffers}
        />
    );

    expect(tree).toMatchSnapshot();
  });
});
