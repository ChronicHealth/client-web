// @flow
import * as React from 'react';

export default (onComponentWillMount: Function) => (Comp: *) => {
  class ComponentWillMount extends React.PureComponent<*> {
    componentWillMount() {
      onComponentWillMount(this.props);
    }
    render() {
      return <Comp {...this.props} />;
    }
  }
  return ComponentWillMount;
};
