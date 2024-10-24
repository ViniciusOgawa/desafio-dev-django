import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("O nome é obrigatório"),
  first_name: yup.string().required("O primeiro nome é obrigatório"),
  last_name: yup.string().required("O segundo nome é obrigatório"),
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("O email digitado é inválido"),
  date_of_birth: yup
    .string()
    .required("A data é obrigatória")
    .matches(
      /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Data deve estar no formato DD/MM/AAAA"
    )
    .required("Data de Aniversário é obrigatória"),
  password: yup.string().required("A senha é obrigatória"),
});
