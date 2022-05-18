import * as yup from 'yup'

const realtorCreateValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required('name is required'),
        email: yup.string().required('email is required'),
        password: yup
          .string()
          .required('password is required'),
        phone_number: yup.string().required('phone number is required'),
      }),
    },
  },
}

export default realtorCreateValidator