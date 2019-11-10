import React, {PureComponent} from 'react';
import Sorting from '../../components/sorting/sorting.jsx';
import {SortType} from '../../constants';
import withOpened from '../with-opened/with-opened';

const SortTypeWithOpened = withOpened(Sorting);

const withSortingType = (Component) => {
  class WithSortingType extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        sortType: SortType.POPULAR
      };

      this.handleChangeSortType = this.handleChangeSortType.bind(this);
    }

    handleChangeSortType(sortType) {
      this.setState({sortType});
    }

    render() {
      const {sortType} = this.state;

      return (
        <Component
          {...this.props}
          sortType={sortType}
          renderSorting={() => (
            <SortTypeWithOpened
              sortType={sortType}
              onChangeSortType={this.handleChangeSortType}
            />
          )}
        />
      );
    }
  }

  WithSortingType.propTypes = {};

  return WithSortingType;
};

export default withSortingType;
