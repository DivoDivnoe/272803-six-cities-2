import {reducer, ActionCreator, getFilteredOffers, Operation} from './data';
import {getCitiesListFromOffers} from './selectors';
import {ActionType} from '../../constants';
import MockAdapter from 'axios-mock-adapter';
import createApi from '../../api.js';

describe(`Actions creator returns right action`, () => {
  it(`for changing offers`, () => {
    const offers = [
      {
        id: 1,
        city: {
          name: `Moscow`
        }
      }
    ];
    const action = ActionCreator.setOffers(offers);

    expect(action).toEqual({
      type: ActionType.SET_OFFERS,
      payload: offers
    });
  });

  it(`for changing reviews`, () => {
    const reviews = [
      {
        id: 1,
        user: {},
        rating: 1,
        comment: `some comment`,
        date: `2019-05-08`
      }
    ];
    const action = ActionCreator.setReviews(reviews);

    expect(action).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: reviews
    });
  });
});

describe(`reducer returns right state`, () => {
  it(`with changing offers action`, () => {
    const offers = [
      {
        id: 1,
        city: {
          name: `Moscow`
        }
      },
      {
        id: 2,
        city: {
          name: `Moscow`
        }
      },
      {
        id: 1,
        city: {
          name: `Berlin`
        }
      }
    ];
    const state = {
      city: ``,
      offers: []
    };


    const action = {
      type: ActionType.SET_OFFERS,
      payload: offers
    };


    expect(reducer(state, action)).toEqual({
      city: ``,
      offers
    });
  });

  it(`with changing reviews action`, () => {
    const reviews = [
      {
        id: 1,
        user: {},
        rating: 1,
        comment: `some comment`,
        date: `2019-05-08`
      }
    ];
    const state = {
      offers: [],
      reviews: []
    };


    const action = {
      type: ActionType.SET_REVIEWS,
      payload: reviews
    };


    expect(reducer(state, action)).toEqual({
      offers: [],
      reviews
    });
  });
});

describe(`getFilteredOffers function`, () => {
  it(`returns correctly filtered array`, () => {
    const city = `Gatchina`;
    const offers = [
      {
        id: 1,
        city: {
          name: `Gatchina`
        }
      },
      {
        id: 2,
        city: {
          name: `Moscow`
        }
      },
      {
        id: 3,
        city: {
          name: `Gatchina`
        }
      },
      {
        id: 4,
        city: {
          name: `Paris`
        }
      }
    ];

    expect(getFilteredOffers(offers, city)).toEqual(
        [
          {
            id: 1,
            city: {
              name: `Gatchina`
            }
          },
          {
            id: 3,
            city: {
              name: `Gatchina`
            }
          }
        ]
    );
  });
});

describe(`getCitiesListFromOffers function`, () => {
  it(`returns correctly filtered array`, () => {
    const city = `Gatchina`;
    const offers = [
      {
        id: 1,
        city: {
          name: `Gatchina`
        }
      },
      {
        id: 2,
        city: {
          name: `Moscow`
        }
      },
      {
        id: 3,
        city: {
          name: `Gatchina`
        }
      },
      {
        id: 4,
        city: {
          name: `Paris`
        }
      }
    ];

    expect(getCitiesListFromOffers(offers, city)).toEqual(
        [`Gatchina`, `Moscow`, `Paris`]
    );
  });
});

describe(`loadOffers function`, () => {
  it(`makes correct request to /hotels`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);

    const offersLoader = Operation.loadOffers();

    mockApi
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_OFFERS,
          payload: [{fake: true}]
        });
      });
  });
});

describe(`loadReviews function`, () => {
  it(`makes correct "GET" request to /comments/:id`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);
    const id = 1;
    const onFail = jest.fn();

    const reviewsLoader = Operation.loadReviews(id, onFail);

    mockApi
      .onGet(`/comments/${id}`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_REVIEWS,
          payload: [{fake: true}]
        });
      });
  });

  it(`handles 400 mistake after /comments/:id  "GET" request correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);
    const id = 100;
    const onFail = jest.fn();

    const reviewsLoader = Operation.loadReviews(id, onFail);

    mockApi
      .onGet(`/comments/${id}`)
      .reply(400);

    return reviewsLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(onFail).toHaveBeenCalledTimes(1);
        expect(onFail).toHaveBeenCalledWith(400);
      });
  });
});

describe(`postReview function`, () => {
  it(`makes correct "POST" request to /comments/:id`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);
    const id = 1;
    const data = {
      rating: `1`,
      review: `some review`
    };
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    const reviewsLoader = Operation.postReview(id, data, onSuccess, onFail);

    mockApi
      .onPost(`/comments/${id}`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(onFail).toHaveBeenCalledTimes(0);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_REVIEWS,
          payload: [{fake: true}]
        });
      });
  });

  it(`handles 400 mistake after /comments/:id  "POST" request correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);
    const id = 100;
    const data = {
      rating: `1`,
      review: `some review`
    };
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    const reviewsLoader = Operation.postReview(id, data, onSuccess, onFail);

    mockApi
      .onPost(`/comments/${id}`)
      .reply(400);

    return reviewsLoader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(onSuccess).toHaveBeenCalledTimes(0);
        expect(onFail).toHaveBeenCalledTimes(1);
        expect(onFail).toHaveBeenCalledWith(400);
      });
  });
});
