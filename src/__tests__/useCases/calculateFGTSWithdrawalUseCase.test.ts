import { reaisToCents } from "@/utils/formatters/currency";
import { calculateFGTSWithdrawalUseCase } from "@/useCases/calculateFGTSWithdrawalUseCase";

describe('calculateFGTSWithdrawal', () => { 

  describe('Quando possuir o saldo até R$500,00', () => {
    it('Quando o saldo for de R$400,00 deve retornar 200', () => {
      const balanceInCents = reaisToCents(400);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(200));
    })

    it('Quando possuir saldo de 500 deve retornar 250', () => {
      const balanceInCents = reaisToCents(500);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(250));
    });    
  });  

  describe('Quando possuir o saldo entre R$500,10 e R$1000,00', () => {
    it('Quando o saldo for de R$500,10 deve retornar R$250,04', () => {
      const balanceInCents = reaisToCents(500.10);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(250.04));
    });

    it('Quando o saldo for de R$1000,00 deve retornar R$450,00', () => {
      const balanceInCents = reaisToCents(1000.00);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(450.00));
    });
  });

  describe('Quando possuir o saldo entre R$1000,01 e R$5000,01', () => {
    it('Quando o saldo for de R$4500,50 deve retornar R$1550,15', () => {
      const balanceInCents = reaisToCents(4500.50);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(1500.15));
    });
  });

  describe('Quando possuir o saldo entre R$5000,01 e R$10000,01', () => {
    it('Quando o saldo for de R$9000,00 deve retornar R$2700,00', () => {
      const balanceInCents = reaisToCents(9000.00);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(2450.00));
    });
  });

  describe('Quando possuir o saldo entre R$10000,01 e R$15000,01', () => {
    it('Quando o saldo for de R$14457,50 deve retornar R$2767,58', () => {
      const balanceInCents = reaisToCents(14457.50);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(3318.62));
    });
  });

  describe('Quando possuir o saldo entre R$15000,01 e R$20000,01', () => {
    it('Quando o saldo for de R$19000,00 deve retornar R$3800,00', () => {
      const balanceInCents = reaisToCents(19000.00);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(3800.00));
    });
  });

  describe('Quando possuir o saldo acima de R$20000,01', () => {
    it('Quando o saldo for de R$25581,00 deve retornar R$5345,15', () => {
      const balanceInCents = reaisToCents(25581.00);
      const withdrawal = calculateFGTSWithdrawalUseCase(balanceInCents);
      expect(withdrawal).toBe(reaisToCents(4179.05));
    });
  });
});