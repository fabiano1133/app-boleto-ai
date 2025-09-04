import * as yup from "yup";

const getTodayWithoutTime = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const createTicketSchema = yup.object({
  title: yup.string().required("Título é obrigatório."),
  beneficiarysName: yup.string().required("Beneficiário é obrigatório."),
  expirationDate: yup
    .date()
    .required("Data de vencimento é obrigatória.")
    .min(
      getTodayWithoutTime(),
      "A data de vencimento não pode ser anterior a hoje"
    ),
  value: yup
    .number()
    .typeError("Valor é obrigatório.")
    .moreThan(0, "Valor deve ser maior que zero.")
    .required("Valor é obrigatório."),
  description: yup.string().required("Descrição é obrigatória."),
  category: yup.string().required("Categoria é obrigatória."),
  digitableLine: yup.string().required("Linha digitável é obrigatória."),
  issueAt: yup
    .date()
    .typeError("Data de emissão é obrigatória.")
    .required("Data de emissão é obrigatória."),
  notes: yup.string().required("Observações são obrigatórias."),
});

export type CreateTicketFormData = yup.InferType<typeof createTicketSchema>;

export const editTicketYupSchema = yup.object({
  title: yup.string().required("Título é obrigatório."),
  expirationDate: yup
    .date()
    .required("Data de vencimento é obrigatória.")
    .min(
      getTodayWithoutTime(),
      "A data de vencimento não pode ser anterior a hoje"
    ),
  value: yup
    .number()
    .typeError("Valor é obrigatório.")
    .moreThan(0, "Valor deve ser maior que zero.")
    .required("Valor é obrigatório."),
  status: yup.string().required(),
});

export type EditTicketFormData = yup.InferType<typeof editTicketYupSchema>;
