// @flow
import React from 'react';
import { UL, ULItem } from 'ui-kit';
import { flowRight } from 'lodash';
import { push } from '@client/actions/router';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getBodyLevels } from '@client/actions/users';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/users';
import BodyLevelItem from '../Item';

type $stateProps = {
  bodyLevelIds: List<$$id>
};
type $dispatchProps = {
  goToCreateBodyLevel: Function,
  getBodyLevels: Function
};
type $ownProps = {
  canEdit: boolean,
  userId: $$id
};

type $props = $stateProps & $dispatchProps & $ownProps;

export class MyBodyLevels extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getBodyLevels();
  }
  render() {
    const { canEdit } = this.props;
    return (
      <div>
        <UL>
          {canEdit && (
            <ULItem
              onClick={this.props.goToCreateBodyLevel}
              selectable
              caption="Create Biomarker"
              leftIcon="add"
            />
          )}
          {this.props.bodyLevelIds.map(id => {
            return <BodyLevelItem canEdit={canEdit} key={id} id={id} />;
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
      goToCreateBodyLevel: () => push('/body_levels/create'),
      getBodyLevels: () => getBodyLevels(props.userId)
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  bodyLevelIds: getRelated('bodyLevels', (state, props) => props.userId)
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  MyBodyLevels
);
