// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateScope } from '@client/actions/scopes';
import { validationSchema } from '@client/utils/scopes';
import ScopeForm from '../Form';
import getScope from '../get';
import type { $stateProps as $getScopeProps } from '../get';

type $stateProps = {};
type $dispatchProps = {
  updateScope: Function
};
type $ownProps = $getScopeProps;

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class EditScope extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.scope.name}</h1>
        <ScopeForm fields={this.props.fields} id={this.props.id} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps) =>
  bindActionCreators(
    {
      updateScope: values => updateScope(id, values)
    },
    dispatch
  );

export default flowRight([
  getScope,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ scope }) => ({
      name: scope.name,
      description: scope.description,
      refs: scope.refs
    }),
    validationSchema,
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updateScope({ [key]: value });
        };
      };
    }
  })
])(EditScope);
