// @flow
import { Yup } from '../components';

const stringArray = Yup.array().of(Yup.string());

export const scopesValidationSchema = Yup.object().shape({
  scopes: stringArray.required(),
  amountRange: Yup.string().required('Amount range is required'),
  amountTime: Yup.string().required('Amount time is required'),
  amountFrequency: Yup.number().required('Amount frequency is required')
});

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  effects: stringArray,
  notes: Yup.string().required('Synopsis is required'),
  scopes: Yup.array()
    .of(scopesValidationSchema)
    .required(),
  refs: stringArray,
  unit: Yup.string()
});
