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
  SET_CITIES: `SET_CITIES`
};

export {
  MAX_RATING,
  HousingType,
  SortType,
  SortTypeText,
  ActionType
};
