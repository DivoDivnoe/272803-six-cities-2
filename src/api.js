import axios from 'axios';
import {apiSettings} from './constants';
import {ActionCreator} from './reducer/server/server';

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
      dispatch(ActionCreator.setServerStatus(false));
    }

    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
