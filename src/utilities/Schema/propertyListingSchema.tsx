import * as yup from "yup";
export const propertyFormSchema = yup.object().shape({
  address: yup.string().required("Enter Valid location"),
  description: yup.string().required("Add property description"),
  interior: yup
    .number()
    .required("Required")
    .min(10, "Minimum size is 10")
    .typeError("")
    .max(2000, "Maximum size is 2000"),
});
