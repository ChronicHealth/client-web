// @flow
import * as React from 'react';
import { flowRight } from 'lodash';
import { SelectDropdown, UL } from 'ui-kit';
import { bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { search as searchPrescriptions } from '@client/actions/prescriptions';
import { search as searchBodyLevels } from '@client/actions/bodyLevels';
import PrescriptionItem from '../PrescriptionItem';
import BodyLevelItem from '../BodyLevelItem';

type $props = Object;

export class RoutineForm extends React.PureComponent<$props> {
  renderPrescriptionValues = (values: $$id[]) => {
    return (
      <UL>
        {values.map(id => (
          <PrescriptionItem
            onRemove={this.props.fields.prescriptions.onChange}
            values={values}
            id={id}
            key={id}
          />
        ))}
      </UL>
    );
  };
  renderBodyLevelValues = (values: $$id[]) => {
    return (
      <React.Fragment>
        <UL>
          {values.map(id => (
            <BodyLevelItem
              onRemove={this.props.fields.bodyLevels.onChange}
              values={values}
              id={id}
              key={id}
            />
          ))}
        </UL>
      </React.Fragment>
    );
  };
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <SelectDropdown
          renderValues={this.renderPrescriptionValues}
          {...props.fields.prescriptions}
          placeholder="Actions"
          loadOptions={props.searchPrescriptions}
        />
        <SelectDropdown
          renderValues={this.renderBodyLevelValues}
          {...props.fields.bodyLevels}
          loadOptions={props.searchBodyLevels}
          placeholder="Biomarkers"
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      searchPrescriptions,
      searchBodyLevels
    },
    dispatch
  );

export default flowRight([connect(null, mapDispatchToProps)])(RoutineForm);
