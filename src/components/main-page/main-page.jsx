import React from 'react';
import PropTypes from 'prop-types';
import CitiesList from '../cities-list/cities-list.jsx';
import Page from '../page/page.jsx';
import Cities from '../cities/cities.jsx';
import {SortType} from '../../constants';

const MainPage = (props) => {
  const {
    offers,
    leaflet,
    city,
    cities,
    sortType,
    activeItem,
    renderSorting,
    onChangeCity,
    onChangeActiveItem,
    onResetActiveItem
  } = props;

  if (!offers.length || !city) {
    return null;
  }

  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  return (
    <Page mods={[`gray`, `main`]}>
      <main className={
        `page__main page__main--index ${!filteredOffers.length ? `page__main--index-empty` : `` }`
      }>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={cities} city={city} onChangeCity={onChangeCity} />
        <Cities
          offers={filteredOffers}
          activeItem={activeItem}
          city={city}
          sortType={sortType}
          leaflet={leaflet}
          renderSorting={renderSorting}
          onChangeActiveItem={onChangeActiveItem}
          onResetActiveItem={onResetActiveItem}
        />
      </main>
    </Page>
  );
};

MainPage.propTypes = {
  sortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    previewImage: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    goods: PropTypes.arrayOf(PropTypes.string),
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    description: PropTypes.string,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
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
  onChangeCity: PropTypes.func.isRequired,
  renderSorting: PropTypes.func.isRequired,
  onChangeActiveItem: PropTypes.func.isRequired,
  onResetActiveItem: PropTypes.func.isRequired
};

export default MainPage;
