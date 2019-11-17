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

