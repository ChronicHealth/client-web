// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PrescriptionGroupForm from '../Form';
import getPrescriptionGroup from '../get';
import { validationSchema } from '@client/utils/prescriptionGroups';
import { form } from '@client/hocs';
import { update } from '@client/actions/prescriptionGroups';

type $stateProps = {};
type $ownProps = {
  id: $$id
};
type $dispatchProps = {
  updatePrescriptionGroup: Function
};
type $props = $stateProps & $dispatchProps & $ownProps;

export class PrescriptionGroupEdit extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <PrescriptionGroupForm {...props} />
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector(
  {}
);

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      updatePrescriptionGroup: update
    },
    dispatch
  );

export default flowRight([
  getPrescriptionGroup,
  connect(mapStateToProps, mapDispatchToProps),
  form({
    mapPropsToValues: ({ prescriptionGroup, prescriptionIds }) => ({
      ...prescriptionGroup.toObject(),
      prescriptions: prescriptionIds.toJS()
    }),
    validationSchema,
    handleChange: (props: $stateProps & $ownProps & $dispatchProps) => (
      key,
      onChange
    ) => values => {
      onChange(values);
      return props.updatePrescriptionGroup(props.id, { [key]: values });
    }
  })
])(PrescriptionGroupEdit);
