// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import { flowRight } from 'lodash';
import * as effectSelectors from '@client/selectors/effects';
import Effect from '@client/models/Effect';
import { get } from '@client/actions/effects';
import { bindActionCreators } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getEffectId = getParam('effectId');

export type $stateProps = {
  id: $$id,
  effect: Effect
};

type $dispatchProps = {
  get: Function
};

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getEffectId,
  effect: effectSelectors.find(getEffectId)
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (
  props: $$formParentProps & $stateProps & $dispatchProps
) => {
  props.get(props.id).then(() => {
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
