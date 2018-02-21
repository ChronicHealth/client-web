// @flow

import * as React from 'react';
import { ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/issues';
import { bindActionCreators } from '@client/utils/components';
import { goToIssue } from '@client/actions/issues';

export class IssuesItem extends React.PureComponent<*> {
  render() {
    const { issue, goToIssue } = this.props;
    return <ULItem onClick={goToIssue} caption={issue.title} />;
  }
}

const mapStateToProps = createStructuredSelector({
  issue: find()
});

const mapDispatchToProps = (dispatch: $$dispatch, props: Object) =>
  bindActionCreators(
    {
      goToIssue: () => goToIssue(props.id)
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  IssuesItem
);
