// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UL, ULItem } from 'ui-kit';
import { List } from 'immutable';
import ClientItem from '../Item';
import { push } from '@client/actions/router';
import { getRelated } from '@client/selectors/pages/myClients';
import { getClients } from '@client/actions/pages/myClients';

type $stateProps = { clientIds: List<$$id> };
type $ownProps = {};
type $dispatchProps = { getClients: Function, goToCreate: Function };
type $props = $stateProps & $dispatchProps & $ownProps;
export class ClientsShowAll extends React.PureComponent<$props> {
  componentWillMount() {
    this.props.getClients();
  }
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <h1>Clients</h1>
        <UL>
          <ULItem
            caption="Create Client"
            leftIcon="add"
            onClick={props.goToCreate}
          />
          {props.clientIds.map(id => <ClientItem id={id} key={id} />)}
        </UL>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clientIds: getRelated('clients')
});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      getClients,
      goToCreate: () => push('/clients/create')
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ClientsShowAll
);
