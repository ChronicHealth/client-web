// @flow
import React from 'react';
import TextInput from '../TextInput';
// import Dropdown from 'react-toolbox/lib/dropdown'
import Chip from '../Chip';
import { createSelector } from 'reselect';
type $props = Object;
type $state = {
  value: string
};

export default class MultiDropdown extends React.PureComponent<$props, $state> {
  state = {
    value: ''
  };
  mapOfSource: Function;
  constructor(props: $props) {
    super(props);
    this.mapOfSource = createSelector([props => props.source], source => {
      return source.reduce((finalResult, option) => {
        finalResult[option.id] = option;
        return finalResult;
      }, {});
    });
  }
  onChange = (value: string) => {
    this.setState(prev => ({
      ...prev,
      value
    }));
  };
  onEnter = (event: Event) => {
    if (event.key === 'Enter') {
      this.props.onChange(this.props.value.concat([this.state.value]));
      this.setState({
        value: ''
      });
    }
  };
  handleDeleteClick = (id: $$id) => {
    const values = [...this.props.value];
    const index = values.indexOf(id);
    values.splice(index, 1);
    this.props.onChange(values);
  };
  render() {
    const { props } = this;
    // const mapOfSource = this.mapOfSource(props)
    return (
      <div>
        <TextInput
          {...props}
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.onEnter}
        />
        {props.value.map((id, i) => {
          return (
            <Chip
              key={i}
              deletable
              onDeleteClick={this.handleDeleteClick.bind(this, id)}
            >
              {id}
            </Chip>
          );
        })}
      </div>
    );
  }
}
