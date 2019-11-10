import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';

describe(`Sorting component`, () => {
  it(`is rendered correctly`, () => {
    const sortType = `POPULAR`;
    const isOpened = true;
    const onChangeSortType = jest.fn();
    const onToggle = jest.fn();

    const tree = renderer
      .create(
          <Sorting
            isOpened={isOpened}
            sortType={sortType}
            onChangeSortType={onChangeSortType}
            onToggle={onToggle}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
