import React from 'react';
import renderer from 'react-test-renderer';
import Cities from './cities.jsx';

jest.mock(`../hotel-cards-list/hotel-cards-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));

describe(`Cities component`, () => {
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
      }];

    const sortType = `POPULAR`;
    const city = `somecity`;
    const leaflet = jest.genMockFromModule(`leaflet`);
    const renderSorting = jest.fn();
    const onChangeActiveItem = jest.fn();
    const onResetActiveItem = jest.fn();

    const tree = renderer
      .create(
          <Cities
            offers={offers}
            city={city}
            sortType={sortType}
            activeItem={offers[0]}
            leaflet={leaflet}
            renderSorting={renderSorting}
            onChangeActiveItem={onChangeActiveItem}
            onResetActiveItem={onResetActiveItem}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
