// @flow
import * as React from 'react';

export default (Comp: *) =>
  class FormParent extends React.PureComponent<*> {
    reinitializeForm = {
      go: () => console.log('unset')
    };
    passUpReinitializeForm = (reinitializeForm: Function) => {
      this.reinitializeForm.go = reinitializeForm;
    };
    render() {
      return (
        <Comp
          {...this.props}
          reinitializeForm={this.reinitializeForm}
          passUpReinitializeForm={this.passUpReinitializeForm}
        />
      );
    }
  };
