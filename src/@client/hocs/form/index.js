// @flow
import * as React from 'react';
import { withFormik } from 'formik';
import { startCase, toLower, flowRight } from 'lodash';
import sentence from 'sentence-case';
import reset from '../reset';

type $props = Object;

export default (properties: Object) => {
  const last = {};
  const mapPropsToValues = props => {
    const initialValue = properties.mapPropsToValues(props);
    if (!last.initialValue) {
      last.initialValue = initialValue;
    }
    return last.initialValue;
  };
  const getFields = (
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
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
          label: startCase(sentence(key)),
          value: values[key],
          error: touched[key] ? errors[key] : '',
          onChange: handleChange ? handleChange(key, onChange) : onChange,
          onError: (value, error) => {
            onChange(value);
            setFieldError(key, error);
          },
          onBlur: () => setFieldTouched(key, true)
        };
        return finalResult;
      }, {});
    }
    return last.result;
  };
  return (Comp: React.ComponentType<any>) => {
    class Form extends React.Component<$props> {
      componentWillMount() {
        if (this.props.passUpReinitializeForm)
          this.props.passUpReinitializeForm(this.reinitializeForm);
      }
      reinitializeForm = () => {
        last.initialValue = undefined;
        this.props.reset();
      };
      render() {
        const {
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          setFieldError,
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
              setFieldError,
              properties.handleChange
                ? properties.handleChange(props)
                : undefined
            )}
            {...props}
          />
        );
      }
    }
    return flowRight([
      reset,
      withFormik({ ...properties, mapPropsToValues, enableReinitialize: true })
    ])(Form);
  };
};
