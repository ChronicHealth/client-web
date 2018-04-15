// @flow

import khange, { kheck } from 'khange';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { createStructuredSelector } from 'reselect';
import { formParent } from '@client/hocs';
import { find, findRelated, getRelated } from '@client/selectors/clients';
import { get as getClient, getRoutine } from '@client/actions/clients';

const onKhange = props =>
  Promise.all([props.getClient(props.id), props.getRoutine(props.id)]).then(
    () => {
      props.reinitializeForm.go();
    }
  );

const getClientId = getParam('clientId');

const mapStateToProps = createStructuredSelector({
  id: getClientId,
  client: find(getClientId),
  routineId: findRelated('routine', getClientId),
  clientId: getClientId,
  clientScopeIds: getRelated('scopes', getClientId)
});

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      getClient,
      getRoutine
    },
    dispatch
  );

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
