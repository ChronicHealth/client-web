// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import khange, { kheck } from 'khange';
import { byBodyLevel } from '@client/actions/testResultRanges';
import styles from './style.pcss';

type $stateProps = { data: Array<Object> };
type $ownProps = {};
type $dispatchProps = { byBodyLevel: Function };
type $props = $stateProps & $dispatchProps & $ownProps;

export class ClientTestsBodyLevel extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <div>
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
            dataKey="amount"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  data: () => []
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      byBodyLevel
    },
    dispatch
  );

const onKhange = props =>
  props.byBodyLevel({
    clientId: props.clientId,
    bodyLevelId: props.bodyLevelId
  });

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('bodyLevelId'), onKhange)
])(ClientTestsBodyLevel);
