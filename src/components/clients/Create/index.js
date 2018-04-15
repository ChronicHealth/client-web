// @flow
import * as React from 'react';
import { flowRight, bindActionCreators } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ClientForm from '../Form';
import { form } from '@client/hocs';
import { Button } from 'ui-kit';
import { validationSchema } from '@client/utils/clients';
import uuid from 'uuid/v1';
import { goToClient, create } from '@client/actions/clients';

type $stateProps = {};
type $ownProps = {};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;
export class CreateClient extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <h1>Create Client</h1>
        <ClientForm {...props} />
        <Button onClick={props.handleSubmit} disabled={!props.isValid}>
          Create
        </Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> =>
  bindActionCreators(
    {
      goToClient,
      createClient: create
    },
    dispatch
  );

const formik = {
  mapPropsToValues: () => ({
    name: '',
    general: '',
    scopes: []
  }),
  validationSchema,
  handleSubmit: (values, { props }) => {
    const id = uuid();
    props.goToClient(id);
    props.createClient({
      ...values,
      id
    });
  }
};
export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  form(formik)
])(CreateClient);
