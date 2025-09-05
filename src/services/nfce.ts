import { HttpClient } from '../core/httpClient';
import { Dfe, DfeCancelamento, DfeConsultaStatusServicoQuery, DfeEvento, DfeEventoListagem, DfeInutilizacao, DfeListagem, DfeListagemEventosQuery, DfeLote, DfeLoteListagem, DfePedidoEnvioEmail, DfePedidoInutilizacao, DfePreviaQuery, DfeSefazStatus, DfeSincronizacao } from '../types/dfe';
import { DfeListagemLotesQuery, DfeListagemQuery } from '../types/dfe';
import { EmailStatusResponse } from '../types/email';
import { NfceComandosEscPosImpressaoQuery } from '../types/nfce';
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

  async listarEventos(params: DfeListagemEventosQuery): Promise<DfeEventoListagem> {
    return await this.httpClient.get<DfeEventoListagem>(`${BASE}/eventos`, { params });
  }

  async consultar(id: string): Promise<Dfe> {
    return await this.httpClient.get<Dfe>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<DfeLote> {
    return await this.httpClient.get<DfeLote>(`${BASE}/lotes/${id}`);
  }

  async consultarEvento(id: string): Promise<DfeEvento> {
    return await this.httpClient.get<DfeEvento>(`${BASE}/eventos/${id}`);
  }

  async consultarInutilizacaoSequencia(id: string): Promise<DfeInutilizacao> {
    return await this.httpClient.get<DfeInutilizacao>(`${BASE}/inutilizacoes/${id}`);
  }

  async consultarStatusServico(params: DfeConsultaStatusServicoQuery): Promise<DfeSefazStatus> {
    return await this.httpClient.get<DfeSefazStatus>(`${BASE}/sefaz/status`, { params });
  }

  async consultarCancelamento(id: string): Promise<DfeCancelamento> {
    return await this.httpClient.get<DfeCancelamento>(`${BASE}/${id}/cancelamento`);
  }

  async emitir(dados: NfePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(BASE, dados);
  }

  async emitirLote(dados: NfePedidoEmissaoLote): Promise<DfeLote> {
    return await this.httpClient.post<DfeLote>(`${BASE}/lotes`, dados);
  }

  async sincronizar(id: string): Promise<DfeSincronizacao> {
    return await this.httpClient.post<DfeSincronizacao>(`${BASE}/${id}/sincronizar`);
  }

  async enviarEmail(id: string, dados: DfePedidoEnvioEmail): Promise<EmailStatusResponse> {
    return await this.httpClient.post<EmailStatusResponse>(`${BASE}/${id}/email`, dados);
  }

  async cancelar(id: string, dados: NfePedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/${id}/cancelamento`, {
      justificativa: dados.justificativa,
    });
  }

  async inutilizarSequencia(dados: DfePedidoInutilizacao): Promise<DfeInutilizacao> {
    return await this.httpClient.post<DfeInutilizacao>(`${BASE}/inutilizacoes`, dados);
  }

  async comandosEscPosImpressao(id: string, params: NfceComandosEscPosImpressaoQuery): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/escpos`, {
      params,
      responseType: 'arraybuffer',
    });
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

  async baixarXMLProtocolo(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  }
}