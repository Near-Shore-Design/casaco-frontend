import * as yup from "yup";
export const changePassSchema = yup.object().shape({
  new_password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      "Should contain, at least 8 characters incuding a capital letter, a number and special character"
    ),
  old_password: yup.string().required("Password is required"),
});
