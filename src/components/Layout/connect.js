// @flow

import { bindActionCreators } from '@client/utils/components';
import { checkIfLoggedIn } from '@client/actions/pages/sessions';

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      checkIfLoggedIn
    },
    dispatch
  );
