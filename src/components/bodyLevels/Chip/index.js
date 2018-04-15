// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find } from '@client/selectors/bodyLevels';
import { Chip } from '../../../ui-kit';
import BodyLevel from '../../../@client/models/BodyLevel';

type $stateProps = { bodyLevel: BodyLevel };
type $ownProps = {};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;
export class BodyLevelChip extends React.PureComponent<$props> {
  render() {
    const { bodyLevel, ...props } = this.props;
    return <Chip {...props}>{bodyLevel.name}</Chip>;
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  bodyLevel: find()
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators({}, dispatch);

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  BodyLevelChip
);
