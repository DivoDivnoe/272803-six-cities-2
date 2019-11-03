import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesList from '../cities-list/cities-list.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`CitiesList component`, () => {
  it(`handles click tab event correctly`, () => {
    const cities = [`Moscow`, `Gatchina`];
    const city = `Gatchina`;
    const onChangeCity = jest.fn();
    const clickPrevention = jest.fn();

    const citiesList = mount(
        <CitiesList
          cities={cities}
          city={city}
          onChangeCity={onChangeCity}
        />
    );

    expect(citiesList.find(`a`).first().hasClass(`tabs__item--active`)).toEqual(false);
    expect(citiesList.find(`a`).at(1).hasClass(`tabs__item--active`)).toEqual(true);

    citiesList.find(`a`).first().simulate(`click`, {preventDefault: clickPrevention});
    expect(onChangeCity).toHaveBeenCalledTimes(1);
    expect(onChangeCity).toHaveBeenCalledWith(`Moscow`);
    expect(clickPrevention).toHaveBeenCalledTimes(1);
  });
});
