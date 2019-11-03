const initialState = {
  city: ``,
  offers: [],
  cities: []
};

Object.freeze(initialState);

const getCitiesListFromOffers = (offers) => {
  const citiesList = offers.map((offer) => offer.city.name);

  return Array.from(new Set(citiesList));
};

const getFilteredOffers = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city);
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_CITIES: `SET_CITIES`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
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
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
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
  ActionType,
  getFilteredOffers,
  getCitiesListFromOffers
};
