// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ULItem } from 'ui-kit';
import Client from '@client/models/Client';
import { find } from '@client/selectors/clients';
import { goToClient } from '@client/actions/clients';

type $stateProps = { client: Client };
type $ownProps = { id: $$id };
type $dispatchProps = { goToClient: Function };
type $props = $stateProps & $dispatchProps & $ownProps;
export class ClientItem extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return <ULItem caption={props.client.name} onClick={props.goToClient} />;
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  client: find()
});

const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $ownProps
): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToClient: () => goToClient(props.id)
    },
    dispatch
  );

export default flowRight([connect(mapStateToProps, mapDispatchToProps)])(
  ClientItem
);
