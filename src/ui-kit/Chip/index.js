// @flow
import * as React from 'react';
import RTChip from 'react-toolbox/lib/chip';
import styles from './style.pcss';
import classnames from 'classnames';

type $props = {
  className?: string,
  onClick?: Function,
  children: any
};

export default class Chip extends React.PureComponent<$props> {
  render() {
    return (
      <RTChip
        {...this.props}
        className={classnames(this.props.className, {
          [styles.onClick]: this.props.onClick
        })}
      />
    );
  }
}
