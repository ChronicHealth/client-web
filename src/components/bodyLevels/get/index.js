// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import { flowRight } from 'lodash';
import * as bodyLevelSelectors from '@client/selectors/bodyLevels';
import BodyLevel from '@client/models/BodyLevel';
import { get } from '@client/actions/bodyLevels';
import { getBatch } from '@client/actions/prescriptions';
import { bindActionCreators } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getBodyLevelId = getParam('bodyLevelId');

export type $stateProps = {
  id: $$id,
  bodyLevel: BodyLevel
};

type $dispatchProps = {
  get: Function,
  batchPrescriptions: Function
};

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getBodyLevelId,
  bodyLevel: bodyLevelSelectors.find(getBodyLevelId)
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      get,
      batchPrescriptions: getBatch
    },
    dispatch
  );

export const onKhange = (
  props: $$formParentProps & $stateProps & $dispatchProps
) => {
  props.get(props.id).then(bodyLevel => {
    props.batchPrescriptions(bodyLevel.prescriptions);
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
