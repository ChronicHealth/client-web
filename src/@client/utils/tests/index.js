// @flow
import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  notes: Yup.string().required(),
  bodyLevels: Yup.array().of(Yup.string().required()),
  refs: Yup.array()
    .of(Yup.string())
    .required()
});
