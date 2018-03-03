// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UL, TextInput, SelectDropdown } from 'ui-kit';
import { search } from '@client/actions/prescriptions';
import PrescriptionItem from 'components/routines/PrescriptionItem';
type $stateProps = {};
type $ownProps = {};
type $dispatchProps = { search: Function };
type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class PrescriptionGroupForm extends React.PureComponent<$props> {
  renderValues = (values: Array<any>) => {
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
  render() {
    const { fields, ...props } = this.props;
    return (
      <React.Fragment>
        <TextInput {...fields.name} />
        <SelectDropdown
          renderValues={this.renderValues}
          loadOptions={props.search}
          {...fields.prescriptions}
        />
        <TextInput {...fields.notes} />
      </React.Fragment>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector(
  {}
);

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      search
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionGroupForm
);
