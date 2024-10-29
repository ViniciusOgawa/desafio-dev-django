import * as yup from "yup";

const educationSchema = yup.object().shape({
  institution: yup
    .string()
    .min(2, "Instituição deve ter no mínimo 2 caracteres"),
  course: yup.string().min(2, "Curso deve ter no mínimo 2 caracteres"),
  ongoing: yup.boolean(),
  period: yup
    .number()
    .typeError("Período deve ser um número")
    .positive("Período deve ser um número positivo")
    .integer("Período deve ser um número inteiro"),
});

export { educationSchema };
