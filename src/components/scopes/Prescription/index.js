// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { Row } from 'ui-kit';
import { findEntity } from '@client/selectors/scopes';
import { Col } from '../../../ui-kit';
import { List } from 'immutable';

type $stateProps = {};
type $ownProps = {};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;
export class PrescriptionScope extends React.PureComponent<$props> {
  render() {
    const { scope, scopes, ...props } = this.props;
    return (
      <Row>
        <Col xs={4}>
          <p>{scopes.join(', ')}</p>
        </Col>
        <Col xs={4}>
          <p>{scope.amountRange}</p>
        </Col>
        <Col xs={4}>
          <p>{scope.amountTime}</p>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  scopes: createSelector(
    [
      (state, props) => props.scope.scopes,
      findEntity(),
      (state, props) => props.scope
    ],
    (scopeIds, scopes, scope) => {
      return scopeIds ? scopeIds.map(id => scopes.getIn([id, 'name'])) : List();
    }
  )
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators({}, dispatch);

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  PrescriptionScope
);
