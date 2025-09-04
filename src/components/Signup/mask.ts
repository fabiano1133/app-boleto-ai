export const normalizeCpfCnpj = (value: string | undefined) => {
  if (!value) return "";

  // Remove tudo que não for número
  let numbers = value.replace(/\D/g, "");

  if (numbers.length <= 11) {
    // Limita CPF a 11 dígitos
    numbers = numbers.slice(0, 11);
    // Formata como CPF: 000.000.000-00
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // Limita CNPJ a 14 dígitos
    numbers = numbers.slice(0, 14);
    // Formata como CNPJ: 00.000.000/0000-00
    return numbers
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
};

export const normalizeCepNumber = (value: string | undefined) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};

export const normalizeMobilePhone = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};
