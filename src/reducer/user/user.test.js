import {reducer, ActionCreator, Operation} from './user';
import {ActionType} from '../../constants';
import createApi from '../../api';
import MockAdapter from 'axios-mock-adapter';

describe(`Actions creator returns right action`, () => {
  it(`for changing auth user status`, () => {
    const status = true;
    const action = ActionCreator.authUser(status);

    expect(action).toEqual({
      type: ActionType.AUTH_USER,
      payload: true
    });
  });

  it(`for setting user data`, () => {
    const data = {id: 1};
    const action = ActionCreator.setUserData(data);

    expect(action).toEqual({
      type: ActionType.SET_USER_DATA,
      payload: {id: 1}
    });
  });
});

describe(`reducer returns right state`, () => {
  it(`with changing auth status`, () => {
    const state = {
      isAuthorizationRequired: false,
      user: {}
    };
    const action = {
      type: ActionType.AUTH_USER,
      payload: true
    };

    expect(reducer(state, action)).toEqual({
      isAuthorizationRequired: true,
      user: {}
    });
  });

  it(`with setting user data`, () => {
    const state = {
      isAuthorizationRequired: false,
      user: {}
    };
    const action = {
      type: ActionType.SET_USER_DATA,
      payload: {id: 1}
    };

    expect(reducer(state, action)).toEqual({
      isAuthorizationRequired: false,
      user: {id: 1}
    });
  });
});

describe(`authUser function`, () => {
  it(`makes correct  "GET" request to /login`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);

    const userAuthorizator = Operation.authUser();

    mockApi
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return userAuthorizator(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_USER_DATA,
          payload: [{fake: true}]
        });
      });
  });

  it(`makes correct  "GET" request to /login`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const mockApi = new MockAdapter(api);

    const userAuthorizator = Operation.authUser();

    mockApi
      .onGet(`/login`)
      .reply(401);

    return userAuthorizator(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.AUTH_USER,
          payload: true
        });
      });
  });
});
