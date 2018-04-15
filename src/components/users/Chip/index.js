// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Chip } from '../../../ui-kit';
import User from '../../../@client/models/User';
import { find } from '@client/selectors/users';
import { goToUser } from '@client/actions/users';

type $stateProps = {
  user: User
};
type $ownProps = {
  id: $$id
};
type $dispatchProps = {
  goToUser: Function
};
type $props = $stateProps & $dispatchProps & $ownProps;
export class UserChip extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return <Chip onClick={props.goToUser}>{props.user.username}</Chip>;
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  user: find()
});

const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $ownProps
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToUser: () => goToUser(props.id)
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  UserChip
);
