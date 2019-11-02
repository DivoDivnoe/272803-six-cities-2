import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

describe(`Map component`, () => {
  it(`is rendered correctly`, () => {
    const coords = {
      city: {
        latitude: 0,
        longitude: 0
      },
      hotels: [
        {
          latitude: 10,
          longitude: 10
        }
      ]
    };

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
        <Map coords={coords} leaflet={leaflet} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
