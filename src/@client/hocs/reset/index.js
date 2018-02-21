// @flow
import * as React from 'react';

export default (Comp: *) => {
  class Reset extends React.PureComponent<*> {
    // state: {
    //   id: number
    // }
    state = {
      id: Math.random()
    };
    reset = () => {
      this.setState({
        id: Math.random()
      });
    };
    render() {
      return <Comp reset={this.reset} {...this.props} key={this.state.id} />;
    }
  }
  return Reset;
};
