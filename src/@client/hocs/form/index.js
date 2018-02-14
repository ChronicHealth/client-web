// @flow
import * as React from 'react';
import { withFormik } from 'formik';
import { startCase, toLower } from 'lodash';

type $props = Object;

export default (properties: Object) => {
  const last = {};
  const getFields = (
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleChange
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
        const onChange = value => setFieldValue(key, value, true);
        finalResult[key] = {
          name: key,
          label: startCase(toLower(key)),
          value: values[key],
          error: touched[key] ? errors[key] : '',
          onChange: handleChange ? handleChange(key, onChange) : onChange,
          onBlur: () => setFieldTouched(key, true)
        };
        return finalResult;
      }, {});
    }
    return last.result;
  };
  return (Comp: React.ComponentType<any>) => {
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
              setFieldTouched,
              properties.handleChange(props)
            )}
            {...props}
          />
        );
      }
    }
    return withFormik(properties)(Form);
  };
};
