import React from 'react';
import renderer from 'react-test-renderer';
import OfferPage from './offer-page.jsx';

jest.mock(`../reviews-list/reviews-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../comment-form/comment-form.jsx`, () => jest.fn().mockReturnValue(null));

describe(`OfferPage component`, () => {
  it(`is rendered correctly`, () => {
    const id = 1;
    const offers = [
      {
        id: 1,
        city: {
          name: `somecity`,
          location: {
            latitude: 0,
            longitude: 0,
            zoom: 1
          }
        },
        type: `apartment`,
        price: 0,
        rating: 0,
        previewImage: `some/src`,
        images: [`some/src`],
        title: `some title`,
        goods: [`first`, `second`],
        bedrooms: 0,
        maxAdults: 0,
        description: `some desc.`,
        isPremium: true,
        isFavorite: false,
        host: {
          id: 1,
          isPro: true,
          name: `Angelina`,
          avatarUrl: `some/src`
        },
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 1
        }
      }];

    const reviews = [
      {
        id: 1,
        user: {
          id: 1,
          isPro: true,
          name: `Trump`,
          avatarUrl: `some/src`
        },
        rating: 1,
        comment: `some comment`,
        date: `2019-05-08T14:13:56.569Z`
      }];
    const user = {
      id: 1,
      email: ``,
      name: ``,
      avatarUrl: ``,
      isPro: true
    };
    const leaflet = jest.genMockFromModule(`leaflet`);
    const onChangeActiveItem = jest.fn();
    const onResetActiveItem = jest.fn();
    const loadReviews = jest.fn();
    const postReview = jest.fn();

    const tree = renderer.create(
        <OfferPage
          id={id}
          offers={offers}
          activeItem={offers[0]}
          reviews={reviews}
          leaflet={leaflet}
          user={user}
          onChangeActiveItem={onChangeActiveItem}
          onResetActiveItem={onResetActiveItem}
          onPostReview={postReview}
          onLoadReviews={loadReviews}
        />
    );

    expect(tree).toMatchSnapshot();
  });
});
