import { HttpClient } from '../core/httpClient';
import { CteOsPedidoCancelamento, CteOsPedidoEmissao } from '../types/cte-os';
import { Dfe, DfeCancelamento, DfeListagem, DfeListagemQuery } from '../types/dfe';

const BASE = '/cteos';

export class CTeOsService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: DfeListagemQuery): Promise<DfeListagem> {
    return await this.httpClient.get<DfeListagem>(BASE, { params });
  }

  async consultar(id: string): Promise<Dfe> {
    return await this.httpClient.get<Dfe>(`${BASE}/${id}`);
  }

  async emitir(dados: CteOsPedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}/emitir`, dados);
  }

  async cancelar(dados: CteOsPedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/cancelamento`, dados);
  }

  async baixarPDF(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXML(id: string, processada = true): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml${processada ? '' : '/conhecimento'}`, {
      responseType: 'arraybuffer',
    });
  }
}