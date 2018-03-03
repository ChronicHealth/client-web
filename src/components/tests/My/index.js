// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { connect } from 'react-redux';
import { getTests } from '@client/actions/pages/myTests';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import * as pageMyTestSelectors from '@client/selectors/pages/myTests';
import TestItem from '../Item';

type $props = Object;

export class MyTests extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getTests();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateTest}
              selectable
              caption="Create Test"
              leftIcon="add"
            />
          )}
          {this.props.testIds.map(id => {
            return <TestItem canEdit={canEdit} key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, props: Object) =>
  bindActionCreators(
    {
      goToCreateTest: () => push('/tests/create'),
      getTests: () => getTests(props.userId)
    },
    dispatch
  );

export const mapStateToProps = createStructuredSelector({
  testIds: pageMyTestSelectors.getRelated('tests')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyTests
);
