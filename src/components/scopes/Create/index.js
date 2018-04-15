// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';

import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { validationSchema } from '@client/utils/scopes';
import { create as createScope, goToScope } from '@client/actions/scopes';
import uuid from 'uuid/v1';
import ScopeForm from '../Form';

type $ownProps = {};

type $stateProps = {};

type $dispatchProps = {
  createScope: Function,
  goToScope: Function
};

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateScope extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Scope</h1>
        <ScopeForm fields={this.props.fields} />
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
      createScope,
      goToScope
    },
    dispatch
  );

export default flowRight([
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: () => ({
      name: '',
      description: '',
      refs: []
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToScope(id);
      return props.createScope({ ...values, id });
    }
  })
])(CreateScope);
