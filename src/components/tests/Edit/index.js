// @flow

import React from 'react';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import Yup from 'yup';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { update as updateTest, goToTest } from '@client/actions/tests';
import uuid from 'uuid/v1';
import TestForm from '../Form';
import { createStructuredSelector } from 'reselect';
import getTest from '../get';

type $props = Object;

export class EditTest extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>{props.test.name}</h1>
        <TestForm fields={this.props.fields} />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, { id }) =>
  bindActionCreators(
    {
      updateTest: values => updateTest(id, values),
      goToTest
    },
    dispatch
  );

const array = Yup.array()
  .of(Yup.string())
  .required();

export default flowRight([
  getTest.connect,
  connect(null, mapDispatchToProps),
  form({
    mapPropsToValues: ({ test }) => ({
      name: test.name,
      purpose: test.purpose,
      notes: test.notes,
      instructives: test.instructives,
      scope: test.scope,
      refs: test.refs
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      purpose: array,
      notes: Yup.string().required(),
      instructives: Yup.string().required(),
      scope: Yup.string().required(),
      refs: array
    }),
    handleChange: props => {
      return (key, onChange) => {
        return value => {
          onChange(value);
          return props.updateTest({ [key]: value });
        };
      };
    },
    handleSubmit: (values, { props }) => {
      const id = uuid();
      props.goToTest(id);
      return props.createTest({ ...values, id });
    }
  }),
  getTest.khange
])(EditTest);
