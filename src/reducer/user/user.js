import {ActionType, StatusCode} from '../../constants';

const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

Object.freeze(initialState);

const Operation = {
  authUser: () => (dispatch, _, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          dispatch(ActionCreator.setUserData(response.data));
        }
      });
  }
};

const ActionCreator = {
  authUser: (status) => {
    return {
      type: ActionType.AUTH_USER,
      payload: status
    };
  },
  setUserData: (data) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: data
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload
      });
  }

  return state;
};

export {
  reducer,
  ActionCreator,
  Operation
};
