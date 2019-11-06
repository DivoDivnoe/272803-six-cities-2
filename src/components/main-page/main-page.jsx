import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import HotelCardsList from '../hotel-cards-list/hotel-cards-list.jsx';
import Map from '../map/map.jsx';
import Sorting from '../sorting/sorting.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import {SortType, DEFAULT_ACTIVE_HOTEL_INDEX} from '../../constants';

class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortType: SortType.POPULAR,
      activeHotel: DEFAULT_ACTIVE_HOTEL_INDEX
    };

    this._handleChangeSortType = this._handleChangeSortType.bind(this);
    this.handleActiveHotel = this.handleActiveHotel.bind(this);
    this.handleDisactiveHotel = this.handleDisactiveHotel.bind(this);
  }

  render() {
    const {offers, leaflet, city, cities, onChangeCity} = this.props;

    if (!offers.length) {
      return null;
    }

    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    const cityCoords = filteredOffers[0].city.location;
    const hotels = filteredOffers.map((offer) => offer.location);
    const classNames = [`cities__places-list`, `places__list`, `tabs__content`];

    let sortedOffers = MainPage.getSortedOffers(filteredOffers, this.state.sortType);

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList cities={cities} city={city} onChangeCity={onChangeCity} />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} place{filteredOffers.length > 1 ? `s` : ``} to stay in {city}</b>

                <Sorting sortType={this.state.sortType} onChangeSortType={this._handleChangeSortType} />
                <HotelCardsList
                  offers={sortedOffers}
                  classNames={classNames}
                  onActiveHotel={this.handleActiveHotel}
                  onDisactiveHotel={this.handleDisactiveHotel}
                />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map" style={{background: `none`}}>
                  <Map
                    coords={{city: cityCoords, hotels}}
                    leaflet={leaflet}
                    city={city}
                    activeHotel={this.state.activeHotel}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  static getSortedOffers(offers, sortType) {
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
  }

  _handleChangeSortType(sortType) {
    this.setState({sortType});
  }

  handleActiveHotel(offer) {
    const index = this.props.offers.findIndex((item) => item.id === offer.id);

    this.setState({activeHotel: index});
  }

  handleDisactiveHotel() {
    this.setState({activeHotel: DEFAULT_ACTIVE_HOTEL_INDEX});
  }
}

MainPage.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
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
  onChangeCity: PropTypes.func.isRequired
};

export default MainPage;
