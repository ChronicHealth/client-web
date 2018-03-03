// @flow
import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  notes: Yup.string(),
  prescriptions: Yup.array()
    .of(Yup.string())
    .required()
});
