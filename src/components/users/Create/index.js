// @flow
import React from 'react'
import {TextInput, Button} from 'ui-kit'
import { flowRight } from 'lodash'
import { withFormik } from 'formik'
import Yup from 'yup';

export class CreateUser extends React.PureComponent {
  render(){
    return <div>
      <h1>Signup</h1>
      <TextInput label="Username" type="text" name="username" />
      <TextInput label="Email" type="email" name="email" />
      <Button raised primary>Signup</Button>
    </div>
  }
}

const formik = withFormik({
  mapPropsToValues: () => ({ username: '', email: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values)
      setSubmitting(false);
    }, 1000);
  },
})

export default flowRight([
  
])(CreateUser)