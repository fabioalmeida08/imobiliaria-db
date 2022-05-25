import * as yup from "yup";

const salesValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        selling_value: yup.number().required("selling value is required"),
        down_payment: yup.number().required("down payment is required"),
        description: yup.string().required("description is required"),
        client_buyer: yup.string().required("client is required"),
        property: yup.string().required("properties is required"),
      }),
      /* validateOptions: {
        abortEarly: false,
      }, */
    },
  },
};

export default salesValidator;