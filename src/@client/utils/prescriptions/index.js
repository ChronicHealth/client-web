// @flow
import { Yup } from '../components';

const stringArray = Yup.array().of(Yup.string());

export const scopesValidationSchema = Yup.object().shape({
  scopes: stringArray.required(),
  amountRange: Yup.string().required(),
  amountTime: Yup.string()
});

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  effects: stringArray,
  notes: Yup.string().required('Synopsis is required'),
  scopes: Yup.array()
    .of(scopesValidationSchema)
    .required(),
  refs: stringArray
});
