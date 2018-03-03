// @flow

import khange, { kheck } from 'khange';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { getParam } from '@client/selectors/router';
import { createStructuredSelector } from 'reselect';
import { formParent } from '@client/hocs';
import { find } from '@client/selectors/clients';
import { get } from '@client/actions/clients';

const onKhange = props =>
  props.getClient(props.id).then(() => {
    props.reinitializeForm.go();
  });

const getClientId = getParam('clientId');

const mapStateToProps = createStructuredSelector({
  id: getClientId,
  client: find(getClientId)
});

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      getClient: get
    },
    dispatch
  );

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
