// @flow
import React from 'react';
import { flowRight } from 'lodash';
import ULItem from 'ui-kit/UL/Item';
import UL from 'ui-kit/UL';
import getRoutine from '../get';
import Instructions from '../../general/Instructions';
import PrescriptionItem from 'components/routines/PrescriptionItem';
import BodyLevelItem from 'components/bodyLevels/Item';

type $props = Object;

class ShowMulti extends React.PureComponent<Object> {
  render() {
    const { props } = this;
    return (
      <div>
        <h3>{props.title}</h3>
        <UL>
          {props.values.map((value, i) => {
            return <ULItem key={i} caption={value} />;
          })}
        </UL>
      </div>
    );
  }
}

export class ShowRoutine extends React.PureComponent<$props> {
  render() {
    const { props } = this;
    return (
      <div>
        <Instructions content="The routine is a single designation of actions and biomarkers that all clients of the site use as their default settings." />
        <div>
          <h3>Actions</h3>
          <UL>
            {props.prescriptions.map((p, i) => {
              return <PrescriptionItem goTo key={i} id={p.id} />;
            })}
          </UL>
        </div>
        <div>
          <h3>Biomarkers</h3>
          <UL>
            {props.bodyLevels.map((p, i) => {
              return <BodyLevelItem key={i} id={p.id} />;
            })}
          </UL>
        </div>
      </div>
    );
  }
}

export default flowRight([getRoutine])(ShowRoutine);
