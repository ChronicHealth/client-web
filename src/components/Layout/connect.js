// @flow

import { bindActionCreators } from '@client/utils/components';
import { checkIfLoggedIn } from '@client/actions/pages/sessions';
import { push } from '@client/actions/router';
import { index } from '@client/actions/scopes';

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      checkIfLoggedIn,
      goHome: () => push('/'),
      indexScopes: index
    },
    dispatch
  );
