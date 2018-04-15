// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import { flowRight } from 'lodash';
import * as scopeSelectors from '@client/selectors/scopes';
import Scope from '@client/models/Scope';
import { get } from '@client/actions/scopes';
import { bindActionCreators } from '@client/utils/components';
import { formParent } from '@client/hocs';

const getScopeId = getParam('scopeId');

export type $stateProps = {
  id: $$id,
  scope: Scope
};

type $dispatchProps = {
  get: Function
};

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getScopeId,
  scope: scopeSelectors.find(getScopeId)
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
