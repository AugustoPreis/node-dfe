import { HttpClient } from '../core/httpClient';
import { Dfe, DfeCancelamento, DfeListagem, DfeListagemLotesQuery, DfeListagemQuery, DfeLote, DfeLoteListagem } from '../types/dfe';
import { MdfeEncerramento, MdfePedidoCancelamento, MdfePedidoEmissao, MdfePedidoEmissaoLote, MdfePedidoEncerramento } from '../types/mdfe';

const BASE = '/mdfe';

export class MDFeService {
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

  async emitir(dados: MdfePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}/emissao`, dados);
  }

  async emitirLote(dados: MdfePedidoEmissaoLote): Promise<DfeLote> {
    return await this.httpClient.post<DfeLote>(`${BASE}/lotes`, dados);
  }

  async encerrar(id: string, dados: MdfePedidoEncerramento): Promise<MdfeEncerramento> {
    return await this.httpClient.post(`${BASE}/${id}/encerramento`, dados);
  }

  async cancelar(id: string, dados: MdfePedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/${id}/cancelamento`, {
      justificativa: dados.justificativa,
    });
  }

  async baixarXML(id: string, processada = true): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml${processada ? '' : '/manifesto'}`, {
      responseType: 'arraybuffer',
    });
  }
}