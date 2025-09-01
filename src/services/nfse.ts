import { HttpClient } from '../core/httpClient';
import { CidadesAtendidasResposta, ConsultaCancelamentoResposta, ConsultaLoteResposta, ConsultaResposta, ListagemLotesResposta, ListagemResposta, ParametrosEmissao, ParametrosListagem, ParametrosListagemLotes } from '../types/nfse';

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

  async cidadesAtendidas(codigoIbge: string): Promise<CidadesAtendidasResposta> {
    return await this.httpClient.get<CidadesAtendidasResposta>(`${BASE}/cidades/${codigoIbge}`);
  }

  async emitir(dados: ParametrosEmissao): Promise<ConsultaResposta> {
    return await this.httpClient.post<ConsultaResposta>(`${BASE}/dps`, dados);
  }
}