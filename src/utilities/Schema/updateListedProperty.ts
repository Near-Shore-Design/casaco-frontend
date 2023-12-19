import * as yup from "yup";
export const listingUpdateFormSchema = yup.object().shape({
  address: yup.string().required("Enter Valid location"),
  propertyDetails: yup.string().required("Add property description"),
  interiorSize: yup
    .number()
    .required("Required")
    .min(10, "Minimum size is 10")
    .typeError(""),
});
