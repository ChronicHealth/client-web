// @flow

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { getRelated } from '@client/selectors/routines';
import { bindActionCreators } from '@client/utils/components';
import { formParent } from '@client/hocs';
import { List } from 'immutable';

const getRoutineId = (state, props) => props.routineId;

export type $stateProps = {
  id: $$id,
  prescriptionIds: List<$$id>,
  bodyLevelIds: List<$$id>
};

type $dispatchProps = {};

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getRoutineId,
  prescriptionIds: getRelated('prescriptions', getRoutineId),
  bodyLevelIds: getRelated('bodyLevels', getRoutineId)
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> => bindActionCreators({}, dispatch);

export default flowRight([connect(mapStateToProps, mapDispatchToProps)]);
