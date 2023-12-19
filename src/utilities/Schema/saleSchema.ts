import * as yup from "yup";
export const saleSchema = yup.object().shape({
  address: yup.string().required("Enter Valid location"),
  description: yup.string().required("Add property description"),
  // price: yup
  //   .number()
  //   .required("Add property price")
  //   .typeError("")
  //   .max(
  //     50000000000,
  //     "Maximum property amount can be 50.000.000.000 Colombian pesos"
  //   )
  //   .transform((value) => {
  //     // const formattedValue = originalValue.toLocaleString("es-CO");
  //     // return formattedValue;
  //     return value;
  //   }),
  interior: yup
    .number()
    .required("Required")
    .min(10, "Minimum size is 10")
    .typeError(""),
  // .max(2000, "Maximum size is 2000"),
});
