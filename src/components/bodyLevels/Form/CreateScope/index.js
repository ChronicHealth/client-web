// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { SelectDropdown, Button } from 'ui-kit';
import ScopeChip from '../../../scopes/Chip';
import { removeItemFromArray } from '../../../../@client/utils/components';
import styles from './style.pcss';
import { Row, Col, TextInput } from '../../../../ui-kit';
import { scopesValidationSchema as validationSchema } from '@client/utils/bodyLevels';
import { form } from '../../../../@client/hocs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { scopesJS } from '@client/selectors/scopes';

type $stateProps = {};
type $ownProps = {};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateScope extends React.PureComponent<$props> {
  renderSelectedScopes = (values: Array<$$id>) => {
    return (
      <div>
        {values.map(id => (
          <ScopeChip
            onDeleteClick={() =>
              this.props.fields.scopes.onChange(removeItemFromArray(id, values))
            }
            id={id}
            key={id}
          />
        ))}
      </div>
    );
  };

  render() {
    const { ...props } = this.props;
    return (
      <div className={styles.container}>
        <Row>
          <Col xs={6}>
            <SelectDropdown
              {...props.fields.scopes}
              className={styles.selectScope}
              sync
              renderValues={this.renderSelectedScopes}
              options={props.scopes}
            />
          </Col>
          <Col xs={6}>
            <span>
              <TextInput
                className={styles.amountRange}
                {...props.fields.amountRange}
                label="Amount Ranges (IE. 3.9–5.5)"
              />
              {props.unit}
            </span>
          </Col>
        </Row>
        <Button
          onClick={this.props.handleSubmit}
          disabled={!this.props.isValid}
        >
          Add Scope
        </Button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  scopes: scopesJS
});

export default flowRight([
  form({
    mapPropsToValues: () => ({
      scopes: [],
      amountRange: ''
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      props.toggleCreateScope();
      return props.onChange(props.value.concat(values));
    }
  }),
  connect(mapStateToProps, null)
])(CreateScope);
