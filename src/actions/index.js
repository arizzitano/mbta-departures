import moment from 'moment';

import * as types from '../ActionTypes';

const PROXY_URL = 'http://localhost:1337/';
const FEED_URL = 'developer.mbta.com/lib/gtrtfs/Departures.csv';

export const fetchTimes = () => {
  return {
    type: types.FETCH_TIMES
  }
}

export const storeTimes = times => {
  return {
    type: types.STORE_TIMES,
    lastUpdated: moment.now(),
    times
  }
}

export const fetchTimesError = () => {
  return {
    type: types.FETCH_TIMES_ERROR
  }
}

export const retrieveTimes = () => {
  return function(dispatch) {
    dispatch(fetchTimes());
    return fetch(PROXY_URL + FEED_URL).then(
      response => {
        if (response.status === 200) {
          return response.text();
        } else {
          throw new Error({
            name: 'FetchException',
            message: 'Error fetching times'
          });
        }
      }
    ).then(result => {
      dispatch(storeTimes(result));
    }).catch(err => {
      dispatch(fetchTimesError);
    });
  };
}
