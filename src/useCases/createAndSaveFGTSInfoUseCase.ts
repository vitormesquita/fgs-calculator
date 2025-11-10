import { FGTSInfo, Month } from "../models";
import { saveFGTSInfo } from "../storage/fgtsStorage";

export async function createAndSaveFGTSInfoUseCase(
  name?: string,
  phone?: string,
  balanceInCents?: number,
  birthdayMonth?: Month
) {
  
  const errors = [];

  if (name === undefined || name.trim() === '') {
    errors.push('Nome é obrigatório');
  }

  if (phone === undefined || phone.trim() === '') {
    errors.push('Telefone é obrigatório');
  }

  if (balanceInCents === undefined || balanceInCents <= 0) {
    errors.push('Saldo é obrigatório');
  }

  if (birthdayMonth === undefined || birthdayMonth.name.trim() === '') {
    errors.push('Mês de aniversário é obrigatório');
  }

  if (errors.length > 0) {
    return {
      success: false,
      fgtsInfo: null,
      errors,
    }
  }

  const info: FGTSInfo = {
    name: name || '',
    phone: phone || '',
    balanceInCents: balanceInCents || 0,
    birthdayMonth: birthdayMonth || {} as Month,
  }

  try {
  await saveFGTSInfo(info);

    return {
      success: true,
      fgtsInfo: info,
      errors: [],
    }
  } catch (error) {
    return {
      success: false,
      fgtsInfo: null,
      errors: ['Erro ao salvar informações'],
    }
  }
}