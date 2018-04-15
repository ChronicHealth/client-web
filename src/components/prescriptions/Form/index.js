// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown } from 'ui-kit';
import { connect } from 'react-redux';
import PrescriptionScope from 'components/scopes/Prescription';
import { Micon, UL, ULItem, Header, SelectDropdown } from '../../../ui-kit';
import CreateScope from './CreateScope';
import { search as searchEffects } from '@client/actions/effects';
import styles from './style.pcss';
import EffectItem from '../../effects/Item';
import { bindActionCreators } from '../../../@client/utils/components';
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
  renderEffects = (values: Array<$$id>) => {
    return (
      <UL>
        {values.map((id, i) => {
          return (
            <EffectItem
              rightActions={[
                <Micon
                  onClick={this.props.fields.effects.onChange.bind(
                    this,
                    removeItemFromArray(id, values)
                  )}
                  key="trash"
                  value="remove"
                />
              ]}
              id={id}
              key={i}
            />
          );
        })}
      </UL>
    );
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
        <TextInput {...props.fields.unit} />
        <Header>
          Scopes (Use these fields to document the default and special case
          action amounts)
        </Header>
        {this.state.isCreatingScope && (
          <CreateScope
            unit={props.fields.unit.value}
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
                  <PrescriptionScope
                    unit={props.fields.unit.value}
                    scope={scope}
                  />
                </div>
              }
            />
          ))}
        </UL>
        <SelectDropdown
          renderValues={this.renderEffects}
          {...props.fields.effects}
          loadOptions={this.props.searchEffects}
        />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      searchEffects
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps)])(PrescriptionForm);
