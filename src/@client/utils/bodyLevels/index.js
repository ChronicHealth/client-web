// @flow
import Yup from 'yup';

export const scopesValidationSchema = Yup.object().shape({
  scopes: Yup.array()
    .of(Yup.string())
    .required(),
  amountRange: Yup.string().required()
});

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  notes: Yup.string(),
  unit: Yup.string().required(),
  scopes: Yup.array().of(scopesValidationSchema),
  prescriptions: Yup.array(Yup.string().required()).required(),
  refs: Yup.array(Yup.string())
});
