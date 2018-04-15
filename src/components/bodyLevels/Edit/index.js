// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateBodyLevel } from '@client/actions/bodyLevels';
import { validationSchema } from '@client/utils/bodyLevels';
import BodyLevelForm from '../Form';
import getBodyLevel from '../get';
import type { $stateProps as $getBodyLevelProps } from '../get';

type $stateProps = {};
type $dispatchProps = {
  updateBodyLevel: Function
};
type $ownProps = $getBodyLevelProps;

type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class EditBodyLevel extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.bodyLevel.name}</h1>
        <BodyLevelForm fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps) =>
  bindActionCreators(
    {
      updateBodyLevel: values => updateBodyLevel(id, values)
    },
    dispatch
  );

export default flowRight([
  getBodyLevel,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ bodyLevel }) => ({
      name: bodyLevel.name,
      notes: bodyLevel.notes,
      scopes: bodyLevel.scopes,
      unit: bodyLevel.unit,
      prescriptions: bodyLevel.prescriptions,
      refs: bodyLevel.refs
    }),
    validationSchema,
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updateBodyLevel({ [key]: value });
        };
      };
    }
  })
])(EditBodyLevel);
