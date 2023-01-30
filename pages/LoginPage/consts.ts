/* eslint-disable import/prefer-default-export */
import i18n from "src/i18n";
import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().required(i18n.t("validation.required") as string),
  password: yup.string().required(i18n.t("validation.required") as string),
});
