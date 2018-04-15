// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Prescription from '../../../@client/models/pages/Prescription';
import { find } from '@client/selectors/prescriptions';
import { find as findPrescriptionResult } from '@client/selectors/prescriptionResults';
import { update } from '@client/actions/prescriptionResults';
import { bindActionCreators } from '@client/utils/components';
import PrescriptionResult from '@client/models/PrescriptionResult';
import styles from './style.pcss';
import { TextInput } from '../../../ui-kit';
import PrescriptionScope from '../../../@client/models/Prescription/Scope';
import { formatDate } from '../../../@client/utils/prescriptionResults';

type $stateProps = {
  prescription: Prescription,
  prescriptionResult: PrescriptionResult
};

type $ownProps = {
  id: $$id,
  date: string,
  clientId: $$id
};

type $dispatchProps = {
  update: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class PrescriptionResultItem extends React.PureComponent<$props> {
  update = (data: Map<*, *>) => {
    this.props.update(
      {
        clientId: this.props.clientId,
        date: this.props.date
      },
      data.toJS()
    );
  };
  handleChangeAmount = (amount: string) => {
    this.update(
      this.props.prescriptionResult.data.update(this.props.id, prescription => {
        if (prescription) {
          return prescription.set('amount', amount);
        }
        return new Map({
          active: true,
          amount
        });
      })
    );
  };
  handleClick = () => {
    this.update(
      this.props.prescriptionResult.data.update(this.props.id, prescription => {
        if (prescription) {
          return prescription.set(
            'active',
            !this.props.prescriptionResult.data.getIn([this.props.id, 'active'])
          );
        }
        return new Map({
          active: true,
          amount: ''
        });
      })
    );
  };
  renderItem = () => {
    return (
      <div>
        <p>{this.props.prescription.name}</p>
        <TextInput
          className={styles.textInput}
          onChange={this.handleChangeAmount}
          label="Amount"
          value={this.props.prescriptionResult.data.getIn([
            this.props.id,
            'amount'
          ])}
        />
        <span>{this.props.prescription.unit}</span>
      </div>
    );
  };
  render() {
    const { prescription, prescriptionResult } = this.props;
    const data = prescriptionResult.getIn(['data', prescription.id], new Map());
    const leftActions = [
      <span
        onClick={this.handleClick}
        key="circle"
        className={classnames(styles.circle, {
          [styles.active]: data.getIn(['active'])
        })}
      />
    ];
    const rightActions = [];
    if (data.get('amountFrequency') > 1) {
      rightActions.push(
        <span key="den">{`${data.get('nominator', 0)}/${data.get(
          'amountTime'
        )}`}</span>
      );
    }
    return (
      <ULItem
        leftActions={leftActions}
        rightActions={rightActions}
        itemContent={this.renderItem()}
      />
    );
  }
}

const getDate = (state, props) => formatDate(props.date);

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  prescription: find(),
  prescriptionResult: findPrescriptionResult(getDate)
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      update
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  PrescriptionResultItem
);
