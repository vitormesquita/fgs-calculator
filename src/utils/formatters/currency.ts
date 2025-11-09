export function stringToCents(value: string) {
  const numbers = value.replace(/\D/g, "") || "0";

  if (!numbers) return 0;

  const padded = numbers.padStart(3, "0");
  const reais = padded.slice(0, -2);
  const cents = padded.slice(-2);     
  return Number(reais) * 100 + Number(cents);
}

export function formatCurrencyInput(value: string) {
  const numbers = value.replace(/\D/g, "") || "0";
  const cents = stringToCents(numbers) ;
  return formatCurrency(cents / 100).replace('R$', '');
}

export function formatCurrency(value: number) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formattedValue;
}