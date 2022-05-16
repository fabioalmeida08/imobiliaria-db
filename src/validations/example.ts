import * as yup from 'yup'

const userValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({

        name: yup.string().required('name is required'),
        email: yup.string().required('email is required'),
        password: yup
          .string()
          .required('password is required'),
        age: yup.number().required('age is required'),

      }),
    },
  },
}

export default userValidator