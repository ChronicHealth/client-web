// @flow
import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  prescriptions: Yup.array()
    .of(Yup.string().required())
    .required(),
  bodyLevels: Yup.array().of(Yup.string())
});
