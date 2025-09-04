import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("Digite um e-mail com formato válido"),
  password: yup.string().required("Campo obrigatório"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
