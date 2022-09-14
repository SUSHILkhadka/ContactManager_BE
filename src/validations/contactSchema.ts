import * as yup from "yup";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid"),
  favourite: yup.boolean(),
});

export default contactSchema;
