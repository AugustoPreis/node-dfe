import { HttpClient } from '../core/httpClient';
import {
  DistribuicaoNfe,
  DistribuicaoNfeDocumento,
  DistribuicaoNfeDocumentoListagem,
  DistribuicaoNfeEvento,
  DistribuicaoNfeListagem,
  DistribuicaoNfeListagemDocumentosQuery,
  DistribuicaoNfeListagemNotasSemManifestacaoQuery,
  DistribuicaoNfeListagemQuery,
  DistribuicaoNfeNotaListagem,
  DistribuicaoNfePedido,
  DistribuicaoNfePedidoManifestacao,
  ManifestacaoNfeListagem
} from '../types/distribuicao-nfe';

const BASE = '/distribuicao/nfe';

export class DistribuicaoNFeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listarDistribuicoes(params: DistribuicaoNfeListagemQuery): Promise<DistribuicaoNfeListagem> {
    return await this.httpClient.get<DistribuicaoNfeListagem>(BASE, { params });
  }

  async listarDocumentos(params: DistribuicaoNfeListagemDocumentosQuery): Promise<DistribuicaoNfeDocumentoListagem> {
    return await this.httpClient.get<DistribuicaoNfeDocumentoListagem>(`${BASE}/documentos`, { params });
  }

  async listarNotasSemManifestacao(params: DistribuicaoNfeListagemNotasSemManifestacaoQuery): Promise<DistribuicaoNfeNotaListagem> {
    return await this.httpClient.get<DistribuicaoNfeNotaListagem>(`${BASE}/notas-sem-manifestacao`, { params });
  }

  async consultarDistribuicao(id: string): Promise<DistribuicaoNfe> {
    return await this.httpClient.get<DistribuicaoNfe>(`${BASE}/${id}`);
  }

  async consultarDocumento(id: string): Promise<DistribuicaoNfeDocumento> {
    return await this.httpClient.get<DistribuicaoNfeDocumento>(`${BASE}/documentos/${id}`);
  }

  async consultarManifestacao(id: string): Promise<DistribuicaoNfeEvento> {
    return await this.httpClient.get<DistribuicaoNfeEvento>(`${BASE}/manifestacoes/${id}`);
  }

  async distribuirDocumentos(dados: DistribuicaoNfePedido): Promise<DistribuicaoNfe> {
    return await this.httpClient.post<DistribuicaoNfe>(BASE, dados);
  }

  async baixarPDFDocumento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/documentos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLDocumento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/documentos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  }

  async listarManifestacoes(params: DistribuicaoNfeListagemQuery): Promise<ManifestacaoNfeListagem> {
    return await this.httpClient.get<ManifestacaoNfeListagem>(`${BASE}/manifestacoes`, { params });
  }

  async manifestarNota(dados: DistribuicaoNfePedidoManifestacao): Promise<DistribuicaoNfeEvento> {
    return await this.httpClient.post<DistribuicaoNfeEvento>(`${BASE}/manifestacoes`, dados);
  }
}
