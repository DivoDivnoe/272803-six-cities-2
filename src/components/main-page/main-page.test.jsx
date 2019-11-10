import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../hotel-cards-list/hotel-cards-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../cities-list/cities-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../sorting/sorting.jsx`, () => jest.fn().mockReturnValue(null));

describe(`MainPage component`, () => {
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
          longitude: 0,
          zoom: 1
        }
      }
    ];

    const leaflet = jest.genMockFromModule(`leaflet`);
    const city = `somecity`;
    const cities = [`somecity`];
    const sortType = `POPULAR`;
    const onChangeCity = jest.fn();
    const renderSorting = jest.fn();
    const onChangeActiveItem = jest.fn();
    const onResetActiveItem = jest.fn();

    const tree = renderer
      .create(
          <MainPage
            sortType={sortType}
            offers={offers}
            activeItem={offers[0]}
            leaflet={leaflet}
            cities={cities}
            city={city}
            onChangeCity={onChangeCity}
            renderSorting={renderSorting}
            onChangeActiveItem={onChangeActiveItem}
            onResetActiveItem={onResetActiveItem}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
