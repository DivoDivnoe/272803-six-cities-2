import React from 'react';
import PropTypes from 'prop-types';
import {SortTypeText} from '../../constants';

const Sorting = (props) => {
  const {sortType, onChangeSortType, isOpened, onToggle} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={onToggle}>
        {SortTypeText[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened && <ul className="places__options places__options--custom places__options--opened">
        {Object.keys(SortTypeText).map((key, index) => {
          return (
            <li
              className={`places__option ${sortType === key ? `places__option--active` : ``}`}
              tabIndex="0"
              key={`sortType-${index}`}
              onClick={() => {
                onToggle();
                onChangeSortType(key);
              }}
            >
              {SortTypeText[key]}
            </li>
          );
        })}
      </ul>}
    </form>
  );
};

Sorting.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  sortType: PropTypes.oneOf(Object.keys(SortTypeText)).isRequired,
  onChangeSortType: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Sorting;
