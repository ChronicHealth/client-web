// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/prescriptions';
import { ULItem, Micon } from 'ui-kit';

export class PrescriptionItem extends React.PureComponent<*> {
  handleRemove = () => {
    const { props } = this;
    const index = props.values.indexOf(props.id);
    const nextValues = [...props.values];
    nextValues.splice(index, 1);
    props.onRemove(nextValues);
  };
  render() {
    const { prescription } = this.props;
    return (
      <ULItem
        caption={prescription.name}
        rightActions={[
          <Micon onClick={this.handleRemove} key="delete" value="delete" />
        ]}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  prescription: find()
});

export default flowRight([connect(mapStateToProps)])(PrescriptionItem);
