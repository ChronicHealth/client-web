// @flow
import React from 'react';
import { TextInput, Button } from 'ui-kit';
import { flowRight } from 'lodash';
import { create } from '@client/actions/users';
import { connect } from 'react-redux';
import form from '@client/hocs/form';
import { goToUser } from '@client/actions/users';
import Yup from 'yup';
import uuid from 'uuid/v1';

type $props = Object;

export class CreateUser extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <h1>Signup</h1>
        <TextInput type="text" {...props.fields.username} />
        <TextInput type="email" {...props.fields.email} />
        {JSON.stringify(props.errors)}
        <Button
          raised
          primary
          disabled={!this.props.isValid}
          onClick={this.props.handleSubmit}
        >
          Signup
        </Button>
      </div>
    );
  }
}

const formik = form({
  mapPropsToValues: () => ({ username: '', email: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!')
  }),
  handleSubmit: (values, { props }) => {
    const id = uuid();
    props.goToUser(id);
    return props
      .create({
        ...values,
        id
      })
      .then(() => {});
  }
});

export const mapDispatchToProps = (dispatch: $$dispatch) => ({
  create: (values: Object) => dispatch(create(values)),
  goToUser: (id: $$id) => dispatch(goToUser(id))
});

export default flowRight([connect(null, mapDispatchToProps), formik])(
  CreateUser
);
