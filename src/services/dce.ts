import { HttpClient } from '../core/httpClient';
import { DcePedidoCancelamento, DcePedidoEmissao } from '../types/dce';
import { Dfe, DfeCancelamento, DfeListagem, DfeListagemQuery } from '../types/dfe';

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

  async emitir(dados: DcePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(BASE, dados);
  }

  async cancelar(dados: DcePedidoCancelamento): Promise<DfeCancelamento> {
    return await this.httpClient.post<DfeCancelamento>(`${BASE}/cancelamento`, dados);
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
}