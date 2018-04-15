// @flow
import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  general: Yup.string(),
  scopes: Yup.array().of(Yup.string())
});
