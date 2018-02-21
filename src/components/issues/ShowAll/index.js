// @flow
import * as React from 'react';
import { UL, ULItem } from 'ui-kit';
import IssueItem from '../Item';
import { connect } from 'react-redux';
import { bindActionCreators } from '@client/utils/components';
import { push } from '@client/actions/router';
import * as prescriptionActions from '@client/actions/prescriptions';
import * as routineActions from '@client/actions/routines';
import * as testActions from '@client/actions/tests';
import { flowRight } from 'lodash';
import { types } from '@client/models/Issue';
import khange, { kheck } from 'khange';
type $props = Object;

export class IssueShowAll extends React.PureComponent<$props> {
  render() {
    return (
      <div>
        <h1>Issues</h1>
        <UL>
          <ULItem
            onClick={this.props.goToCreateIssue}
            selectable
            caption="Create Issue"
            leftIcon="add"
          />
          {this.props.issueIds.map(id => <IssueItem key={id} id={id} />)}
        </UL>
      </div>
    );
  }
}

const getIssues = function(type) {
  switch (type) {
    case types.PRESCRIPTION:
      return prescriptionActions.getIssues;
    case types.ROUTINE:
      return routineActions.getIssues;
    default:
      return testActions.getIssues;
  }
};

const mapDispatchToProps = (dispatch: $$dispatch, props: Object) =>
  bindActionCreators(
    {
      goToCreateIssue: () => push(`/issues/${props.type}/create/${props.id}`),
      getIssues: getIssues(props.type)
    },
    dispatch
  );

const onKhange = props => props.getIssues(props.id);

export default flowRight([
  connect(null, mapDispatchToProps),
  khange(kheck('id', 'type'), onKhange)
])(IssueShowAll);
