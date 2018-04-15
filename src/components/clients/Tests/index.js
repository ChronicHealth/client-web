// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dropdown } from '../../../ui-kit/index.js';
import moment from 'moment';
import getClientRoutine from 'components/clientRoutines/get';
import getClient from 'components/clients/get';
import { getParam } from '@client/selectors/router';
import { List } from 'immutable';
import BodyLevelChip from 'components/bodyLevels/Chip';
import ShowTestResult from 'components/testResults/Show';
import BodyLevel from './BodyLevel';
import { DatePicker } from '../../../ui-kit';

type $stateProps = {};
type $ownProps = { clientId: $$id, bodyLevelIds: List<$$id> };
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;

const state = {
  bodyLevel: '',
  date: moment()
};

export class ClientTests extends React.PureComponent<$props, typeof state> {
  state = state;
  selectBodyLevel = (bodyLevel: $$id) => {
    this.setState({
      bodyLevel
    });
  };
  selectDate = (date: Date) => {
    this.setState({
      date: moment(date)
    });
  };
  render() {
    const selectedBodyLevel =
      this.state.bodyLevel || this.props.bodyLevelIds.first();
    return (
      <div>
        {this.props.bodyLevelIds.map((id, i) => (
          <BodyLevelChip id={id} key={i} onClick={this.selectBodyLevel} />
        ))}
        <BodyLevel
          clientId={this.props.clientId}
          bodyLevelId={selectedBodyLevel}
        />
        <DatePicker
          autoOk
          label="Date"
          onChange={this.selectDate}
          value={this.state.date.toDate()}
        />
        <ShowTestResult
          bodyLevelId={selectedBodyLevel}
          date={this.state.date}
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clientId: getParam('clientId')
});

export default flowRight([
  getClient,
  getClientRoutine,
  connect(mapStateToProps)
])(ClientTests);
