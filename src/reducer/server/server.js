import {ActionType} from '../../constants';

const initialState = {
  isServerResponding: true
};

Object.freeze(initialState);

const ActionCreator = {
  setServerStatus: (status) => {
    return {
      type: ActionType.SET_SERVER_STATUS,
      payload: status
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SERVER_STATUS:
      return Object.assign({}, state, {
        isServerResponding: action.payload
      });
  }

  return state;
};

export {
  ActionCreator,
  reducer
};
