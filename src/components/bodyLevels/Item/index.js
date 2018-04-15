// @flow
import * as React from 'react';
import { ULItem } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as bodyLevelSelectors from '@client/selectors/bodyLevels';
import { goToEditBodyLevel, goToBodyLevel } from '@client/actions/bodyLevels';
import { bindActionCreators } from '@client/utils/components';
import BodyLevel from '@client/models/BodyLevel';

type $stateProps = {
  bodyLevel: BodyLevel
};

type $ownProps = {
  id: $$id,
  canEdit?: boolean
};

type $dispatchProps = {
  goToEditBodyLevel: Function,
  goToBodyLevel: Function
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class BodyLevelItem extends React.PureComponent<$props> {
  render() {
    const {
      bodyLevel,
      canEdit,
      goToEditBodyLevel,
      goToBodyLevel,
      ...props
    } = this.props;
    return (
      <ULItem
        {...props}
        onClick={canEdit ? goToEditBodyLevel : goToBodyLevel}
        caption={bodyLevel.name}
      />
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  bodyLevel: bodyLevelSelectors.find()
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToEditBodyLevel: () => goToEditBodyLevel(props.id),
      goToBodyLevel: () => goToBodyLevel(props.id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BodyLevelItem);
