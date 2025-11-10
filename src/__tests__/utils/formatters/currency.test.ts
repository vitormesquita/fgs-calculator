import { 
  reaisToCents,
  centsToReais,
  stringToCents,
} from "@/utils/formatters/currency";

describe('currency', () => {
  describe('convertendo reais para centavos', () => {
    it('Quando o valor for de R$100,00 deve retornar 10000', () => {
      const result = reaisToCents(100);
      expect(result).toBe(10000);
    });
  });

  describe('convertendo centavos para reais', () => {
    it('Quando o valor for de 10000 deve retornar R$100,00', () => {
      const result = centsToReais(10000);
      expect(result).toBe(100);
    });
  });

  describe('convertendo string para centavos', () => {
    it('Quando o valor for de "100,00" deve retornar 10000', () => {
      const result = stringToCents('100,00');
      expect(result).toBe(10000);
    });
  });
});