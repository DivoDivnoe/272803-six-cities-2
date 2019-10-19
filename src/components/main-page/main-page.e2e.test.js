import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`MainPage component`, () => {
  const mocks = {
    descriptions: [],
    onClick: jest.fn()
  };

  const {descriptions, onClick} = mocks;

  it(`reacts correctly to clicking the title`, () => {
    const mainPage = shallow(
        <MainPage
          descriptions={descriptions}
          onClick={onClick}
        />
    );

    const header = mainPage.find(`header`);
    header.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
