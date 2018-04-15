// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/bodyLevels';
import { ULItem, Micon } from 'ui-kit';

export class BodyLevelItem extends React.PureComponent<*> {
  handleRemove = () => {
    const { props } = this;
    const index = props.values.indexOf(props.id);
    const nextValues = [...props.values];
    nextValues.splice(index, 1);
    props.onRemove(nextValues);
  };
  render() {
    const { bodyLevel } = this.props;
    return (
      <ULItem
        caption={bodyLevel.name}
        rightActions={[
          <Micon onClick={this.handleRemove} key="delete" value="delete" />
        ]}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  bodyLevel: find()
});

export default flowRight([connect(mapStateToProps)])(BodyLevelItem);
