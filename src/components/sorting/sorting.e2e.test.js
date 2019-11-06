import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sorting from './sorting.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Sorting component`, () => {
  it(`changes sorting type correctly`, () => {
    const sortType = `TOP_RATED`;
    const onChangeSortType = jest.fn();

    const sorting = shallow(
        <Sorting
          sortType={sortType}
          onChangeSortType={onChangeSortType}
        />
    );

    sorting.find(`.places__sorting-type`).simulate(`click`);
    expect(sorting.state(`isOpened`)).toEqual(true);

    sorting.find(`li`).first().simulate(`click`);
    expect(onChangeSortType).toHaveBeenCalledTimes(1);
    expect(onChangeSortType).toHaveBeenCalledWith(`POPULAR`);
    expect(sorting.state(`isOpened`)).toEqual(false);
  });
});
