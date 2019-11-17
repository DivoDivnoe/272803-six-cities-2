import {reducer, ActionCreator} from './application';
import {ActionType} from '../../constants';

describe(`Actions creator returns right action`, () => {
  it(`for changing current city`, () => {
    const city = `Gatchina`;
    const action = ActionCreator.changeCity(city);

    expect(action).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: city
    });
  });
});

describe(`reducer returns right state`, () => {
  it(`with changing city action`, () => {
    const city = `Gatchina`;
    const state = {
      city: `Paris`
    };
    const action = {
      type: ActionType.CHANGE_CITY,
      payload: city
    };

    expect(reducer(state, action)).toEqual({
      city: `Gatchina`
    });
  });
});
