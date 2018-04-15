// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown } from 'ui-kit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyName } from '@client/actions/scopes';

type $props = {
  id: $$id,
  fields: Object,
  verifyName: Function
};

export class ScopeForm extends React.PureComponent<$props> {
  onChangeName = (value: string) => {
    this.props.verifyName(value, this.props.id).then(error => {
      if (error) {
        this.props.fields.name.onError('This name is already in use');
      }
      this.props.fields.name.onChange(value);
    });
  };
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} onChange={this.onChangeName} />
        <TextInput rows={3} multiline {...props.fields.description} />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      verifyName
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps)])(ScopeForm);
