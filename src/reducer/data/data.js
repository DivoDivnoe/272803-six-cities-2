import {ActionType} from '../../constants';
import {transformObjSnakeToCamel} from '../../utils';
import {StatusCode} from '../../constants';

const initialState = {
  offers: [],
  reviews: []
};

Object.freeze(initialState);

const getFilteredOffers = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city);
};

const Operation = {
  loadOffers: () => (dispatch, _, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          const offers = response.data.map((offer) => transformObjSnakeToCamel(offer));

          dispatch(ActionCreator.setOffers(offers));
        }
      });
  },
  loadReviews: (id, onFail) => (dispatch, _, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          const reviews = response.data.map((review) => transformObjSnakeToCamel(review));

          dispatch(ActionCreator.setReviews(reviews));
        }
      })
      .catch((error) => {
        if (error.response.status === StatusCode.BAD_REQUEST) {
          onFail(error.response.status);
        }
      });
  },
  postReview: (id, data, onSuccess, onFail) => (dispatch, _, api) => {
    return api.post(`/comments/${id}`, data)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          const reviews = response.data.map((review) => transformObjSnakeToCamel(review));

          dispatch(ActionCreator.setReviews(reviews));
          onSuccess();
        }
      })
      .catch((error) => {
        if (error.response.status === StatusCode.BAD_REQUEST) {
          onFail(error.response.status);
        }
      });
  }
};

const ActionCreator = {
  setOffers: (items) => ({
    type: ActionType.SET_OFFERS,
    payload: items
  }),
  setReviews: (items) => ({
    type: ActionType.SET_REVIEWS,
    payload: items
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    case ActionType.SET_REVIEWS:
      return Object.assign({}, state, {reviews: action.payload});
  }

  return state;
};

export {
  reducer,
  Operation,
  ActionCreator,
  getFilteredOffers
};
