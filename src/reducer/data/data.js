import {ActionType} from '../../constants';
import {transformObjSnakeToCamel} from '../../utils';
import {StatusCode} from '../../constants';

const initialState = {
  offers: []
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

          console.log(offers);

          dispatch(ActionCreator.setOffers(offers));
        }
      });
  }
};

const ActionCreator = {
  setOffers: (items) => ({
    type: ActionType.SET_OFFERS,
    payload: items
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
  }

  return state;
};

export {
  reducer,
  Operation,
  ActionCreator,
  getFilteredOffers
};
