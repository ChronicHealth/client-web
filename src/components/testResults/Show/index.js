// @flow
import React from 'react';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { find } from '@client/selectors/testResults';
import { getId } from '@client/utils/testResults';
import { get } from '@client/actions/testResults';
import type { $stateProps } from '../get';
import EditTestResult from '../Edit';
import CreateTestResult from '../Create';
import { bindActionCreators } from '../../../@client/utils/components';
import khange, { kheck } from 'khange';
import { formParent } from '../../../@client/hocs';

type $props = $stateProps;

export class ShowTestResult extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        {props.testResult.id ? (
          <EditTestResult {...props} />
        ) : (
          <CreateTestResult {...props} />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  testResult: find((state, props) => getId(props))
});

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

const onKhange = props => {
  if (props.bodyLevelId && props.clientId && props.date) {
    return props.get(props).then(() => {
      props.reinitializeForm && props.reinitializeForm.go();
    });
  }
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('bodyLevelId', 'clientId', 'date'), onKhange)
])(ShowTestResult);
