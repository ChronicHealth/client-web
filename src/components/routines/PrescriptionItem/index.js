// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/prescriptions';
import { ULItem, Micon } from 'ui-kit';
import { bindActionCreators } from 'redux';
import * as prescriptionActions from '@client/actions/prescriptions';

export class PrescriptionItem extends React.PureComponent<*> {
  handleRemove = () => {
    const { props } = this;
    const index = props.values.indexOf(props.id);
    const nextValues = [...props.values];
    nextValues.splice(index, 1);
    props.onRemove(nextValues);
  };
  render() {
    const { prescription, goTo, goToPrescription } = this.props;
    const baseProps = {};
    if (goTo) {
      baseProps.onClick = goToPrescription;
    }
    return (
      <ULItem
        {...baseProps}
        caption={prescription.name}
        rightActions={[
          <Micon onClick={this.handleRemove} key="delete" value="delete" />
        ]}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  prescription: find()
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      goToPrescription: () => prescriptionActions.goToPrescription(props.id)
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionItem
);
