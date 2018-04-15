// @flow
import React from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import styles from './style.pcss';

export default class ULItem extends React.PureComponent<*> {
  render() {
    const { content, ...props } = this.props;
    if (content) {
      return (
        <ListItem
          {...props}
          itemContent={<div className={styles.itemContent}>{content}</div>}
        />
      );
    }
    return <ListItem {...props} />;
  }
}
