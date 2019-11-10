import React from 'react';
import PropTypes from 'prop-types';
import Map from '../map/map.jsx';
import HotelCardsList from '../hotel-cards-list/hotel-cards-list.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';
import CitiesWrapper from '../cities-wrapper/cities-wrapper.jsx';
import {SortType} from '../../constants';

const getSortedOffers = (offers, sortType) => {
  let sortedOffers;

  switch (sortType) {
    case SortType.POPULAR:
      sortedOffers = offers.slice();
      break;
    case SortType.PRICE_LOW_TO_HIGH:
      sortedOffers = offers.slice().sort((a, b) => a.price - b.price);
      break;
    case SortType.PRICE_HIGH_TO_LOW:
      sortedOffers = offers.slice().sort((a, b) => b.price - a.price);
      break;
    case SortType.TOP_RATED:
      sortedOffers = offers.slice().sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedOffers;
};

const findActiveHotelIndex = (offers, offer) => {
  return offers.findIndex((item) => item.id === offer.id);
};

const Cities = (props) => {
  const {
    offers,
    city,
    sortType,
    activeItem,
    leaflet,
    renderSorting,
    onChangeActiveItem,
    onResetActiveItem
  } = props;

  if (!offers.length) {
    return (
      <CitiesWrapper offers={offers.length}>
        <MainPageEmpty />
      </CitiesWrapper>
    );
  }
  const cityCoords = offers[0].city.location;
  const hotels = offers.map((offer) => offer.location);
  const classNames = [`cities__places-list`, `places__list`, `tabs__content`];

  const sortedOffers = getSortedOffers(offers, sortType);

  return (
    <CitiesWrapper offers={offers.length}>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} place{offers.length > 1 ? `s` : ``} to stay in {city}</b>

        {renderSorting()}

        <HotelCardsList
          offers={sortedOffers}
          classNames={classNames}
          onActiveHotel={onChangeActiveItem}
          onDisactiveHotel={onResetActiveItem}
        />

      </section>
      <div className="cities__right-section">
        <section className="cities__map map" style={{background: `none`}}>
          <Map
            coords={{city: cityCoords, hotels}}
            leaflet={leaflet}
            city={city}
            activeHotel={findActiveHotelIndex(offers, activeItem)}
          />
        </section>
      </div>
    </CitiesWrapper>
  );
};

Cities.propTypes = {
  sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  city: PropTypes.string.isRequired,
  leaflet: PropTypes.object.isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.exact({
      name: PropTypes.string.isRequired,
      location: PropTypes.exact({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired
    }),
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
    price: PropTypes.number,
    rating: PropTypes.number,
    picture: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    goods: PropTypes.arrayOf(PropTypes.string),
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    description: PropTypes.string,
    isPremium: PropTypes.bool,
    host: PropTypes.exact({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired
    }),
    location: PropTypes.exact({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    })
  }).isRequired,
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
  renderSorting: PropTypes.func.isRequired,
  onChangeActiveItem: PropTypes.func.isRequired,
  onResetActiveItem: PropTypes.func.isRequired
};

export default Cities;
