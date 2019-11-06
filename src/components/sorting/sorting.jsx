import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SortTypeText} from '../../constants';

class Sorting extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {isOpened: false};

    this._handleToggleState = this._handleToggleState.bind(this);
  }

  render() {
    const {sortType, onChangeSortType} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex="0" onClick={this._handleToggleState}>
          {SortTypeText[sortType]}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        {this.state.isOpened && <ul className="places__options places__options--custom places__options--opened">
          {Object.keys(SortTypeText).map((key, index) => {
            return (
              <li
                className={`places__option ${sortType === key ? `places__option--active` : ``}`}
                tabIndex="0"
                key={`sortType-${index}`}
                onClick={() => {
                  this._handleToggleState();
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
  }

  _handleToggleState() {
    this.setState((prevState) => ({isOpened: !prevState.isOpened}));
  }
}

Sorting.propTypes = {
  sortType: PropTypes.oneOf(Object.keys(SortTypeText)).isRequired,
  onChangeSortType: PropTypes.func.isRequired
};

export default Sorting;
