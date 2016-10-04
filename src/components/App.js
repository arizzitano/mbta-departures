import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';

import '../css/App.css';
import Phase from './Phase';
import * as FetchTimeActions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.actions.retrieveTimes();
  }

  _renderTimes () {
    const TIMESTAMP_INDICES = [0, 4];

    return (
      <table>
        {this.props.times.map((time, i) => {
          return (
            <tr>
              {time.map((item, j) => {
                var displayVal = item;
                if (i > 0 && TIMESTAMP_INDICES.indexOf(j) > -1) {
                  displayVal = moment.tz(item*1000, "America/New_York").format('hh:mm a');
                }
                return <td>{displayVal}</td>
              })}
            </tr>
          );
        })}
      </table>
    );
  }

  render() {
    const times = this._renderTimes();
    return (
      <div className="App">
        <Phase text={this.props.phase} />
        {times}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.phase);
  return {
    phase: state.phase,
    times: state.times
  };
}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(FetchTimeActions, dispatch)
  };
};

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
