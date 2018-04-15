// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { Button } from 'ui-kit';
import styles from './style.pcss';
import { Row, Col, TextInput } from '../../../../ui-kit';
import { scopesValidationSchema as validationSchema } from '../../../../@client/utils/prescriptions';
import { form } from '../../../../@client/hocs';
import SelectScope from '../../../scopes/Select';

type $stateProps = {};
type $ownProps = {
  unit: string
};
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps & $$formProps;

export class CreateScope extends React.PureComponent<$props> {
  render() {
    const { ...props } = this.props;
    return (
      <div className={styles.container}>
        <Row>
          <Col xs={4}>
            <SelectScope
              className={styles.selectScope}
              placeholder="Default"
              default
              {...props.fields.scopes}
            />
          </Col>
          <Col xs={3}>
            <span>
              <TextInput
                className={styles.amountRange}
                {...props.fields.amountRange}
                label="Amount Ranges (ie. 10-20)"
              />
              {props.unit || 'unit'}
            </span>
          </Col>
          <Col xs={5}>
            <TextInput
              {...props.fields.amountTime}
              className={styles.times}
              label="Times (ie. 3-5 times)"
            />
            <span className={styles.timesPer} s>
              x per
            </span>
            <TextInput
              {...props.fields.amountFrequency}
              className={styles.times}
              label="Frequency in days"
            />
            <span>days</span>
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

export default flowRight([
  form({
    mapPropsToValues: () => ({
      scopes: [],
      amountTime: '',
      amountRange: '',
      amountFrequency: ''
    }),
    validationSchema,
    handleSubmit: (values, { props }) => {
      props.toggleCreateScope();
      return props.onChange(props.value.concat(values));
    }
  })
])(CreateScope);
