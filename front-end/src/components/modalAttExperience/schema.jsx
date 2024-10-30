import * as yup from "yup";

const experienceSchema = yup.object().shape({
  role: yup.string().min(2, "O cargo deve ter pelo menos 2 caracteres"),
  company: yup
    .string()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres"),
  period: yup
    .string()
    .matches(
      /^[A-Za-z]{3} \d{4} - (Presente|\w{3} \d{4})$/,
      'O período deve estar no formato: "Jan 2020 - Presente" ou "Jan 2020 - Dez 2021"'
    ),
  description: yup
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

export { experienceSchema };
