import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`MainPage component`, () => {
  const offers = [
    {
      type: `apartment`,
      price: 0,
      rating: 0,
      picture: `some src"`,
      description: `some description`,
      isPremium: false,
    }
  ];

  it(`has .cities class(stupid test)`, () => {
    const mainPage = mount(
        <MainPage
          offers={offers}
        />
    );

    expect(mainPage.find(`.cities`).length).toBe(1);
  });
});
