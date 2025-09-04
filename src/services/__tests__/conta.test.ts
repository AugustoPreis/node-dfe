import { HttpClient } from '../../core/httpClient';
import { ContaService } from '../conta';
import { ContaCota, ContaCotaListagem } from '../../types/conta';

jest.mock('../../core/httpClient', () => {
  return {
    HttpClient: jest.fn().mockImplementation(() => {
      return {
        get: jest.fn(),
      };
    }),
  };
});

describe('ContaService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let contaService: ContaService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    contaService = new ContaService(httpClient);
  });

  describe('listarCotas', () => {
    it('deve chamar httpClient.get com a URL correta e retornar os dados', async () => {
      // 2. Prepara os dados de retorno do mock
      const mockCotas: ContaCotaListagem = {
        '@count': 2,
        data: [
          { nome: 'nfe', consumo: 50, limite: 100 },
          { nome: 'nfce', consumo: 20, limite: 100 },
        ],
      };

      httpClient.get.mockResolvedValue(mockCotas);

      const result = await contaService.listarCotas();

      expect(httpClient.get).toHaveBeenCalledTimes(1);
      expect(httpClient.get).toHaveBeenCalledWith('/conta/cotas');
      expect(result).toEqual(mockCotas);
    });
  });

  describe('consultarCota', () => {
    it('deve chamar httpClient.get com a URL e o parâmetro corretos', async () => {
      const nomeCota = 'nfe';
      const mockCota: ContaCota = {
        nome: 'nfe',
        consumo: 50,
        limite: 100,
      };

      httpClient.get.mockResolvedValue(mockCota);

      const result = await contaService.consultarCota(nomeCota);

      expect(httpClient.get).toHaveBeenCalledTimes(1);
      expect(httpClient.get).toHaveBeenCalledWith(`/conta/cotas/${nomeCota}`);
      expect(result).toEqual(mockCota);
    });
  });
});