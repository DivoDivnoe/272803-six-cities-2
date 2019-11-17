import {combineReducers} from 'redux';
import NameSpace from './name-space';
import {reducer as application} from './application/application';
import {reducer as data} from './data/data';

export default combineReducers({
  [NameSpace.APPLICATION]: application,
  [NameSpace.DATA]: data
});
