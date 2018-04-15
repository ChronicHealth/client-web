// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown, SelectDropdown } from 'ui-kit';
import { connect } from 'react-redux';
import { UL, Micon, Header, Button } from '../../../ui-kit';
import PrescriptionItem from '../../prescriptions/Item';
import { removeItemFromArray } from '../../../@client/utils/components';
import { bindActionCreators } from '../../../@client/utils/components';
import { search } from '@client/actions/prescriptions';
import BodyLevelScope from 'components/scopes/BodyLevel';
import CreateScope from './CreateScope';

type $dispatchProps = {
  search: Function
};

type $props = {
  fields: Object
} & $dispatchProps;

const state = {
  isCreatingScope: true
};

export class BodyLevelForm extends React.PureComponent<$props, typeof state> {
  state = state;
  toggleCreateScope = () => {
    this.setState({
      isCreatingScope: !this.state.isCreatingScope
    });
  };
  renderPrescriptions = (values: Array<$$id>) => {
    return (
      <UL>
        {values.map(id => (
          <PrescriptionItem
            id={id}
            key={id}
            leftActions={[
              <Micon
                key="remove"
                value="remove"
                onClick={() =>
                  this.props.fields.prescriptions.onChange(
                    removeItemFromArray(id, values)
                  )
                }
              />
            ]}
          />
        ))}
      </UL>
    );
  };
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} />
        <TextInput rows={3} multiline {...props.fields.notes} />
        <TextInput {...props.fields.unit} />
        <Header>Scopes</Header>
        {this.state.isCreatingScope && (
          <CreateScope
            unit={props.fields.unit.value}
            toggleCreateScope={this.toggleCreateScope}
            onChange={props.fields.scopes.onChange}
            value={props.fields.scopes.value}
          />
        )}
        <UL>
          {props.fields.scopes.value.map((scope, i) => (
            <BodyLevelScope
              unit={props.fields.unit.value}
              key={i}
              scope={scope}
            />
          ))}
        </UL>
        {!this.state.isCreatingScope && (
          <Button onClick={this.toggleCreateScope}>Add Scope</Button>
        )}
        <SelectDropdown
          loadOptions={props.search}
          renderValues={this.renderPrescriptions}
          {...props.fields.prescriptions}
        />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      search
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps)])(BodyLevelForm);
