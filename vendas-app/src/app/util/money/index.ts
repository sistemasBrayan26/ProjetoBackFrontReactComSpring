export const converterEmBigDecimal = (value: any): number => {
  if (!value) return 0;

  // Se já for um número, apenas retorna
  if (typeof value === "number") return value;

  // Se for string, remove o ponto de milhar e troca a vírgula por ponto decimal
  const valorLimpo = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(valorLimpo) || 0;
};

export const formatReal = (valor: any): string => {
  if (valor === null || valor === undefined || valor === "") return "0,00";

  // Se já for um número (ex: 80.00 vindo do banco), formatamos direto
  if (typeof valor === "number") {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  // Se for string (ex: "80,00" ou "8000" do input)
  try {
    const stringValue = valor.toString().replace(/\D/g, "");
    const decimalValue = parseFloat(stringValue) / 100;

    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(decimalValue || 0);
  } catch (e) {
    return "0,00";
  }
};
