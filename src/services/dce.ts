import { HttpClient } from '../core/httpClient';
import { DcePedidoCancelamento, DcePedidoEmissao } from '../types/dce';
import { Dfe, DfeCancelamento, DfeConsultaStatusServicoQuery, DfeListagem, DfeListagemQuery, DfeSefazStatus } from '../types/dfe';

const BASE = '/dce';

export class DCeService {
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

  async consultarStatusServico(params: DfeConsultaStatusServicoQuery): Promise<DfeSefazStatus> {
    return await this.httpClient.get<DfeSefazStatus>(`${BASE}/sefaz/status`, { params });
  }

  async consultarCancelamento(id: string): Promise<DfeCancelamento> {
    return await this.httpClient.get<DfeCancelamento>(`${BASE}/${id}/cancelamento`);
  }

  async emitir(dados: DcePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(BASE, dados);
  }

  async cancelar(id: string, dados: DcePedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/${id}/cancelamento`, dados);
  }

  async baixarPDF(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXML(id: string, processada = true): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml${processada ? '' : '/declaracao'}`, {
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