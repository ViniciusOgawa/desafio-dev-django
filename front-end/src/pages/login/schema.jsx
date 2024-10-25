import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("O nome é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});
