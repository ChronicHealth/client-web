// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectDropdown, Button, UL } from 'ui-kit';
import PrescriptionGroupItem from 'components/prescriptionGroups/Item';
import { find } from '@client/selectors/tests';
import Test from '@client/models/Test';
import styles from './style.pcss';
import { search } from '@client/actions/prescriptionGroups';
import { uniqBy } from 'lodash';

type $stateProps = { test: Test };
type $ownProps = { onChange: Function };
type $dispatchProps = { search: Function };
type $props = $stateProps & $dispatchProps & $ownProps;

const state = {
  prescriptionGroupId: ''
};

export class RoutineCreateTest extends React.PureComponent<
  $props,
  typeof state
> {
  state = state;
  renderValues = () => {
    const id = this.state.prescriptionGroupId;
    return id ? (
      <UL>
        <PrescriptionGroupItem id={id} />
      </UL>
    ) : null;
  };
  selectPrescriptionGroup = ([id]) => {
    this.setState({
      prescriptionGroupId: id
    });
  };
  submit = () => {
    this.props.clearTest();
    const nextValue = uniqBy(
      (this.props.field.value || []).concat([
        {
          id: this.props.id,
          ...this.state
        }
      ]),
      'id'
    );
    return this.props.field.onChange(nextValue);
  };
  render() {
    const { ...props } = this.props;
    return (
      <div className={styles.container}>
        <h3>{props.test.name}</h3>
        <SelectDropdown
          onChange={this.selectPrescriptionGroup}
          renderValues={this.renderValues}
          loadOptions={props.search}
          label="Select Prescription Group"
        />
        <Button onClick={this.submit}>Add Test</Button>
        <Button onClick={this.props.clearTest}>Cancel</Button>
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  test: find()
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      search
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  RoutineCreateTest
);
