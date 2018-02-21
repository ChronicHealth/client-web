// @flow
import * as React from 'react';
import Yup from 'yup';
import { flowRight } from 'lodash';
import { form } from '@client/hocs';
import { bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { update } from '@client/actions/users';
import { Card, CardText, TextInput } from 'ui-kit';
type $props = Object;

export class UserEdit extends React.PureComponent<$props> {
  render() {
    const { fields, ...props } = this.props;
    return (
      <Card>
        <CardText>
          <TextInput {...fields.username} />
          <TextInput {...fields.blurb} />
          <TextInput {...fields.location} />
          <TextInput multiline rows={3} {...fields.description} />
        </CardText>
      </Card>
    );
  }
}

const formik = {
  mapPropsToValues: ({ user }) => {
    const { username, description, blurb, location } = user.toObject();
    return {
      username,
      description,
      blurb,
      location
    };
  },
  validateSchema: Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    prescriptions: Yup.array()
      .of(Yup.string().required())
      .required(),
    tests: Yup.array().of(Yup.string().required())
  }),
  handleChange: props => {
    return (key, onChange) => {
      return value => {
        onChange(value);
        return props.update(props.id, {
          [key]: value
        });
      };
    };
  }
};

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      update
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps), form(formik)])(
  UserEdit
);
