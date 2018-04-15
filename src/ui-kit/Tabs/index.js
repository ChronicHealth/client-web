// @flow
import * as React from 'react';
import { Tabs as RTTabs } from 'react-toolbox';

type $props = Object;

const state = {
  index: 0
};

export default class Tabs extends React.PureComponent<$props, typeof state> {
  state = state;
  constructor(props: $props) {
    super(props);
    if (props.index) {
      this.state = {
        index: props.index
      };
    }
  }
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
