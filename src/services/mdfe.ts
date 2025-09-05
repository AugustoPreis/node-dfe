import { HttpClient } from '../core/httpClient';
import { Dfe, DfeCancelamento, DfeConsultaStatusServicoQuery, DfeEvento, DfeListagem, DfeListagemLotesQuery, DfeListagemQuery, DfeLote, DfeLoteListagem, DfeSefazStatus, DfeSincronizacao } from '../types/dfe';
import {
  MdfeConsultaNaoEncerradosQuery,
  MdfeEncerramento,
  MdfeInclusaoCondutor,
  MdfeInclusaoDfe,
  MdfeNaoEncerrados,
  MdfePedidoCancelamento,
  MdfePedidoEmissao,
  MdfePedidoEmissaoLote,
  MdfePedidoEncerramento,
  MdfePedidoInclusaoCondutor,
  MdfePedidoInclusaoDfe
} from '../types/mdfe';

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

  async consultarNaoEncerrados(params: MdfeConsultaNaoEncerradosQuery): Promise<MdfeNaoEncerrados> {
    return await this.httpClient.get<MdfeNaoEncerrados>(`${BASE}/nao-encerrados`, { params });
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

  async emitir(dados: MdfePedidoEmissao): Promise<Dfe> {
    return await this.httpClient.post<Dfe>(`${BASE}`, dados);
  }

  async emitirLote(dados: MdfePedidoEmissaoLote): Promise<DfeLote> {
    return await this.httpClient.post<DfeLote>(`${BASE}/lotes`, dados);
  }

  async incluirCondutor(id: string, dados: MdfePedidoInclusaoCondutor): Promise<MdfeInclusaoCondutor> {
    return await this.httpClient.post<MdfeInclusaoCondutor>(`${BASE}/${id}/inclusao-condutor`, dados);
  }

  async incluirDfe(id: string, dados: MdfePedidoInclusaoDfe): Promise<MdfeInclusaoDfe> {
    return await this.httpClient.post<MdfeInclusaoDfe>(`${BASE}/${id}/inclusao-dfe`, dados);
  }

  async sincronizar(id: string): Promise<DfeSincronizacao> {
    return await this.httpClient.post<DfeSincronizacao>(`${BASE}/${id}/sincronizar`);
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

  async baixarPDFEncerramento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/encerramento/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLEncerramento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/encerramento/xml`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLProtocolo(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  }
}