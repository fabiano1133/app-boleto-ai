import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required("Campo Obrigatório"),
  email: yup
    .string()
    .required("Campo Obrigatório")
    .email("Digite um e-mail com formato válido"),
  cpfCnpj: yup.string().required("Campo Obrigatório"),
  mobilePhone: yup.string().required("Campo Obrigatório"),
  password: yup.string().required("Campo Obrigatório"),
  address: yup.string().required("Campo Obrigatório"),
  addressNumber: yup.string().required("Campo Obrigatório"),
  province: yup.string().required("Campo Obrigatório"),
  postalCode: yup.string().required("Campo Obrigatório"),
  city: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"),
  complement: yup.string().required("Campo Obrigatório"),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;
