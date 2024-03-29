import NameSpace from '../name-space';
import {createSelector} from 'reselect';

const getCitiesListFromOffers = (offers) => {
  const citiesList = offers.map((offer) => offer.city.name);

  return Array.from(new Set(citiesList));
};

const getOffers = (state) => state[NameSpace.DATA].offers;
const getReviews = (state) => state[NameSpace.DATA].reviews;

const getCities = createSelector(
    getOffers,
    (offers) => getCitiesListFromOffers(offers)
);

export {
  getOffers,
  getCities,
  getReviews,
  getCitiesListFromOffers
};
