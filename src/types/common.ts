export type Ambiente = 'producao' | 'homologacao';
export type Provedor = 'padrao' | 'nacional';

export interface SdkConfig {
  environment: Ambiente;
  timeout?: number; //Timeout para as solicitações HTTP

  //Dados de autenticação (gerar no portal da Nuvem Fiscal)
  clientId: string;
  clientSecret: string;
  scope: string;
}

export interface ErrorDetailsResult {
  message: string;
  code?: string;
  errors: string[];
}