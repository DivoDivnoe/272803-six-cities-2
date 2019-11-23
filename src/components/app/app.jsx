import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import MainPage from '../main-page/main-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';

import {Operation as DataOperation} from '../../reducer/data/data';
import {getCities, getOffers} from '../../reducer/data/selectors';
import {ActionCreator as AppActionCreator} from '../../reducer/application/application';
import {getCity} from '../../reducer/application/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';
import {getIsAuthRequired, getUserData} from '../../reducer/user/selectors';
import {getServerRespondingStatus} from '../../reducer/server/selectors';

import withSortType from '../../hocs/with-sort-type/with-sort-type';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import withLogin from '../../hocs/with-login/with-login';
import withServerStatus from '../../hocs/with-server-status/with-server-status';

import {getRandomNumber} from '../../utils';

const MainPageWithState = withActiveItem(withSortType(MainPage));
const OfferPageWithActiveItem = withActiveItem(OfferPage);
const SignInPageWithState = compose(withServerStatus, withLogin)(SignInPage);

class App extends PureComponent {
  componentDidMount() {
    this.props.loadOffers();
    this.props.authUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cities.length !== prevProps.cities.length) {
      const {cities} = this.props;
      const index = getRandomNumber(cities.length);

      this.props.onChangeCity(this.props.cities[index]);
    }
  }

  _getPageScreen() {
    const {pathname} = location;
    const {
      leaflet,
      reviews,
      city,
      cities,
      offers,
      user,
      isAuthorizationRequired,
      setUserData,
      onChangeCity
    } = this.props;

    if (pathname === `/`) {
      if (isAuthorizationRequired) {
        return <SignInPageWithState user={user} onSubmit={setUserData} />;
      }

      return (
        <MainPageWithState
          offers={offers}
          leaflet={leaflet}
          city={city}
          cities={cities}
          user={user}
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
          user={user}
        />
      );
    }

    return null;
  }

  render() {
    return this._getPageScreen();
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
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.strins,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }).isRequired,
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  isServerResponding: PropTypes.bool.isRequired,
  loadOffers: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getCity(state),
  offers: getOffers(state),
  cities: getCities(state),
  isAuthorizationRequired: getIsAuthRequired(state),
  user: getUserData(state),
  isServerResponding: getServerRespondingStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => dispatch(DataOperation.loadOffers()),
  onChangeCity: (city) => dispatch(AppActionCreator.changeCity(city)),
  authUser: () => dispatch(UserOperation.authUser()),
  setUserData: (data, callback) => dispatch(UserOperation.setUserData(data, callback))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
