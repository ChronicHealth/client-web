// @flow
import * as React from 'react';
import { flowRight, bindActionCreators, Yup } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CommentForm from '../Form';
import { form } from '@client/hocs';
import { update } from '@client/actions/comments';
import { Button } from 'ui-kit';

type $stateProps = {};
type $ownProps = Object;
type $dispatchProps = {
  updateComment: Function
};
type $props = $stateProps & $dispatchProps & $ownProps;

export class EditComment extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <CommentForm {...props} />
        <Button onClick={props.toggleFinished}>Finished Editing</Button>
      </div>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector(
  {}
);

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      updateComment: update
    },
    dispatch
  );

const formik = {
  mapPropsToValues: props => {
    return {
      content: props.comment.content
    };
  },
  validateSchema: Yup.object().shape({
    content: Yup.string().required()
  }),
  handleChange: props => {
    return (key, onChange) => {
      return value => {
        onChange(value);
        return props.updateComment(props.id, { [key]: value });
      };
    };
  }
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  form(formik)
])(EditComment);
