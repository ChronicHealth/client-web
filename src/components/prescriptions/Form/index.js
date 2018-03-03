// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown } from 'ui-kit';

import PrescriptionScope from 'components/scopes/Prescription';
import { UL, ULItem, Header } from '../../../ui-kit';
import CreateScope from './CreateScope';
import Micon from '../../../ui-kit/Micon';
import styles from './style.pcss';
import { removeItemFromArray } from '../../../@client/utils/components';
type $props = Object;

const state = {
  // isCreatingScope: false
  isCreatingScope: true
};

export class PrescriptionForm extends React.PureComponent<
  $props,
  typeof state
> {
  state = state;
  toggleCreateScope = () => {
    this.setState({
      isCreatingScope: !this.state.isCreatingScope
    });
  };
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} />
        <TextInput
          rows={3}
          multiline
          {...props.fields.notes}
          label="Synopsis"
        />
        <Header>Scopes</Header>
        {this.state.isCreatingScope && (
          <CreateScope
            toggleCreateScope={this.toggleCreateScope}
            {...props.fields.scopes}
          />
        )}
        <UL>
          {!this.state.isCreatingScope && (
            <ULItem
              caption="Add Scope"
              leftIcon="add"
              onClick={this.toggleCreateScope}
            />
          )}
          {props.fields.scopes.value.map((scope, i) => (
            <ULItem
              leftActions={[
                <Micon
                  key="remove"
                  value="remove"
                  onClick={() =>
                    props.fields.scopes.onChange(
                      removeItemFromArray(scope, props.fields.scopes.value)
                    )
                  }
                />
              ]}
              key={i}
              itemContent={
                <div className={styles.scope}>
                  <PrescriptionScope scope={scope} />
                </div>
              }
            />
          ))}
        </UL>
        <MultiDropdown {...props.fields.effects} source={[]} />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

export default flowRight([])(PrescriptionForm);
