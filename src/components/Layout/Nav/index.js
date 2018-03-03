// @flow
import * as React from 'react';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { isLoggedIn } from '@client/selectors/pages/sessions';
import { currentUser } from '@client/selectors/users';
import { goToUser } from '@client/actions/users';
import { logout } from '@client/actions/pages/sessions';
import * as routerActions from '@client/actions/router';
import styles from './style.pcss';
type $props = Object;

export class Nav extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <IconMenu
        className={styles.moreVert}
        icon="account_circle"
        position="topRight"
        menuRipple
      >
        {props.isLoggedIn ? (
          <React.Fragment>
            <MenuItem
              value="user"
              onClick={() => props.goToUser(props.currentUser.id)}
              icon="account_circle"
              caption={props.currentUser.username}
            />
            <MenuItem
              value="clients"
              onClick={props.goToClients}
              icon="accessibility"
              caption="Clients"
            />
            <MenuDivider />
            <MenuItem
              value="signout"
              onClick={props.logout}
              icon={<span className={styles.signout}>x</span>}
              caption="Signout"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MenuItem
              value="signup"
              caption="Signup"
              onClick={this.props.goToSignup}
            />
            <MenuItem
              value="login"
              caption="Login"
              onClick={this.props.goToLogin}
            />
          </React.Fragment>
        )}
      </IconMenu>
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) => ({
  goToSignup: () => dispatch(routerActions.push('/signup')),
  goToLogin: () => dispatch(routerActions.push('/login')),
  goToClients: () => dispatch(routerActions.push('/clients')),
  goToUser: (id: $$id) => dispatch(goToUser(id)),
  logout: () => {
    dispatch(logout()), dispatch(routerActions.push('/'));
  }
});

export const mapStateToProps = createStructuredSelector({
  isLoggedIn,
  currentUser
});

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(Nav);
