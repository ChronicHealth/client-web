// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getEffects } from '@client/actions/pages/homes';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import EffectItem from '../Item';
import Instructions from '../../general/Instructions';

type $stateProps = {
  effectIds: List<$$id>
};
type $dispatchProps = {
  getEffects: Function
};
type $ownProps = {};

type $props = $stateProps & $dispatchProps & $ownProps;

export class ShowAllEffects extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getEffects();
  }
  render() {
    return (
      <div>
        <Instructions content="Effects are general medical concepts that have been proven to affect the onset of Alzheimer's Disease" />
        <UL>
          {this.props.effectIds.map(id => {
            return <EffectItem key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getEffects
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  effectIds: getRelated('effects')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllEffects
);
