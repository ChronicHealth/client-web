// @flow
import React from 'react';
import { flowRight } from 'lodash';
import { ShowMulti } from '@client/utils/components';
import IssuesButton from 'components/issues/Button';
import { types } from '@client/models/Issue';
import get from '../get';
import PrescriptionScope from '../../scopes/Prescription';
import ShowAllReferences from 'components/references/ShowAll';
import { UL } from '../../../ui-kit';

type $props = Object;

export class ShowPrescription extends React.PureComponent<$props> {
  render() {
    const { prescription, ...props } = this.props;
    return (
      <div>
        <h1>{prescription.name}</h1>
        <h3>Synopsis</h3>
        <p>{prescription.notes}</p>
        <ShowMulti title="Effects" values={props.effects.map(e => e.name)} />
        <h3>{`Scopes ${
          prescription.unit ? ` (${prescription.unit})` : ''
        }`}</h3>
        <UL>
          {prescription.scopes.map((scope, i) => {
            return (
              <PrescriptionScope
                key={i}
                scope={scope}
                unit={prescription.unit}
              />
            );
          })}
        </UL>
        <ShowAllReferences references={prescription.refs} />
        <IssuesButton id={props.id} type={types.PRESCRIPTION} />
      </div>
    );
  }
}

export default flowRight([get])(ShowPrescription);
