// @flow
import React from 'react';
import Yup from 'yup';
import uuid from 'uuid/v1';
import CommentForm from '../Form';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { form } from '@client/hocs';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { createComment } from '@client/actions/issues';

export class CreateComment extends React.PureComponent<Object> {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <CommentForm {...this.props} />
        <Button onClick={props.handleSubmit} disabled={!props.isValid}>
          Create
        </Button>
      </div>
    );
  }
}

const formik = {
  mapPropsToValues: () => ({
    content: ''
  }),
  validationSchema: Yup.object().shape({
    content: Yup.string().required()
  }),
  handleSubmit: (values, { props }) => {
    const id = uuid();
    props.toggleCreateComment();
    return props.createComment(props.issueId, { ...values, id });
  }
};

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      createComment
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps), form(formik)])(
  CreateComment
);
