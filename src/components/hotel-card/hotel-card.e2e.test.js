import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HotelCard from './hotel-card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`HotelCard component`, () => {
  it(`handles mouseenter event correctly`, () => {
    const mocks = {
      data: {
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
      },
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn()
    };
    const {data, onMouseEnter, onMouseLeave} = mocks;

    const hotelCard = shallow(
        <HotelCard
          data={data}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
    );

    hotelCard.simulate(`mouseenter`);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(data);

    hotelCard.simulate(`mouseleave`);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
