import * as yup from "yup";

const editUserSchema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  password: yup
    .string()
    .min(3, "Password is of length less than 3")
    .max(20, "Password too long")
    .required("Password is required")
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Both password must be same"),
  oldPassword: yup
    .string()
    .notOneOf(
      [yup.ref("password")],
      "New password cannot be same as old password"
    ),
});

export default editUserSchema;
