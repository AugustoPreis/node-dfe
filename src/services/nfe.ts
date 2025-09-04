import { HttpClient } from '../core/httpClient';
import { NfeConsultaContribuinteQuery, NfePedidoCancelamento, NfePedidoCartaCorrecao, NfePedidoEmissao, NfePedidoEmissaoLote } from '../types/nfe';
import {
  Dfe,
  DfeListagemLotesQuery,
  DfeListagemQuery,
  DfeCancelamento,
  DfeInutilizacao,
  DfeListagem,
  DfeLote,
  DfeLoteListagem,
  DfePedidoInutilizacao,
  DfeContribuinteInfCons,
  DfeListagemEventosQuery,
  DfeEventoListagem,
  DfeEvento,
  DfePreviaQuery,
  DfeConsultaStatusServicoQuery,
  DfeSefazStatus,
  DfeCartaCorrecao,
  DfePedidoEnvioEmail,
  DfeSincronizacao
} from '../types/dfe';
import { EmailStatusResponse } from '../types/email';

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

  async listarEventos(params: DfeListagemEventosQuery): Promise<DfeEventoListagem> {
    return await this.httpClient.get<DfeEventoListagem>(`${BASE}/eventos`, { params });
  }

  async consultar(id: string): Promise<Dfe> {
    return await this.httpClient.get<Dfe>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<DfeLote> {
    return await this.httpClient.get<DfeLote>(`${BASE}/lotes/${id}`);
  }

  async consultarContribuinte(params: NfeConsultaContribuinteQuery): Promise<DfeContribuinteInfCons> {
    return await this.httpClient.get<DfeContribuinteInfCons>(`${BASE}/cadastro-contribuinte`, { params });
  }

  async consultarEvento(id: string): Promise<DfeEvento> {
    return await this.httpClient.get<DfeEvento>(`${BASE}/eventos/${id}`);
  }

  async consultarInutilizacaoSequencia(id: string): Promise<DfeInutilizacao> {
    return await this.httpClient.get<DfeInutilizacao>(`${BASE}/eventos/${id}`);
  }

  async consultarStatusServico(params: DfeConsultaStatusServicoQuery): Promise<DfeSefazStatus> {
    return await this.httpClient.get<DfeSefazStatus>(`${BASE}/sefaz/status`, { params });
  }

  async consultarCancelamento(id: string): Promise<DfeCancelamento> {
    return await this.httpClient.get<DfeCancelamento>(`${BASE}/${id}/cancelamento`);
  }

  async consultarSolicitacaoCorrecao(id: string): Promise<DfeCartaCorrecao> {
    return await this.httpClient.get<DfeCartaCorrecao>(`${BASE}/${id}/carta-correcao`);
  }

  async emitir(dados: NfePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}`, dados);
  }

  async emitirLote(dados: NfePedidoEmissaoLote): Promise<DfeLote> {
    return await this.httpClient.post<DfeLote>(`${BASE}/lotes`, dados)
  }

  async sincronizar(id: string): Promise<DfeSincronizacao> {
    return await this.httpClient.post<DfeSincronizacao>(`${BASE}/${id}/sincronizar`);
  }

  async enviarEmail(id: string, dados: DfePedidoEnvioEmail): Promise<EmailStatusResponse> {
    return await this.httpClient.post<EmailStatusResponse>(`${BASE}/${id}/email`, dados);
  }

  async solicitarCorrecao(id: string, dados: NfePedidoCartaCorrecao): Promise<DfeCartaCorrecao> {
    return await this.httpClient.post<DfeCartaCorrecao>(`${BASE}/${id}/carta-correcao`, dados);
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

  async baixarPDFEvento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/eventos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLEvento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/eventos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarPDFInutilizacao(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/inutilizacoes/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLInutilizacao(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/inutilizacoes/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarPreviaPDF(params: DfePreviaQuery, dados: NfePedidoEmissao): Promise<Buffer> {
    return await this.httpClient.post<Buffer>(`${BASE}/previa/pdf`, dados, {
      params,
      responseType: 'arraybuffer',
    });
  }

  async baixarPreviaXML(params: DfePreviaQuery, dados: NfePedidoEmissao): Promise<Buffer> {
    return await this.httpClient.post<Buffer>(`${BASE}/previa/xml`, dados, {
      params,
      responseType: 'arraybuffer',
    });
  }

  async baixarPDFCancelamento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/cancelamento/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLCancelamento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarPDFCartaCorrecao(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/carta-correcao/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLCartaCorrecao(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/carta-correcao/xml`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLProtocolo(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  }
}