import {ActionType} from '../../constants';

const initialState = {
  offers: [],
  cities: []
};

Object.freeze(initialState);

const getFilteredOffers = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city);
};

const ActionCreator = {
  setOffers: (items) => ({
    type: ActionType.SET_OFFERS,
    payload: items
  }),
  setCities: (cities) => ({
    type: ActionType.SET_CITIES,
    payload: cities
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    case ActionType.SET_CITIES:
      return Object.assign({}, state, {cities: action.payload});
  }

  return state;
};

export {
  reducer,
  ActionCreator,
  getFilteredOffers
};
