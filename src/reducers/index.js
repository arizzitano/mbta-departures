import { combineReducers } from 'redux';
import phase from './phase';
import times from './times';

const rootReducer = combineReducers({
  phase,
  times
});

export default rootReducer;
