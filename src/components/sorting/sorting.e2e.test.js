import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sorting from './sorting.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Sorting component`, () => {
  it(`changes sorting type correctly`, () => {
    const sortType = `TOP_RATED`;
    const isOpened = true;
    const onChangeSortType = jest.fn();
    const onToggle = jest.fn();

    const sorting = shallow(
        <Sorting
          isOpened={isOpened}
          sortType={sortType}
          onChangeSortType={onChangeSortType}
          onToggle={onToggle}
        />
    );

    sorting.find(`.places__sorting-type`).simulate(`click`);
    expect(onToggle).toHaveBeenCalledTimes(1);

    sorting.find(`li`).first().simulate(`click`);
    expect(onChangeSortType).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onChangeSortType).toHaveBeenCalledWith(`POPULAR`);
  });
});
