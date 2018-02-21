// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as testSelectors from '@client/selectors/tests';
import { goToEditTest, goToTest } from '@client/actions/tests';
import { bindActionCreators } from '@client/utils/components';

type $props = Object;

export class TestItem extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <ULItem
        onClick={props.canEdit ? props.goToEditTest : props.goToTest}
        caption={props.test.name}
      />
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  test: testSelectors.find()
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props) =>
  bindActionCreators(
    {
      goToEditTest: () => goToEditTest(props.id),
      goToTest: () => goToTest(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TestItem);
