import axios from 'axios';
import {apiSettings, StatusCode} from './constants';
import {ActionCreator as ServerActionCreator} from './reducer/server/server';
import {ActionCreator as UserActionCreator} from './reducer/user/user';

const createApi = (dispatch) => {
  const api = axios.create(
      {
        baseURL: apiSettings.HOST,
        timeout: apiSettings.TIMEOUT,
        withCredentials: true
      }
  );

  const onSuccess = (resolve) => resolve;
  const onFail = (error) => {
    if (error.code === `ECONNABORTED`) {
      dispatch(ServerActionCreator.setServerStatus(false));
    } else if (error.response.status === StatusCode.BAD_REQUEST) {
      dispatch(UserActionCreator.authUser(true));
      return error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
