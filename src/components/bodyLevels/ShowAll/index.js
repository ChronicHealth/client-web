// @flow
import React from 'react';
import { UL } from 'ui-kit';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getBodyLevels } from '@client/actions/pages/homes';
import { bindActionCreators } from '@client/utils/components';
import { createStructuredSelector } from 'reselect';
import { getRelated } from '@client/selectors/pages/homes';
import BodyLevelItem from '../Item';
import Instructions from 'components/general/Instructions';

type $stateProps = {
  bodyLevelIds: List<$$id>
};
type $dispatchProps = {
  getBodyLevels: Function
};
type $ownProps = {};

type $props = $stateProps & $dispatchProps & $ownProps;

export class ShowAllBodyLevels extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getBodyLevels();
  }
  render() {
    return (
      <div>
        <Instructions content="Biomarkers are measurable components of the human body." />
        <UL>
          {this.props.bodyLevelIds.map(id => {
            return <BodyLevelItem key={id} id={id} />;
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
      getBodyLevels
    },
    dispatch
  );

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  bodyLevelIds: getRelated('bodyLevels')
});
export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ShowAllBodyLevels
);
