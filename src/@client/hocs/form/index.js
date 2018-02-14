// @flow
import * as React from 'react';
import { withFormik } from 'formik';
import { startCase, toLower } from 'lodash';

type $props = Object;

export default (props: Object) => (Comp: React.ComponentType<any>) => {
  const last = {};
  const getFields = (
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched
  ) => {
    if (
      last.values !== values ||
      last.errors !== errors ||
      last.touched !== touched
    ) {
      last.values = values;
      last.errors = errors;
      last.touched = touched;
      last.result = Object.keys(values).reduce((finalResult, key) => {
        finalResult[key] = {
          name: key,
          label: startCase(toLower(key)),
          value: values[key],
          error: touched[key] ? errors[key] : '',
          onChange: value => {
            return setFieldValue(key, value, true);
          },
          onBlur: () => setFieldTouched(key, true)
        };
        return finalResult;
      }, {});
    }
    return last.result;
  };
  class Form extends React.Component<$props> {
    render() {
      const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        ...props
      } = this.props;
      return (
        <Comp
          fields={getFields(
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched
          )}
          {...props}
        />
      );
    }
  }
  return withFormik(props)(Form);
};
