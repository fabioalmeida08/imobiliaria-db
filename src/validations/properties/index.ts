import * as yup from "yup";

const propertyValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        street: yup.string().required("street is required"),
        city: yup.string().required("city is required"),
        state: yup.string().required("state is required"),
        postal_code: yup.string().required("postal_code is required"),
        country: yup.string().required("country is required"),
        area: yup.number().required("area is required"),
        complement: yup.string().required("complement is required"),
        type: yup.string().required("type is required"),
        acquisition_type: yup.string().required("acquisition_type is required"),
        price: yup.number().required("price is required"),
        description: yup.string().required("description is required"),
        id_client: yup.string().required("id_client is required"),
        id_realtor: yup.string().required("id_realtor is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default propertyValidator;
