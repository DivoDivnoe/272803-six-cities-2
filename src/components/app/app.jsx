import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

const getPageScreen = (offers, leaflet) => {
  const {pathname} = location;

  if (pathname === `/`) {
    return <MainPage offers={offers} leaflet={leaflet} />;
  }

  const [path, id] = pathname.slice(1).split(`/`);

  if (path === `offer`) {
    const data = offers.find((offer) => offer.id === +id);

    return <OfferPage data={data} />;
  }

  return null;
};

const App = (props) => {
  const {offers, leaflet} = props;

  return getPageScreen(offers, leaflet);
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
          longitude: PropTypes.number.isRequired
        }).isRequired
      })).isRequired,
};

export default App;
