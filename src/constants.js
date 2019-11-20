const MAX_RATING = 5;

const HousingType = {
  APPARTMENT: `appartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`
};

const SortType = {
  POPULAR: `POPULAR`,
  PRICE_LOW_TO_HIGH: `PRICE_LOW_TO_HIGH`,
  PRICE_HIGH_TO_LOW: `PRICE_HIGH_TO_LOW`,
  TOP_RATED: `TOP_RATED`
};

const SortTypeText = {
  [SortType.POPULAR]: `Popular`,
  [SortType.PRICE_LOW_TO_HIGH]: `Price: low to high`,
  [SortType.PRICE_HIGH_TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_CITIES: `SET_CITIES`,
  SET_SERVER_STATUS: `SET_SERVER_STATUS`,
  AUTH_USER: `AUTH_USER`,
  SET_USER_DATA: `SET_USER_DATA`
};

const apiSettings = {
  HOST: `https://htmlacademy-react-2.appspot.com/six-cities`,
  TIMEOUT: 5000
};

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404
};

export {
  MAX_RATING,
  HousingType,
  SortType,
  SortTypeText,
  ActionType,
  apiSettings,
  StatusCode
};
