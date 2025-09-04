import { HttpClient } from '../core/httpClient';
import { CteCartaCorrecao, CtePedidoCancelamento, CtePedidoCartaCorrecao, CtePedidoEmissao, CteSimpPedidoEmissao } from '../types/cte';
import { Dfe, DfeCancelamento, DfeConsultaStatusServicoQuery, DfeEvento, DfeListagem, DfeListagemQuery, DfeSefazStatus, DfeSincronizacao } from '../types/dfe';

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

  async consultarEvento(id: string): Promise<DfeEvento> {
    return await this.httpClient.get<DfeEvento>(`${BASE}/eventos/${id}`);
  }

  async consultarStatusServico(params: DfeConsultaStatusServicoQuery): Promise<DfeSefazStatus> {
    return await this.httpClient.get<DfeSefazStatus>(`${BASE}/sefaz/status`, { params });
  }

  async consultarCancelamento(id: string): Promise<DfeCancelamento> {
    return await this.httpClient.get<DfeCancelamento>(`${BASE}/${id}/cancelamento`);
  }

  async consultarSolicitacaoCorrecao(id: string): Promise<CteCartaCorrecao> {
    return await this.httpClient.get<CteCartaCorrecao>(`${BASE}/${id}/carta-correcao`);
  }

  async emitir(dados: CtePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(BASE, dados);
  }

  async emitirSimplificado(dados: CteSimpPedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}/simp`, dados);
  }

  async sincronizar(id: string): Promise<DfeSincronizacao> {
    return await this.httpClient.post<DfeSincronizacao>(`${BASE}/${id}/sincronizar`);
  }

  async solicitarCorrecao(id: string, dados: CtePedidoCartaCorrecao): Promise<CteCartaCorrecao> {
    return await this.httpClient.post<CteCartaCorrecao>(`${BASE}/${id}/carta-correcao`, dados);
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