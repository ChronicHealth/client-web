// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { DatePicker } from 'ui-kit';
import moment, { Moment } from 'moment';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { getRange } from '@client/actions/prescriptionResultsRanges';
import PrescriptionChip from 'components/prescriptions/Chip';
import styles from './style.pcss';
import { List } from 'immutable';
import khange, { kheck } from 'khange';
import { find } from '@client/selectors/prescriptionResultsRanges';

import { formatDateRange } from '../../../../@client/utils/prescriptionResults';

type $stateProps = { data: Array<Object> };
type $ownProps = {
  prescriptionIds: List<$$id>,
  startDate: Moment,
  endDate: Moment,
  onSelectStartDate: Function,
  onSelectEndDate: Function
};
type $dispatchProps = { getRange: Function };
type $props = $stateProps & $dispatchProps & $ownProps;

const state = {
  prescription: ''
};

export class ClientPrescriptionsRange extends React.PureComponent<
  $props,
  typeof state
> {
  state = state;
  changePrescription = (prescription: $$id) => {
    this.setState({
      prescription
    });
  };
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <DatePicker
          autoOk
          label="Start Date"
          value={props.startDate.toDate()}
          onChange={props.onSelectStartDate}
        />
        <DatePicker
          autoOk
          label="End Date"
          value={props.endDate.toDate()}
          onChange={props.onSelectEndDate}
        />
        <div>
          {props.prescriptionIds.map((id, i) => (
            <PrescriptionChip
              onClick={this.changePrescription.bind(this, id)}
              id={id}
              key={i}
            />
          ))}
        </div>
        <AreaChart
          className={styles.graph}
          width={600}
          height={400}
          data={this.props.data}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={
              this.state.prescription || this.props.prescriptionIds.first()
            }
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </React.Fragment>
    );
  }
}

const getRangeId = (state, props) => formatDateRange(props);

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  data: createSelector([find(getRangeId)], prescriptionResultsRange => {
    return prescriptionResultsRange.data.toArray().map(result => {
      return Object.keys(result.data || {}).reduce(
        (finalResult, key) => {
          const prescriptionObj = result.data[key];
          finalResult[key] = prescriptionObj.active
            ? Number(prescriptionObj.amount)
            : 0;
          return finalResult;
        },
        {
          ...result,
          date: moment(result.date).format('YYYY-MM-DD')
        }
      );
    });
  })
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getRange
    },
    dispatch
  );

const onKhange = props =>
  props.getRange(props.clientId, props.startDate, props.endDate);

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('startDate', 'endDate'), onKhange)
])(ClientPrescriptionsRange);
