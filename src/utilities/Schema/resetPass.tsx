import * as yup from "yup";
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      "Should contain, at least 8 characters incuding a capital letter, a number and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
