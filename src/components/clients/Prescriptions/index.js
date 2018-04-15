// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dropdown } from '../../../ui-kit/index.js';
import moment from 'moment';
import getClientRoutine from 'components/clientRoutines/get';
import getClient from 'components/clients/get';
import Daily from './Daily';
import Range from './Range';
import { getParam } from '@client/selectors/router';
import { List } from 'immutable';

type $stateProps = {};
type $ownProps = { clientId: $$id, prescriptionIds: List<$$id> };
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;

const state = {
  daily: true,
  startDate: moment().subtract(1, 'months'),
  endDate: moment()
};

const options = [
  {
    value: 1,
    label: 'Daily'
  },
  {
    value: 2,
    label: 'Range'
  }
];

export class ClientPrescriptions extends React.PureComponent<
  $props,
  typeof state
> {
  state = state;
  handleSelectStartDate = (startDate: Date) => {
    this.setState({
      startDate: moment(startDate)
    });
  };
  handleSelectEndDate = (endDate: Date) => {
    this.setState({
      endDate: moment(endDate)
    });
  };
  selectView = (value: number) => {
    this.setState({
      daily: value === 1
    });
  };
  render() {
    return (
      <div>
        <Dropdown
          label="Select View"
          auto
          onChange={this.selectView}
          value={this.state.daily ? 1 : 2}
          source={options}
        />
        {this.state.daily ? (
          <Daily
            prescriptionIds={this.props.prescriptionIds}
            date={this.state.endDate}
            onDateChange={this.handleSelectEndDate}
            clientId={this.props.clientId}
          />
        ) : (
          <Range
            clientId={this.props.clientId}
            prescriptionIds={this.props.prescriptionIds}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onSelectStartDate={this.handleSelectStartDate}
            onSelectEndDate={this.handleSelectEndDate}
          />
        )}
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
])(ClientPrescriptions);
