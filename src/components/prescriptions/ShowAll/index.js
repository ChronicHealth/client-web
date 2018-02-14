// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { connect } from 'react-redux';

type $props = Object;

export class ShowAllPrescriptions extends React.PureComponent<$props> {
  render() {
    return (
      <div>
        <h1>Prescriptions</h1>
        <UL>
          <ULItem
            onClick={this.props.goToCreatePrescription}
            selectable
            caption="Create Prescription"
            leftIcon="add"
          />
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) => ({
  goToCreatePrescription: () => dispatch(push('/prescriptions/create'))
});

export default flowRight([connect(null, mapDispatchToProps)])(
  ShowAllPrescriptions
);
