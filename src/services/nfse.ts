import { HttpClient } from '../core/httpClient';
import { DfeListagemLotesQuery, DfeListagemQuery, DfeSincronizacao } from '../types/dfe';
import {
  Nfse,
  NfseCancelamento,
  NfseCidadeMetadados,
  NfseCidadesAtendidas,
  NfseDpsPedidoEmissao,
  NfseListagem,
  NfseLoteDpsPedidoEmissao,
  NfsePedidoCancelamento,
  RpsLote,
  RpsLoteListagem
} from '../types/nfse';

const BASE = '/nfse';

export class NFSeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: DfeListagemQuery): Promise<NfseListagem> {
    return await this.httpClient.get<NfseListagem>(BASE, {
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

  async listarLotes(params: DfeListagemLotesQuery): Promise<RpsLoteListagem> {
    return await this.httpClient.get<RpsLoteListagem>(`${BASE}/lotes`, {
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

  async consultar(id: string): Promise<Nfse> {
    return await this.httpClient.get<Nfse>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<RpsLote> {
    return await this.httpClient.get<RpsLote>(`${BASE}/lotes/${id}`);
  }

  async consultarCancelamento(id: string): Promise<NfseCancelamento> {
    return await this.httpClient.get<NfseCancelamento>(`${BASE}/${id}/cancelamento`);
  }

  async consultarMetadados(codigoIbge: string): Promise<NfseCidadeMetadados> {
    return await this.httpClient.get<NfseCidadeMetadados>(`${BASE}/cidades/${codigoIbge}`);
  }

  async cidadesAtendidas(): Promise<NfseCidadesAtendidas> {
    return await this.httpClient.get<NfseCidadesAtendidas>(`${BASE}/cidades`);
  }

  async emitir(dados: NfseDpsPedidoEmissao): Promise<Nfse> {
    return await this.httpClient.post<Nfse>(`${BASE}/dps`, dados);
  }

  async emitirLote(dados: NfseLoteDpsPedidoEmissao): Promise<RpsLote> {
    return await this.httpClient.post<RpsLote>(`${BASE}/dps/lotes`, dados);
  }

  async sincronizar(id: string): Promise<DfeSincronizacao> {
    return await this.httpClient.post<DfeSincronizacao>(`${BASE}/${id}/sincronizar`);
  }

  async cancelar(id: string, dados: NfsePedidoCancelamento): Promise<NfseCancelamento> {
    return await this.httpClient.post<NfseCancelamento>(`${BASE}/${id}/cancelamento`, {
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

  async baixarXMLDPS(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/xml/dps`, {
      responseType: 'arraybuffer',
    });
  }

  async baixarXMLCancelamento(id: string): Promise<Buffer> {
    return await this.httpClient.get<Buffer>(`${BASE}/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  }

}