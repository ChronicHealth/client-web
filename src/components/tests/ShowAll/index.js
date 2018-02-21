// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { getTests } from '@client/actions/pages/tests';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import * as pageTestSelectors from '@client/selectors/pages/tests';
import TestItem from '../Item';

type $props = Object;

export class ShowAllTests extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getTests();
  }
  render() {
    return (
      <div>
        <h1>Tests</h1>
        <UL>
          {this.props.testIds.map(id => {
            return <TestItem key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      getTests
    },
    dispatch
  );

export const mapStateToProps = createStructuredSelector({
  testIds: pageTestSelectors.getRelated('tests')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllTests
);
