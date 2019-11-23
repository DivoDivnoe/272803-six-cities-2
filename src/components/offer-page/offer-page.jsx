import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import HotelCardsList from '../hotel-cards-list/hotel-cards-list.jsx';
import Page from '../page/page.jsx';
import CommentForm from '../comment-form/comment-form.jsx';
import withCommentData from '../../hocs/with-comment-data/with-comment-data';
import withServerStatus from '../../hocs/with-server-status/with-server-status';

const CommentFormWithState = compose(withServerStatus, withCommentData)(CommentForm);
const ReviewsListWithState = withServerStatus(ReviewsList);

import {MAX_RATING} from '../../constants';
import {findDistance} from '../../utils';

const CLOSEST_HOTELS_AMOUNT = 3;

class OfferPage extends PureComponent {
  render() {
    const {
      offers,
      reviews,
      id,
      leaflet,
      activeItem,
      user,
      onLoadReviews,
      onPostReview,
      onChangeActiveItem,
      onResetActiveItem
    } = this.props;

    if (!offers.length) {
      return null;
    }

    const currentOffer = offers.find((offer) => offer.id === id);
    const closest = OfferPage.findClosestHotels(
        offers.filter((offer) => offer.id !== id && offer.city.name === currentOffer.city.name),
        CLOSEST_HOTELS_AMOUNT,
        currentOffer.location
    );

    const {type, title, description, price, rating, images, goods, bedrooms, maxAdults, isPremium, host, city} = currentOffer;
    const ratingStarsWidth = rating * 100 / MAX_RATING;
    const classNames = [`near-places__list`, `places__list`];

    return (
      <Page user={user}>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((src, index) => (
                  <div className="property__image-wrapper" key={`image-${index}`}>
                    <img className="property__image" src={src} alt={`Photo ${type}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${ratingStarsWidth}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating.toFixed(1)}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    Entire place
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((item, index) => (
                      <li className="property__inside-item" key={`hotel-inside-${index}`} >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={`/${host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                    {host.isPro && (
                      <span className="property__user-status">
                        Pro
                      </span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsListWithState reviews={reviews} id={id} onLoadReviews={onLoadReviews} />
                  {Object.keys(user).length && <CommentFormWithState id={id} onSubmit={onPostReview} />}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map
                coords={{city: city.location, hotels: closest.map((item) => item.location)}}
                leaflet={leaflet}
                activeHotel={OfferPage.findActiveHotelIndex(closest, activeItem)}
                city={currentOffer.city.name}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              {<HotelCardsList
                offers={closest}
                classNames={classNames}
                onActiveHotel={onChangeActiveItem}
                onDisactiveHotel={onResetActiveItem}
              />}
            </section>
          </div>
        </main>
      </Page>
    );
  }

  static findClosestHotels(offers, amount, location) {
    const {latitude, longitude} = location;

    return offers.slice()
      .sort((prev, next) => {
        const {longitude: prevLongitude, latitude: prevLatitude} = prev.location;
        const prevLocation = {latitude: prevLatitude, longitude: prevLongitude};
        const prevDistance = findDistance({latitude, longitude}, prevLocation);

        const {longitude: nextLongitude, latitude: nextLatitude} = next.location;
        const nextLocation = {latitude: nextLatitude, longitude: nextLongitude};
        const nextDistance = findDistance({latitude, longitude}, nextLocation);

        return prevDistance - nextDistance;
      })
      .slice(0, amount);
  }

  static findActiveHotelIndex(offers, offer) {
    return offers.findIndex((item) => item.id === offer.id);
  }
}

OfferPage.propTypes = {
  id: PropTypes.number.isRequired,
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
  onChangeActiveItem: PropTypes.func.isRequired,
  onResetActiveItem: PropTypes.func.isRequired,
  onLoadReviews: PropTypes.func.isRequired,
  onPostReview: PropTypes.func.isRequired
};

export default OfferPage;
