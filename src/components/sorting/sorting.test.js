import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';

describe(`Sorting component`, () => {
  it(`is rendered correctly`, () => {
    const sortType = `POPULAR`;
    const onChangeSortType = jest.fn();

    const tree = renderer
      .create(
          <Sorting
            sortType={sortType}
            onChangeSortType={onChangeSortType}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
