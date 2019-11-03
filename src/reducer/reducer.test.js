import {reducer, ActionCreator, ActionType, getFilteredOffers} from './reducer';

describe(`Actions creator returns right action`, () => {
  it(`for changing current city`, () => {
    const city = `Gatchina`;
    const action = ActionCreator.changeCity(city);

    expect(action).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: city
    });
  });

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

  it(`for setting cities list`, () => {
    const cities = [`Moscow`, `Berlin`];
    const action = ActionCreator.setCities(cities);

    expect(action).toEqual({
      type: ActionType.SET_CITIES,
      payload: cities
    });
  });
});

describe(`reducer returns right state`, () => {
  it(`with changing city action`, () => {
    const city = `Gatchina`;
    const state = {
      city: `Paris`,
      offers: [],
      cities: []
    };
    const action = {
      type: ActionType.CHANGE_CITY,
      payload: city
    };

    expect(reducer(state, action)).toEqual({
      city: `Gatchina`,
      offers: [],
      cities: []
    });
  });


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
      offers: [],
      cities: []
    };


    const action = {
      type: ActionType.SET_OFFERS,
      payload: offers
    };


    expect(reducer(state, action)).toEqual({
      city: ``,
      offers,
      cities: []
    });
  });

  it(`with setting cities list action`, () => {
    const cities = [`Moscow`, `Berlin`];
    const state = {
      city: ``,
      offers: [],
      cities: []
    };


    const action = {
      type: ActionType.SET_CITIES,
      payload: cities
    };


    expect(reducer(state, action)).toEqual({
      city: ``,
      offers: [],
      cities
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

