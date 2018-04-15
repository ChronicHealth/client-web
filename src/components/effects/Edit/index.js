// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateEffect } from '@client/actions/effects';
import { validationSchema } from '@client/utils/effects';
import EffectForm from '../Form';
import getEffect from '../get';
import type { $stateProps as $getEffectProps } from '../get';

type $stateProps = {};
type $dispatchProps = {
  updateEffect: Function
};
type $ownProps = $getEffectProps;

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class EditEffect extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.effect.name}</h1>
        <EffectForm fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps) =>
  bindActionCreators(
    {
      updateEffect: values => updateEffect(id, values)
    },
    dispatch
  );

export default flowRight([
  getEffect,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ effect }) => ({
      name: effect.name,
      description: effect.description,
      refs: effect.refs
    }),
    validationSchema,
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updateEffect({ [key]: value });
        };
      };
    }
  })
])(EditEffect);
