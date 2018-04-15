// @flow

import * as React from 'react';
import { ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find, findRelated } from '@client/selectors/issues';
import { bindActionCreators } from '@client/utils/components';
import { goToIssue } from '@client/actions/issues';
import UserChip from 'components/users/Chip';
import { clickable } from '@client/utils/styles';

export class IssuesItem extends React.PureComponent<*> {
  render() {
    const { issue, ...props } = this.props;
    return (
      <ULItem
        content={
          <p className={clickable} onClick={props.goToIssue}>
            {issue.title}
          </p>
        }
        rightActions={[<UserChip key="user" id={props.userId} />]}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  issue: find(),
  userId: findRelated('user')
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
