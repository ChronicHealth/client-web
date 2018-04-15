// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { TextInput, MultiDropdown } from 'ui-kit';
import { connect } from 'react-redux';
import { SelectDropdown, UL } from '../../../ui-kit';
import BodyLevelItem from '../../bodyLevels/Item';
import { bindActionCreators } from '../../../@client/utils/components';
import { search } from '@client/actions/bodyLevels';

type $props = Object;

export class PrescriptionForm extends React.PureComponent<$props> {
  renderBodyLevels = (values: Array<$$id>) => {
    return <UL>{values.map((id, i) => <BodyLevelItem id={id} key={i} />)}</UL>;
  };
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <TextInput {...props.fields.name} />
        <TextInput rows={3} multiline {...props.fields.notes} />
        <SelectDropdown
          renderValues={this.renderBodyLevels}
          loadOptions={this.props.search}
          {...props.fields.bodyLevels}
        />
        <MultiDropdown {...props.fields.refs} label="References" source={[]} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      search
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps)])(PrescriptionForm);
