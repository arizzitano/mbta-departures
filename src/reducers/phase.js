import moment from 'moment';

import { FETCH_TIMES, FETCH_TIMES_ERROR, STORE_TIMES } from '../ActionTypes';

const initialState = 'Initializing';

export default function phase(state = initialState, action) {
  switch (action.type) {
    case FETCH_TIMES:
      return 'Fetching departure times...';
    case FETCH_TIMES_ERROR:
      return 'Error fetching departure times!';
    case STORE_TIMES:
      return `Last updated at ${moment(action.lastUpdated).format('hh:mm a')}`;
    default:
      return state;
  }
};
