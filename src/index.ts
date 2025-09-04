import { EmpresaService } from './services/empresa';
import { ContaService } from './services/conta';
import { NFeService } from './services/nfe';
import { NFSeService } from './services/nfse';
import { NFCeService } from './services/nfce';
import { CTeService } from './services/cte';
import { MDFeService } from './services/mdfe';
import { DCeService } from './services/dce';
import { HttpClient } from './core/httpClient';
import { CTeOsService } from './services/cte-os';
import { NFComService } from './services/nfcom';
import { Authenticator } from './core/authenticator';
import { SdkConfig } from './types/common';

class NuvemFiscalApi {
  public authenticator: Authenticator;
  public empresa: EmpresaService;
  public conta: ContaService;
  public nfe: NFeService;
  public nfse: NFSeService;
  public nfce: NFCeService;
  public cte: CTeService;
  public mdfe: MDFeService;
  public cteOs: CTeOsService;
  public dce: DCeService;
  public nfCom: NFComService;

  private httpClient: HttpClient;

  constructor(config: SdkConfig) {
    // 1. Cria o gerenciador de autenticação
    this.authenticator = new Authenticator(config);

    // 2. Cria o cliente HTTP
    this.httpClient = new HttpClient(this.authenticator, config);

    // 3. Inicializa os serviços
    this.empresa = new EmpresaService(this.httpClient);
    this.conta = new ContaService(this.httpClient);
    this.nfe = new NFeService(this.httpClient);
    this.nfse = new NFSeService(this.httpClient);
    this.nfce = new NFCeService(this.httpClient);
    this.cte = new CTeService(this.httpClient);
    this.mdfe = new MDFeService(this.httpClient);
    this.cteOs = new CTeOsService(this.httpClient);
    this.dce = new DCeService(this.httpClient);
    this.nfCom = new NFComService(this.httpClient);
  }
}

export { NuvemFiscalApi };