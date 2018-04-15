// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PrescriptionResultItem from 'components/prescriptionResults/Item';
import { get, getPrevious, getWeek } from '@client/actions/prescriptionResults';
import { UL, DatePicker } from 'ui-kit/index.js';
import { getRelated } from '@client/selectors/clients';
import { get as getPrescriptions } from '@client/selectors/prescriptions';
import styles from './style.pcss';
import khange, { kheck } from 'khange';
import Client from '../../../../@client/models/Client';
import { List } from 'immutable';
import Prescription from '@client/models/Prescription';

type $stateProps = {
  clientScopes: List<$$id>,
  prescriptions: List<Prescription>
};
type $ownProps = {
  prescriptonIds: List<$$id>,
  clientId: $$id
};
type $dispatchProps = {
  get: *,
  getPrevious: *,
  getWeek: *
};
type $props = $stateProps & $dispatchProps & $ownProps;
export class ClientPrescriptionsDaily extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <DatePicker
          autoOk
          label="Select Date"
          value={this.props.date.toDate()}
          onChange={this.props.onDateChange}
        />
        <UL className={styles.prescriptionList}>
          {props.prescriptionIds.map((id, i) => (
            <PrescriptionResultItem
              clientId={props.clientId}
              key={i}
              id={id}
              date={this.props.date}
            />
          ))}
        </UL>
      </React.Fragment>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  clientScopes: getRelated('scopes', (s, p) => p.clientId),
  prescriptions: getPrescriptions((s, p) => p.prescriptionIds)
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      get,
      getPrevious,
      getWeek
    },
    dispatch
  );

const onKhange = props => {
  props.get(props.clientId, props.date).then(prescriptionResult => {
    if (!prescriptionResult.data) {
      props.getPrevious(props.clientId, props.date);
    }
    props.getWeek(
      props.clientId,
      props.date,
      props.prescriptions,
      props.clientScopes
    );
  });
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('date', 'clientId'), onKhange)
])(ClientPrescriptionsDaily);
