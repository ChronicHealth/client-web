// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, SelectDropdown, UL } from 'ui-kit';
import { bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { search as searchPrescriptions } from '@client/actions/prescriptions';
import { search as searchTests } from '@client/actions/tests';
import PrescriptionItem from '../PrescriptionItem';
import TestItem from '../TestItem';
type $props = Object;

export class RoutineForm extends React.PureComponent<$props> {
  renderPrescriptionValues = (values: $$id[]) => {
    return (
      <UL>
        {values.map(id => (
          <PrescriptionItem
            onRemove={this.props.fields.prescriptions.onChange}
            values={values}
            id={id}
            key={id}
          />
        ))}
      </UL>
    );
  };
  renderTestValues = (values: $$id[]) => {
    return (
      <UL>
        {values.map(id => (
          <TestItem
            onRemove={this.props.fields.tests.onChange}
            values={values}
            id={id}
            key={id}
          />
        ))}
      </UL>
    );
  };
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} />
        <TextInput rows={3} multiline {...props.fields.description} />
        <SelectDropdown
          renderValues={this.renderPrescriptionValues}
          {...props.fields.prescriptions}
          loadOptions={props.searchPrescriptions}
        />
        <SelectDropdown
          renderValues={this.renderTestValues}
          {...props.fields.tests}
          loadOptions={props.searchTests}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      searchPrescriptions,
      searchTests
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps)])(RoutineForm);
