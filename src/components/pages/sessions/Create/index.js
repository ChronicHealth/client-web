// @flow
import React from 'react';
import { flowRight } from 'lodash';
import { TextInput, Button } from 'ui-kit';
import { bindActionCreators } from 'redux';
import { create as createSession } from '@client/actions/pages/sessions';
import { goToUser } from '@client/actions/users';
import { connect } from 'react-redux';
import { form } from '@client/hocs';
import Yup from 'yup';

type $props = Object;
export class CreateSession extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <TextInput {...props.fields.email} />
        <TextInput type="password" {...props.fields.password} />
        <Button
          primary
          onClick={this.props.handleSubmit}
          disabled={!this.props.isValid}
        >
          Login
        </Button>
      </div>
    );
  }
}
// $FlowFixMe
export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      createSession,
      goToUser: id => goToUser(id)
    },
    dispatch
  );

export const formik = {
  mapPropsToValues: () => ({ password: '', email: '' }),
  validationSchema: Yup.object().shape({
    password: Yup.string().required(),
    email: Yup.string()
      .email()
      .required()
  }),
  handleSubmit: (values: Object, { props }: Object) => {
    return props.createSession(values).then(user => {
      props.goToUser(user.id);
    });
  }
};

export default flowRight([connect(null, mapDispatchToProps), form(formik)])(
  CreateSession
);
