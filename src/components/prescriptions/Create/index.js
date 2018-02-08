// @flow

import React from 'react'
import {withFormik} from 'formik'
import Yup from 'yup'

export class CreatePrescription extends React.PureComponent {
  render(){
    return <div>
      <h1>Create Prescription</h1>
    </div>
  }
}

export default withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(CreatePrescription)