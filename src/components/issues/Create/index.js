// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { connect } from 'react-redux';
import { form } from '@client/hocs';
import uuid from 'uuid/v1';
import Yup from 'yup';
import { bindActionCreators } from '@client/utils/components';
import { goToIssue, create } from '@client/actions/issues';
import { getParam } from '@client/selectors/router';
import { createStructuredSelector } from 'reselect';
import { Button } from 'ui-kit';
import IssueForm from '../Form';

type $props = Object;

export class IssueCreate extends React.PureComponent<$props> {
  render() {
    return (
      <div>
        <h1>Create Issue</h1>
        <IssueForm {...this.props} />
        <Button
          onClick={this.props.handleSubmit}
          disabled={!this.props.isValid}
        >
          Create
        </Button>
      </div>
    );
  }
}

const formik = {
  mapPropsToValues: () => ({
    title: '',
    content: ''
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    content: Yup.string().required()
  }),
  handleSubmit: (values, { props }) => {
    const id = uuid();
    props.goToIssue(id);
    return props.createIssue({
      ...values,
      id,
      referenceId: props.id,
      type: props.type
    });
  }
};

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      goToIssue,
      createIssue: create
    },
    dispatch
  );

const mapStateToProps = createStructuredSelector({
  type: getParam('type'),
  id: getParam('id')
});

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  form(formik)
])(IssueCreate);
