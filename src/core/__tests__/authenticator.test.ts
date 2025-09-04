import axios, { AxiosError } from 'axios';
import { Authenticator } from '../authenticator';
import { handleApiError } from '../../utils/errorHandler';
import { SdkConfig } from '../../types/common';

jest.mock('axios');
jest.mock('../../utils/errorHandler');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHandleApiError = handleApiError as jest.Mock;

describe('Authenticator', () => {
  let config: SdkConfig;

  beforeEach(() => {
    jest.clearAllMocks();

    config = {
      clientId: 'client-id-teste',
      clientSecret: 'client-secret-teste',
      environment: 'homologacao',
      scope: 'empresa',
      timeout: 10000,
    };
  });

  describe('Constructor', () => {
    it('deve inicializar corretamente com configurações válidas', () => {
      const authenticator = new Authenticator(config);

      expect(authenticator).toBeInstanceOf(Authenticator);
    });

    it('deve lançar um erro se o clientId não for fornecido', () => {
      expect(() => new Authenticator({ ...config, clientId: '' })).toThrow(
        '"Client Id" e/ou "Client Secret" não fornecidos.'
      );
    });

    it('deve lançar um erro se o clientSecret não for fornecido', () => {
      expect(() => new Authenticator({ ...config, clientSecret: '   ' })).toThrow(
        '"Client Id" e/ou "Client Secret" não fornecidos.'
      );
    });

    it('deve usar a URL de token de homologação quando o ambiente for "homologacao"', async () => {
      const authenticator = new Authenticator({ ...config, environment: 'homologacao' });

      expect(authenticator['tokenUrl']).toBe('https://auth.nuvemfiscal.com.br/oauth/token');
    });

    it('deve usar a URL de token de produção quando o ambiente for "producao"', async () => {
      const authenticator = new Authenticator({ ...config, environment: 'producao' });

      expect(authenticator['tokenUrl']).toBe('https://auth.nuvemfiscal.com.br/oauth/token');
    });
  });

  describe('getToken', () => {
    it('deve buscar um novo token se nenhum existir', async () => {
      const authenticator = new Authenticator(config);

      mockedAxios.post.mockResolvedValue({
        data: {
          access_token: 'novo-token',
          expires_in: 3600, // 1 hora
          token_type: 'Bearer',
        },
      });

      const token = await authenticator.getToken();

      expect(token).toBe('novo-token');
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://auth.nuvemfiscal.com.br/oauth/token',
        expect.any(URLSearchParams), // Verifica se o corpo é URLSearchParams
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      expect(authenticator.expirationTime).toBeGreaterThan(Date.now());
    });

    it('NÃO deve buscar um novo token se um token válido já existir', async () => {
      const authenticator = new Authenticator(config);

      authenticator.accessToken = 'token-valido-existente';
      authenticator.expirationTime = Date.now() + 120000; // Expira em 2 minutos

      const token = await authenticator.getToken();

      expect(token).toBe('token-valido-existente');
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('deve buscar um novo token se o token existente estiver expirado', async () => {
      const authenticator = new Authenticator(config);

      authenticator.accessToken = 'token-expirado';
      authenticator.expirationTime = Date.now() - 1000; // 1 segundo atrás

      mockedAxios.post.mockResolvedValue({
        data: {
          access_token: 'token-renovado',
          expires_in: 3600,
          token_type: 'Bearer',
        },
      });

      const token = await authenticator.getToken();

      expect(token).toBe('token-renovado');
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um erro processado se a chamada para buscar o token falhar', async () => {
      const authenticator = new Authenticator(config);
      const apiError = new Error('Erro de API') as AxiosError;
      const processedError = new Error('Erro processado pela nossa função');

      mockedAxios.post.mockRejectedValue(apiError);
      mockedHandleApiError.mockReturnValue(processedError);

      await expect(authenticator.getToken()).rejects.toThrow(processedError);
      expect(mockedHandleApiError).toHaveBeenCalledWith(apiError);
    });
  });
});