import * as yup from "yup";
export const listingUpdateFormSchema = yup.object().shape({
  title: yup.string().required("Add property title"),
  address: yup.string().required("Enter Valid location"),
  description: yup.string().required("Add property description"),
  price: yup
    .number()
    .required("Add property price ")
    .typeError("")
    .max(50000000000, "Maximum property amount"),
  interior: yup
    .number()
    .required("Required")
    .min(10, "Minimum size is 10")
    .typeError("")
    .max(2000, "Maximum size is 2000"),
});
