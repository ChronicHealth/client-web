// @flow
import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  refs: Yup.array().of(Yup.string())
});
