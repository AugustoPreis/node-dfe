import { NFeService } from './services/nfe';
import { NFSeService } from './services/nfse';
import { NFCeService } from './services/nfce';
import { CTeService } from './services/cte';
import { MDFeService } from './services/mdfe';
import { DCeService } from './services/dce';
import { HttpClient } from './core/httpClient';
import { CTeOsService } from './services/cte-os';
import { Authenticator } from './core/authenticator';
import { SdkConfig } from './types/common';

class NuvemFiscalApi {
  public authenticator: Authenticator;
  public nfe: NFeService;
  public nfse: NFSeService;
  public nfce: NFCeService;
  public cte: CTeService;
  public mdfe: MDFeService;
  public cteOs: CTeOsService;
  public dce: DCeService;

  private httpClient: HttpClient;

  constructor(config: SdkConfig) {
    // 1. Cria o gerenciador de autenticação
    this.authenticator = new Authenticator(config);

    // 2. Cria o cliente HTTP
    this.httpClient = new HttpClient(this.authenticator, config);

    // 3. Inicializa os serviços
    this.nfe = new NFeService(this.httpClient);
    this.nfse = new NFSeService(this.httpClient);
    this.nfce = new NFCeService(this.httpClient);
    this.cte = new CTeService(this.httpClient);
    this.mdfe = new MDFeService(this.httpClient);
    this.cteOs = new CTeOsService(this.httpClient);
    this.dce = new DCeService(this.httpClient);
  }
}

export { NuvemFiscalApi };