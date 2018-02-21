// @flow

import * as React from 'react';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from '@client/utils/components';
import { flowRight } from 'lodash';
import { typeLabels } from '@client/models/Issue';
import { push } from '@client/actions/router';

type $props = {
  type: number,
  id: $$id,
  goToIssues: Function
};

export class IssuesButton extends React.PureComponent<$props> {
  render() {
    return <Button onClick={this.props.goToIssues}>Issues</Button>;
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch: $$dispatch, props: $props) =>
  bindActionCreators(
    {
      goToIssues: () => push(`/${typeLabels[props.type]}/${props.id}/issues`)
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  IssuesButton
);
