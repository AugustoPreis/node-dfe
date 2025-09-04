import { HttpClient } from '../core/httpClient';
import { CteOsCartaCorrecao, CteOsPedidoCancelamento, CteOsPedidoCartaCorrecao, CteOsPedidoEmissao } from '../types/cte-os';
import { Dfe, DfeCancelamento, DfeConsultaStatusServicoQuery, DfeEvento, DfeListagem, DfeListagemQuery, DfeSefazStatus, DfeSincronizacao } from '../types/dfe';

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

  async consultarEvento(id: string): Promise<DfeEvento> {
    return await this.httpClient.get<DfeEvento>(`${BASE}/eventos/${id}`);
  }

  async consultarStatusServico(params: DfeConsultaStatusServicoQuery): Promise<DfeSefazStatus> {
    return await this.httpClient.get<DfeSefazStatus>(`${BASE}/sefaz/status`, { params });
  }

  async consultarCancelamento(id: string): Promise<DfeCancelamento> {
    return await this.httpClient.get<DfeCancelamento>(`${BASE}/${id}/cancelamento`);
  }

  async consultarSolicitacaoCorrecao(id: string): Promise<CteOsCartaCorrecao> {
    return await this.httpClient.get<CteOsCartaCorrecao>(`${BASE}/${id}/carta-correcao`);
  }

  async emitir(dados: CteOsPedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}/emitir`, dados);
  }

  async sincronizar(id: string): Promise<DfeSincronizacao> {
    return await this.httpClient.post<DfeSincronizacao>(`${BASE}/${id}/sincronizar`);
  }

  async solicitarCorrecao(id: string, dados: CteOsPedidoCartaCorrecao): Promise<CteOsCartaCorrecao> {
    return await this.httpClient.post<CteOsCartaCorrecao>(`${BASE}/${id}/carta-correcao`, dados);
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