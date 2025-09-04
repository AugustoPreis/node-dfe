import axios from 'axios';
import { HttpClient } from '../httpClient';
import { Authenticator } from '../authenticator';
import { handleApiError } from '../../utils/errorHandler';
import { SdkConfig } from '../../types/common';

jest.mock('axios');
jest.mock('../authenticator');
jest.mock('../../utils/errorHandler');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const MockedAuthenticator = Authenticator as jest.MockedClass<typeof Authenticator>;
const mockedHandleApiError = handleApiError as jest.Mock;

describe('HttpClient', () => {
  let authenticator: jest.MockedObject<Authenticator>;
  let config: SdkConfig;

  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

    config = {
      clientId: 'client-id-teste',
      clientSecret: 'client-secret-teste',
      environment: 'homologacao',
      scope: 'empresa',
      timeout: 10000,
    };

    authenticator = new MockedAuthenticator(config) as jest.MockedObject<Authenticator>;
  });

  describe('Inicialização', () => {
    it('deve criar uma instância do axios com a baseURL de homologação por padrão', () => {
      new HttpClient(authenticator, { ...config, environment: 'homologacao' });

      expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
        baseURL: 'https://api.sandbox.nuvemfiscal.com.br',
      }));
    });

    it('deve criar uma instância do axios com a baseURL de produção', () => {
      new HttpClient(authenticator, { ...config, environment: 'producao' });

      expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
        baseURL: 'https://api.nuvemfiscal.com.br',
      }));
    });

    it('deve usar o timeout padrão de 60 segundos se nenhum for fornecido', () => {
      const configWithoutTimeout: SdkConfig = { ...config, timeout: undefined };

      new HttpClient(authenticator, configWithoutTimeout);

      expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
        timeout: 60000,
      }));
    });
  });

  describe('Interceptador de Requisição (Request Interceptor)', () => {
    it('deve adicionar o token de autorização em requisições', async () => {
      const fakeToken = 'meu-token-secreto-123';
      authenticator.getToken.mockResolvedValue(fakeToken);

      new HttpClient(authenticator, config);

      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const initialConfig = { headers: {}, url: '/recurso-protegido' };

      const finalConfig = await requestInterceptor(initialConfig);

      expect(authenticator.getToken).toHaveBeenCalledTimes(1);
      expect(finalConfig.headers.Authorization).toBe(`Bearer ${fakeToken}`);
    });

    it('NÃO deve adicionar o token de autorização na rota /auth/token', async () => {
      new HttpClient(authenticator, config);

      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const initialConfig = { headers: {}, url: '/v1/auth/token' };

      const finalConfig = await requestInterceptor(initialConfig);

      expect(authenticator.getToken).not.toHaveBeenCalled();
      expect(finalConfig.headers.Authorization).toBeUndefined();
    });
  });

  describe('Interceptador de Resposta (Response Interceptor)', () => {
    it('deve retornar apenas "response.data" em caso de sucesso', () => {
      new HttpClient(authenticator, config);

      const responseInterceptorSuccess = mockAxiosInstance.interceptors.response.use.mock.calls[0][0];
      const mockResponse = { data: { id: '123', status: 'aprovado' } };

      const result = responseInterceptorSuccess(mockResponse);

      expect(result).toEqual(mockResponse.data);
    });

    it('deve chamar handleApiError em caso de erro', async () => {
      new HttpClient(authenticator, config); // Instancia o cliente
      const responseInterceptorError = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      const mockError = new Error('Erro de rede');
      const processedError = new Error('Erro processado');

      mockedHandleApiError.mockReturnValue(processedError);

      await expect(responseInterceptorError(mockError)).rejects.toThrow(processedError);

      expect(mockedHandleApiError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('Métodos HTTP', () => {
    // Não precisamos mais de um beforeEach aqui.

    it('deve chamar client.get com os parâmetros corretos', async () => {
      const httpClient = new HttpClient(authenticator, config);

      await httpClient.get('/test-get', { params: { a: 1 } });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test-get', { params: { a: 1 } });
    });

    it('deve chamar client.post com os parâmetros corretos', async () => {
      const httpClient = new HttpClient(authenticator, config);
      const postData = { name: 'Teste' };

      await httpClient.post('/test-post', postData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test-post', postData, undefined);
    });

    it('deve chamar client.put com os parâmetros corretos', async () => {
      const httpClient = new HttpClient(authenticator, config);
      const putData = { name: 'Atualizado' };

      await httpClient.put('/test-put/1', putData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test-put/1', putData, undefined);
    });

    it('deve chamar client.delete com os parâmetros corretos', async () => {
      const httpClient = new HttpClient(authenticator, config);

      await httpClient.delete('/test-delete/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test-delete/1', undefined);
    });
  });
});
