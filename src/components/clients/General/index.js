// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import getClient from '../get';
import ClientForm from '../Form';
import Client from '@client/models/Client';
import { form } from '@client/hocs';
import { update } from '@client/actions/clients';
import { Row, Col } from 'ui-kit';
import CreateClientRoutine from 'components/clientRoutines/Create';
import EditClientRoutine from 'components/clientRoutines/Edit';
import { validationSchema } from '@client/utils/clients';

type $stateProps = {};
type $ownProps = { id: $$id, client: Client, routineId: $$id };
type $dispatchProps = { updateClient: Function };
type $props = $stateProps & $dispatchProps & $ownProps;

export class ClientsGeneral extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return (
      <div>
        <Row>
          <Col xs={4}>
            <ClientForm {...props} />
          </Col>
          <Col xs={8}>
            {props.routineId ? (
              <EditClientRoutine routineId={props.routineId} />
            ) : (
              <CreateClientRoutine clientId={props.id} />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      updateClient: update
    },
    dispatch
  );

const formik = {
  mapPropsToValues: props => {
    return {
      scopes: props.clientScopeIds.toArray(),
      ...props.client.toObject()
    };
  },
  validationSchema,
  handleChange: props => {
    return (key, onChange) => value => {
      onChange(value);
      return props.updateClient(props.id, { [key]: value });
    };
  }
};

export default flowRight([
  getClient,
  connect(null, mapDispatchToProps),
  form(formik)
])(ClientsGeneral);
