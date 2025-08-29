import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { SdkConfig } from '../types/common';
import { handleApiError } from '../utils/errorHandler';
import { Authenticator } from './authenticator';

const BASE_URLS = {
  producao: 'https://api.nuvemfiscal.com.br',
  homologacao: 'https://api.sandbox.nuvemfiscal.com.br',
};

export class HttpClient {
  private config: SdkConfig;
  private client: AxiosInstance;
  private authenticator: Authenticator;

  constructor(authenticator: Authenticator, config: SdkConfig) {
    this.authenticator = authenticator;
    this.config = config;

    const baseURL = BASE_URLS[this.config.environment || 'homologacao'];

    this.client = axios.create({
      baseURL,
      timeout: this.config.timeout || 60000, // 60 segundos por padrão
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Adiciona função para buscar o acess token
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Não precisamos de autenticação para buscar o próprio token
        if (config.url?.endsWith('auth/token')) {
          return config;
        }

        // Pede um token válido para o authenticator
        const token = await this.authenticator.getToken();

        // Adiciona o token ao cabeçalho da requisição atual
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Adiciona manipulador de erros
    this.client.interceptors.response.use(
      response => response.data,
      (error: AxiosError) => Promise.reject(handleApiError(error)),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    return this.client.get<T>(url, config) as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    return this.client.post<T>(url, data, config) as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    return this.client.put<T>(url, data, config) as T;
  }
}