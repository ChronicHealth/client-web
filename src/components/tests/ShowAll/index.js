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
import Instructions from 'components/general/Instructions';

type $props = Object;

export class ShowAllTests extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getTests();
  }
  render() {
    return (
      <div>
        <Instructions content="Standard medical tests that, when taken, can reveal potential problem areas within the body that may lead to Alzheimer's Disease." />
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
