// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as prescriptionSelectors from '@client/selectors/prescriptions';

import { get } from '@client/actions/prescriptions';
import { bindActionCreators } from 'redux';

const getPrescriptionId = getParam('prescriptionId');

export const mapStateToProps = createStructuredSelector({
  id: getPrescriptionId,
  prescription: prescriptionSelectors.find(getPrescriptionId)
});

// $FlowFixMe
export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
