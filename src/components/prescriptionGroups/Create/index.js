// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PrescriptionGroupForm from '../Form';
import { validationSchema } from '@client/utils/prescriptionGroups';
import {
  create,
  goToPrescriptionGroup
} from '@client/actions/prescriptionGroups';
import { form } from '@client/hocs';
import uuid from 'uuid/v1';
import { Button } from 'ui-kit';

type $stateProps = {};
type $ownProps = {};
type $dispatchProps = {
  goToPrescriptionGroup: Function,
  createPrescriptionGroup: Function
};
type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;
export class PrescriptionGroupCreate extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return (
      <div>
        <PrescriptionGroupForm {...props} />
        <Button onClick={props.handleSubmit} disabled={!props.isValid}>
          Create
        </Button>
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
      goToPrescriptionGroup,
      createPrescriptionGroup: create
    },
    dispatch
  );

const formik = {
  mapPropsToValues: () => ({
    name: '',
    notes: '',
    prescriptions: []
  }),
  validationSchema,
  handleSubmit: (values, { props }: { props: $dispatchProps }) => {
    const id = uuid();
    props.goToPrescriptionGroup(id);
    return props.createPrescriptionGroup({
      id,
      ...values
    });
  }
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  form(formik)
])(PrescriptionGroupCreate);
