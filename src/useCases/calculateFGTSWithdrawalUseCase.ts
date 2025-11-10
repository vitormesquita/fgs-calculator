import { reaisToCents } from "@/utils/formatters/currency";

export function calculateFGTSWithdrawalUseCase(balanceInCents: number) {

  function pct(percentage: number) {
    return Math.floor((balanceInCents * percentage) / 100);
  }
  
  if (balanceInCents <= reaisToCents(500)) {
    // 50% do saldo até R$500,00
    return pct(50); 
  }

  if (balanceInCents <= reaisToCents(1000)) {
    // 40% do saldo entre R$500,01 e R$1000,00 + R$50,00
    return pct(40) + reaisToCents(50); 
  }

  if (balanceInCents <= reaisToCents(5000)) {
    // 30% do saldo entre R$1000,01 e R$5000,00 + R$150,00
    return pct(30) + reaisToCents(150);
  }

  if (balanceInCents <= reaisToCents(10000)) {
    // 20% do saldo entre R$5000,01 e R$10000,00 + R$650,00
    return pct(20) + reaisToCents(650);
  }

  if (balanceInCents <= reaisToCents(15000)) {
    // 15% do saldo entre R$10000,01 e R$15000,00 + R$1150,00
    return pct(15) + reaisToCents(1150);
  }

  if (balanceInCents <= reaisToCents(20000)) {
    // 10% do saldo entre R$15000,01 e R$20000,00 + R$1900,00
    return pct(10) + reaisToCents(1900);
  }
  
  // 5% do saldo acima de R$20000,00 + R$2900,00
  return pct(5) + reaisToCents(2900);
}