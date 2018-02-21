// @flow
import * as React from 'react';
import Yup from 'yup';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { update } from '@client/actions/issues';
import { form } from '@client/hocs';
import { connect } from 'react-redux';
import IssuesForm from '../Form';
import getIssue from '../get';

type $props = Object;

export class IssueEdit extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <IssuesForm {...props} />
      </div>
    );
  }
}

const formik = {
  mapPropsToValues: ({ issue }) => ({
    title: issue.title,
    content: issue.content
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    content: Yup.string().required()
  }),
  handleChange: props => {
    return (key, onChange) => {
      return value => {
        onChange(value);
        return props.updateIssue(props.id, { [key]: value });
      };
    };
  }
};

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      updateIssue: update
    },
    dispatch
  );

export default flowRight([
  getIssue,
  connect(null, mapDispatchToProps),
  form(formik)
])(IssueEdit);
