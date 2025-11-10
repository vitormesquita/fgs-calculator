export function validateName(value: string | undefined): string | true {
  const splitName = (value ?? '').split(' ').filter(name => name.trim() !== '');
  if (splitName.length === 1) {
    return 'Digite seu nome completo';
  }
  return true;
}

export function validatePhone(value: string | undefined): string | true {
  if (value && value.length !== 11) {
    return 'Digite um telefone válido';
  }
  return true;
}

export function validateBalance(value: number | undefined): string | true {
  if (value === undefined || value <= 0) {
    return 'Saldo deve ser maior que 0';
  }
  return true;
}