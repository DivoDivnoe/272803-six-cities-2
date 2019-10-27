import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HotelCard from './hotel-card.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`HotelCard component`, () => {
  it(`handles mouseenter event correctly`, () => {
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
