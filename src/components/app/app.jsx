import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

const getPageScreen = (offers, leaflet, reviews) => {
  const {pathname} = location;

  if (pathname === `/`) {
    return <MainPage offers={offers} leaflet={leaflet} />;
  }

  const [path, id] = pathname.slice(1).split(`/`);

  if (path === `offer`) {
    return <OfferPage offers={offers} leaflet={leaflet} reviews={reviews} id={+id} />;
  }

  return null;
};

const App = (props) => {
  const {offers, leaflet, reviews} = props;

  return getPageScreen(offers, leaflet, reviews);
};

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
  })).isRequired
};

export default App;
