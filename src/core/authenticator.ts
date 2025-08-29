import axios, { AxiosError } from 'axios';
import { SdkConfig } from '../types/common';
import { TokenResponse } from '../types/authenticator';
import { isValidString } from '../utils/validators';
import { handleApiError } from '../utils/errorHandler';

//As URL's são iguais, mas isso pode mudar um dia
const TOKEN_URLS = {
  producao: 'https://auth.nuvemfiscal.com.br/oauth/token',
  homologacao: 'https://auth.nuvemfiscal.com.br/oauth/token',
};

export class Authenticator {
  private readonly config: SdkConfig;
  private readonly tokenUrl: string;

  //Permite definição manual do token, caso o usuário salve e resgate
  public accessToken: string | null = null;
  public expirationTime: number | null = null;

  constructor(config: SdkConfig) {
    this.config = config;
    this.tokenUrl = TOKEN_URLS[config.environment];

    if (!isValidString(this.config.clientId) || !isValidString(this.config.clientSecret)) {
      throw new Error('"Client Id" e/ou "Client Secret" não fornecidos.');
    }
  }

  private isTokenExpired(): boolean {
    // Retorna true se não houver token ou se o tempo de expiração já passou.
    // Adicionamos um buffer de 60 segundos para segurança.
    return !this.expirationTime || Date.now() >= this.expirationTime - 60000;
  }

  // A função NÃO retorna o token diretamente, apenas atualiza os valores internos.
  private async fetchToken(): Promise<void> {
    try {
      const params = new URLSearchParams();

      params.append('grant_type', 'client_credentials');
      params.append('client_id', this.config.clientId);
      params.append('client_secret', this.config.clientSecret);
      params.append('scope', this.config.scope);

      const response = await axios.post<TokenResponse>(this.tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, expires_in } = response.data;

      this.accessToken = access_token;
      this.expirationTime = Date.now() + (expires_in * 1000); // Timeout de expiração em milissegundos
    } catch (err) {
      throw handleApiError(err as AxiosError);
    }
  }

  public async getToken(): Promise<string> {
    if (this.isTokenExpired() || !isValidString(this.accessToken)) {
      await this.fetchToken();
    }

    return this.accessToken as string;
  }
}