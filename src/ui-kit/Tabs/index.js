// @flow
import * as React from 'react';
import { Tabs as RTTabs } from 'react-toolbox';

type $props = Object;

export default class Tabs extends React.PureComponent<$props, *> {
  state = {
    index: 0
  };
  handleTabChange = (index: number) => {
    this.setState({
      index
    });
  };
  render() {
    return (
      <RTTabs
        index={this.state.index}
        onChange={this.handleTabChange}
        {...this.props}
      >
        {this.props.children}
      </RTTabs>
    );
  }
}
