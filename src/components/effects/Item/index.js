// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as effectSelectors from '@client/selectors/effects';
import { goToEditEffect, goToEffect } from '@client/actions/effects';
import { bindActionCreators } from '@client/utils/components';
import Effect from '@client/models/Effect';

type $stateProps = {
  effect: Effect
};

type $ownProps = {
  id: $$id,
  canEdit?: boolean
};

type $dispatchProps = {
  goToEditEffect: Function,
  goToEffect: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class EffectItem extends React.PureComponent<$props> {
  render() {
    const {
      canEdit,
      effect,
      goToEditEffect,
      goToEffect,
      ...props
    } = this.props;
    return (
      <ULItem
        {...props}
        onClick={canEdit ? goToEditEffect : goToEffect}
        caption={effect.name}
      />
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  effect: effectSelectors.find()
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToEditEffect: () => goToEditEffect(props.id),
      goToEffect: () => goToEffect(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EffectItem);
