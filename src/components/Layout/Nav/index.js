// @flow
import React from 'react';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { connect } from 'react-redux'
import { flowRight } from 'lodash';
import * as routerActions from '@client/actions/router'

export class Nav extends React.PureComponent {
  render(){
    return (
      <IconMenu icon='more_vert' position='topRight' menuRipple>
        <MenuItem value='signup' caption='Signup' onClick={this.props.goToSignup} />
        <MenuItem value='tests' caption='Tests' />
        <MenuItem value='routines' caption='Routines' />
        <MenuDivider />
        <MenuItem value='signout' icon='delete' caption='Delete' disabled />
      </IconMenu>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  goToSignup: ()=>dispatch(routerActions.push('/signup'))
})

export default flowRight([
  connect(null, mapDispatchToProps),
])(Nav)