import { NFeService } from './services/nfe';
import { NFSeService } from './services/nfse';
import { HttpClient } from './core/httpClient';
import { Authenticator } from './core/authenticator';
import { SdkConfig } from './types/common';

class NuvemFiscalApi {
  public authenticator: Authenticator;
  public nfe: NFeService;
  public nfse: NFSeService;

  private httpClient: HttpClient;

  constructor(config: SdkConfig) {
    // 1. Cria o gerenciador de autenticação
    this.authenticator = new Authenticator(config);

    // 2. Cria o cliente HTTP
    this.httpClient = new HttpClient(this.authenticator, config);

    // 3. Inicializa os serviços
    this.nfe = new NFeService(this.httpClient);
    this.nfse = new NFSeService(this.httpClient);
  }
}

export { NuvemFiscalApi };