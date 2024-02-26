import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    minLength: Yup.number()
        .typeError("Minimum length must be a number")
        .min(0, "Minimum length cannot be negative"),
    maxLength: Yup.number()
        .typeError("Maximum length must be a number")
        .min(Yup.ref("minLength"), "Maximum length must be greater than or equal to the minimum length")
        .nullable()
});

export default validationSchema;
