// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { validationSchema } from '@client/utils/bodyLevels';
import {
  create as createBodyLevel,
  goToBodyLevel
} from '@client/actions/bodyLevels';
import uuid from 'uuid/v1';
import BodyLevelForm from '../Form';

type $stateProps = {};
type $ownProps = {};
type $dispatchProps = {
  createBodyLevel: Function,
  goToBodyLevel: Function
};

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateBodyLevel extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Biomarker</h1>
        <BodyLevelForm fields={this.props.fields} />
        <Button
          primary
          disabled={!props.isValid}
          onClick={this.props.handleSubmit}
        >
          Create
        </Button>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      createBodyLevel,
      goToBodyLevel
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      name: '',
      notes: '',
      unit: '',
      scopes: [],
      prescriptions: [],
      refs: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToBodyLevel(id);
      return props.createBodyLevel({ ...values, id });
    }
  })
])(CreateBodyLevel);
