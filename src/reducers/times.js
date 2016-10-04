import { STORE_TIMES } from '../ActionTypes';
import moment from 'moment';

export const parseTimes = (csv) => {
  const lines = csv.split('\n'),
        headings = lines[0].split(','),
        times = lines.slice(0, -1);

  return times.map(time => {
    const vals = time.split(',');
    return vals.map((val, i) => {
      return val.replace(/"/g, '');
    });
  });
};

const initialState = [];

export default function times(state = initialState, action) {
  switch (action.type) {
    case STORE_TIMES:
      return parseTimes(action.times);
    default:
      return state;
  }
};
