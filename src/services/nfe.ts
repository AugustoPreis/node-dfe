import { HttpClient } from '../core/httpClient';
import { NfePedidoCancelamento, NfePedidoEmissao, NfePedidoEmissaoLote } from '../types/nfe';
import {
  Dfe,
  DfeListagemLotesQuery,
  DfeListagemQuery,
  DfeCancelamento,
  DfeInutilizacao,
  DfeListagem,
  DfeLote,
  DfeLoteListagem,
  DfePedidoInutilizacao
} from '../types/dfe';

const BASE = '/nfe';

export class NFeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: DfeListagemQuery): Promise<DfeListagem> {
    return await this.httpClient.get<DfeListagem>(BASE, {
      params: {
        $top: params.$top,
        $skip: params.$skip,
        $inlinecount: params.$inlinecount,
        cpf_cnpj: params.cpf_cnpj,
        referencia: params.referencia,
        ambiente: params.ambiente,
        chave: params.chave,
        serie: params.serie,
      },
    });
  }

  async listarLotes(params: DfeListagemLotesQuery): Promise<DfeLoteListagem> {
    return await this.httpClient.get<DfeLoteListagem>(`${BASE}/lotes`, {
      params: {
        $top: params.$top,
        $skip: params.$skip,
        $inlinecount: params.$inlinecount,
        cpf_cnpj: params.cpf_cnpj,
        referencia: params.referencia,
        ambiente: params.ambiente,
      },
    });
  }

  async consultar(id: string): Promise<Dfe> {
    return await this.httpClient.get<Dfe>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<DfeLote> {
    return await this.httpClient.get<DfeLote>(`${BASE}/lotes/${id}`);
  }

  async emitir(dados: NfePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}`, dados);
  }

  async emitirLote(dados: NfePedidoEmissaoLote): Promise<DfeLote> {
    return await this.httpClient.post<DfeLote>(`${BASE}/lotes`, dados)
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