import {combineReducers} from 'redux';
import NameSpace from './name-space';
import {reducer as application} from './application/application';
import {reducer as data} from './data/data';
import {reducer as user} from './user/user';
import {reducer as server} from './server/server';

export default combineReducers({
  [NameSpace.APPLICATION]: application,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.SERVER]: server
});
