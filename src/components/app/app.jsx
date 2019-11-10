import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main-page/main-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {offers} from '../../mocks/offers';
import {ActionCreator, getCitiesListFromOffers} from '../../reducer/reducer';

import withSortType from '../../hocs/with-sort-type/with-sort-type';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const MainPageWithState = withActiveItem(withSortType(MainPage));
const OfferPageWithActiveItem = withActiveItem(OfferPage);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.props.setOffers(offers);
  }

  render() {
    return this._getPageScreen();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offers.length !== this.props.offers.length) {
      const cities = getCitiesListFromOffers(this.props.offers);

      this.props.setCities(cities);
    }

    if (this.props.cities.length !== prevProps.cities.length) {
      this.props.onChangeCity(this.props.cities[0]);
    }
  }

  _getPageScreen() {
    const {pathname} = location;
    const {leaflet, reviews, city, cities, onChangeCity} = this.props;

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
        picture: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        goods: PropTypes.arrayOf(PropTypes.string).isRequired,
        bedrooms: PropTypes.number.isRequired,
        maxAdults: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
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
  setOffers: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  setCities: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offers: state.offers,
  cities: state.cities
});
const mapDispatchToProps = (dispatch) => ({
  setOffers: (items) => dispatch(ActionCreator.setOffers(items)),
  onChangeCity: (city) => dispatch(ActionCreator.changeCity(city)),
  setCities: (items) => dispatch(ActionCreator.setCities(items)),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
