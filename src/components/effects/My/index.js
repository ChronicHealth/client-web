// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getEffects } from '@client/actions/users';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/users';
import EffectItem from '../Item';

type $stateProps = {
  effectIds: List<$$id>
};
type $dispatchProps = {
  goToCreateEffect: Function,
  getEffects: Function
};
type $ownProps = {
  canEdit: boolean,
  userId: $$id
};

type $props = $stateProps & $dispatchProps & $ownProps;

export class MyEffects extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getEffects();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateEffect}
              selectable
              caption="Create Effect"
              leftIcon="add"
            />
          )}
          {this.props.effectIds.map(id => {
            return <EffectItem canEdit={canEdit} key={id} id={id} />;
          })}
        </UL>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $ownProps
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToCreateEffect: () => push('/effects/create'),
      getEffects: () => getEffects(props.userId)
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  effectIds: getRelated('effects', (state, props) => props.userId)
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyEffects
);
