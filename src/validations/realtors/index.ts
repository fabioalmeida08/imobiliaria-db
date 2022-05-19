import * as yup from 'yup'

export const realtorCreateValidator = {
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
export const realtorLoginValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        email: yup.string().required('email is required'),
        password: yup
          .string()
          .required('password is required'),
      }),
    },
  },
}