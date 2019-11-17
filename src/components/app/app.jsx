import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

import {Operation} from '../../reducer/data/data';
import {getCities, getOffers} from '../../reducer/data/selectors';
import {ActionCreator as AppActionCreator} from '../../reducer/application/application';
import {getCity} from '../../reducer/application/selectors';

import withSortType from '../../hocs/with-sort-type/with-sort-type';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const MainPageWithState = withActiveItem(withSortType(MainPage));
const OfferPageWithActiveItem = withActiveItem(OfferPage);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return this._getPageScreen();
  }

  componentDidMount() {
    this.props.loadOffers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cities.length !== prevProps.cities.length) {
      this.props.onChangeCity(this.props.cities[0]);
    }
  }

  _getPageScreen() {
    const {pathname} = location;
    const {leaflet, reviews, city, cities, offers, onChangeCity} = this.props;

    if (pathname === `/`) {
      return (
        <MainPageWithState
          offers={offers}
          leaflet={leaflet}
          city={city}
          cities={cities}
          onChangeCity={onChangeCity}
        />);
    }

    const [path, id] = pathname.slice(1).split(`/`);

    if (path === `offer`) {
      return (
        <OfferPageWithActiveItem
          offers={offers}
          leaflet={leaflet}
          reviews={reviews}
          id={+id}
          city={city}
        />
      );
    }

    return null;
  }
}

App.propTypes = {
  leaflet: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        city: PropTypes.exact({
          name: PropTypes.string.isRequired,
          location: PropTypes.exact({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired
          }).isRequired
        }).isRequired,
        type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        previewImage: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        goods: PropTypes.arrayOf(PropTypes.string).isRequired,
        bedrooms: PropTypes.number.isRequired,
        maxAdults: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        host: PropTypes.exact({
          id: PropTypes.number.isRequired,
          isPro: PropTypes.bool.isRequired,
          name: PropTypes.string.isRequired,
          avatarUrl: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.exact({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        }).isRequired
      })).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    user: PropTypes.exact({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadOffers: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  offers: getOffers(state),
  cities: getCities(state)
});
const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => dispatch(Operation.loadOffers()),
  onChangeCity: (city) => dispatch(AppActionCreator.changeCity(city))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
