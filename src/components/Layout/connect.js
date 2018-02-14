// @flow

import { bindActionCreators } from 'redux';
import { checkIfLoggedIn } from '@client/actions/pages/sessions';

// $FlowFixMe
export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      checkIfLoggedIn
    },
    dispatch
  );
