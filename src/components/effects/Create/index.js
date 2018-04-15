// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';

import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { validationSchema } from '@client/utils/effects';
import { create as createEffect, goToEffect } from '@client/actions/effects';
import uuid from 'uuid/v1';
import EffectForm from '../Form';

type $ownProps = {};

type $stateProps = {};

type $dispatchProps = {
  createEffect: Function,
  goToEffect: Function
};

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateEffect extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Create Effect</h1>
        <EffectForm fields={this.props.fields} />
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
      createEffect,
      goToEffect
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
      props.goToEffect(id);
      return props.createEffect({ ...values, id });
    }
  })
])(CreateEffect);
