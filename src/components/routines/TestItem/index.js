// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/tests';
import { ULItem, Micon } from 'ui-kit';

export class TestItem extends React.PureComponent<*> {
  handleRemove = () => {
    const { props } = this;
    const index = props.values.indexOf(props.id);
    const nextValues = [...props.values];
    nextValues.splice(index, 1);
    props.onRemove(nextValues);
  };
  render() {
    const { test } = this.props;
    return (
      <ULItem
        caption={test.name}
        rightActions={[
          <Micon onClick={this.handleRemove} key="delete" value="delete" />
        ]}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  test: find()
});

export default flowRight([connect(mapStateToProps)])(TestItem);
