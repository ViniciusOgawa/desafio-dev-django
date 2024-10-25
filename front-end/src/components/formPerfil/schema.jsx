import * as yup from "yup";

export const perfilSchema = yup.object().shape({
  username: yup.string(),
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email("O email digitado é inválido"),
  date_of_birth: yup
    .string()
    .matches(
      /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Data deve estar no formato DD/MM/AAAA"
    ),
  password: yup.string(),
});
