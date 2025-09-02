import { HttpClient } from '../core/httpClient';
import {
  CancelamentoResposta,
  ConsultaCancelamentoResposta,
  ConsultaLoteResposta,
  ConsultaResposta,
  ListagemLotesResposta,
  ListagemResposta,
  ParametrosCancelamento,
  ParametrosEmissao,
  ParametrosEmissaoLote,
  ParametrosListagem,
  ParametrosListagemLotes
} from '../types/nfse';

const BASE = '/nfse';

export class NFSeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: ParametrosListagem): Promise<ListagemResposta> {
    return await this.httpClient.get<ListagemResposta>(BASE, {
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

  async listarLotes(params: ParametrosListagemLotes): Promise<ListagemLotesResposta> {
    return await this.httpClient.get<ListagemLotesResposta>(`${BASE}/lotes`, {
      params: {
        $top: params.$top,
        $skip: params.$skip,
        $inlinecount: params.$inlinecount,
        cpf_cnpj: params.cpf_cnpj,
        ambiente: params.ambiente,
        referencia: params.referencia,
      },
    });
  }

  async consultar(id: string): Promise<ConsultaResposta> {
    return await this.httpClient.get<ConsultaResposta>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<ConsultaLoteResposta> {
    return await this.httpClient.get<ConsultaLoteResposta>(`${BASE}/lotes/${id}`);
  }

  async consultarCancelamento(id: string): Promise<ConsultaCancelamentoResposta> {
    return await this.httpClient.get<ConsultaCancelamentoResposta>(`${BASE}/${id}/cancelamento`);
  }

  async emitir(dados: ParametrosEmissao): Promise<ConsultaResposta> {
    return await this.httpClient.post<ConsultaResposta>(`${BASE}/dps`, dados);
  }

  async emitirLote(dados: ParametrosEmissaoLote): Promise<ConsultaLoteResposta> {
    return await this.httpClient.post<ConsultaLoteResposta>(`${BASE}/dps/lotes`, dados);
  }

  async cancelar(dados: ParametrosCancelamento): Promise<CancelamentoResposta> {
    return await this.httpClient.post<CancelamentoResposta>(`${BASE}/${dados.id}/cancelamento`, {
      codigo: dados.codigo,
      motivo: dados.motivo,
    });
  }

  async baixarPDF(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXML(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  }
}