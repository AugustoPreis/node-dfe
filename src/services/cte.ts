import { HttpClient } from '../core/httpClient';
import { CtePedidoCancelamento, CtePedidoEmissao, CteSimpPedidoEmissao } from '../types/cte';
import { Dfe, DfeCancelamento, DfeListagem, DfeListagemQuery } from '../types/dfe';

const BASE = '/cte';

export class CTeService {
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

  async emitir(dados: CtePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}/emitir`, dados);
  }

  async emitirSimplificado(dados: CteSimpPedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}/emitir`, dados);
  }

  async cancelar(id: string, dados: CtePedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/${id}/cancelamento`, {
      justificativa: dados.justificativa,
    });
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