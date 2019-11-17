import {reducer, ActionCreator} from './server';
import {ActionType} from '../../constants';

describe(`Actions creator returns right action`, () => {
  it(`for changing server status`, () => {
    const status = false;
    const action = ActionCreator.setServerStatus(status);

    expect(action).toEqual({
      type: ActionType.SET_SERVER_STATUS,
      payload: status
    });
  });
});

describe(`reducer returns right state`, () => {
  it(`with changing server status`, () => {
    const state = {
      isServerResponding: true
    };
    const action = {
      type: ActionType.SET_SERVER_STATUS,
      payload: false
    };

    expect(reducer(state, action)).toEqual({
      isServerResponding: false
    });
  });
});
