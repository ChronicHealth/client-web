// @flow
import { Yup } from '../components';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  prescriptions: Yup.array()
    .of(Yup.string().required())
    .required(),
  tests: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      prescriptionGroupId: Yup.string().required()
    })
  )
});
