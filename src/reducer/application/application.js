import {ActionType} from '../../constants';

const initialState = {
  city: ``
};

Object.freeze(initialState);

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
  }

  return state;
};

export {
  reducer,
  ActionCreator
};
