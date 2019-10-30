import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe(`App component`, () => {
  it(`is rendered correctly`, () => {
    const offers = [
      {
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
      }
    ];

    const leaflet = jest.genMockFromModule(`leaflet`);
    leaflet.map = () => {
      return ({
        setView: jest.fn()
      });
    };
    leaflet.icon = jest.fn();
    leaflet.tileLayer = () => {
      return ({
        addTo: jest.fn()
      });
    };
    leaflet.marker = () => {
      return ({
        addTo: jest.fn()
      });
    };

    const tree = renderer.create(

        <App
          offers={offers} leaflet={leaflet}
        />
    );

    expect(tree).toMatchSnapshot();
  });
});
