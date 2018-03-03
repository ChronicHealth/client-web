// @flow
import * as React from 'react';
import styles from './style.pcss';
type $props = Object;
export default class Header extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return <h3 className={styles.container}>{this.props.children}</h3>;
  }
}
