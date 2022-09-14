import * as yup from "yup";

const editUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .min(3, "Password is of length less than 3")
    .max(20)
    .required("Password is required"),
  oldPassword: yup
    .string()
    .notOneOf([yup.ref("password")], "New password cannot be same as old password"),
});

export default editUserSchema;
