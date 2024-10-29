import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  phone_number: Yup.string().matches(
    /^\(\d{2}\) \d{5}-\d{4}$/,
    "Número de telefone inválido"
  ),
  city: Yup.string(),
  state: Yup.string(),
  street: Yup.string(),
  number: Yup.string(),
  neighborhood: Yup.string(),
  postal_code: Yup.string().matches(
    /^\d{5}-\d{3}$/,
    "Número de código postal inválido"
  ),
});

export { contactSchema };
