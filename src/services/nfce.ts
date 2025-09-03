import { HttpClient } from '../core/httpClient';
import { Dfe, DfeCancelamento, DfeInutilizacao, DfeListagem, DfeLote, DfeLoteListagem, DfePedidoInutilizacao } from '../types/dfe';
import { DfeListagemLotesQuery, DfeListagemQuery } from '../types/dfe';
import { NfePedidoCancelamento, NfePedidoEmissao, NfePedidoEmissaoLote } from '../types/nfe';

const BASE = '/nfce';

export class NFCeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: DfeListagemQuery): Promise<DfeListagem> {
    return await this.httpClient.get<DfeListagem>(BASE, { params });
  }

  async listarLotes(params: DfeListagemLotesQuery): Promise<DfeLoteListagem> {
    return await this.httpClient.get<DfeLoteListagem>(`${BASE}/lotes`, { params });
  }

  async consultar(id: string): Promise<Dfe> {
    return await this.httpClient.get<Dfe>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<DfeLote> {
    return await this.httpClient.get<DfeLote>(`${BASE}/lotes/${id}`);
  }

  async emitir(dados: NfePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(BASE, dados);
  }

  async emitirLote(dados: NfePedidoEmissaoLote): Promise<DfeLote> {
    return await this.httpClient.post<DfeLote>(`${BASE}/lotes`, dados);
  }

  async cancelar(id: string, dados: NfePedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/${id}/cancelamento`, {
      justificativa: dados.justificativa,
    });
  }

  async inutilizarSequencia(dados: DfePedidoInutilizacao): Promise<DfeInutilizacao> {
    return await this.httpClient.post<DfeInutilizacao>(`${BASE}/inutilizacoes`, dados);
  }

  async baixarPDF(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXML(id: string, processada = true): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml${processada ? '' : '/nota'}`, {
      responseType: 'arraybuffer',
    });
  }
}