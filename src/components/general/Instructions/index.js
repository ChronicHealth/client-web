// @flow
import * as React from 'react';
import styles from './style.pcss';

type $props = Object;
export default class Instructions extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return <p className={styles.instructions}>{props.content}</p>;
  }
}
