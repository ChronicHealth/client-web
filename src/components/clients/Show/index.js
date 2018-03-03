// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import getClient from '../get';
import ClientForm from '../Form';
import { validateSchema } from '@client/utils/clients';
import Client from '@client/models/Client';
import { form } from '@client/hocs';
import { update } from '@client/actions/clients';
import { Row, Col } from 'ui-kit';
import ClientRoutinesShowAll from 'components/clientRoutines/ShowAll';

type $stateProps = {};
type $ownProps = { id: $$id, client: Client };
type $dispatchProps = { updateClient: Function };
type $props = $stateProps & $dispatchProps & $ownProps;
export class ClientsShow extends React.PureComponent<$props> {
  render() {
    const props = this.props;
    return (
      <div>
        <Row>
          <Col>
            <ClientForm {...props} />
          </Col>
          <Col>
            <ClientRoutinesShowAll clientId={props.id} />
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
  mapPropsToValues: props => props.client.toObject(),
  validateSchema,
  handleChange: props => {
    return (key, onChange) => value => {
      onChange(value);
      return props.updateClient(props.id, { [key]: value });
    };
  }
};

export default flowRight([
  connect(null, mapDispatchToProps),
  getClient,
  form(formik)
])(ClientsShow);
