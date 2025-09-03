import { HttpClient } from '../core/httpClient';
import {
  NFeListagemParametros,
  NFeListagemResultado,
  NFeEmissaoParametros,
  NFeConsultaResultado,
  NFeInutilizarSequenciaParametros,
  NFeInutilizarSequenciaResultado,
  NFeListagemLotesParametros,
  NFeListagemLotesResultado,
  NFeConsultaLoteResultado,
  NFeEmissaoLoteParametros,
  NFeCancelamentoParametros,
} from '../types/nfe';

const BASE = '/nfe';

export class NFeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: NFeListagemParametros): Promise<NFeListagemResultado> {
    return await this.httpClient.get<NFeListagemResultado>(BASE, {
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

  async listarLotes(params: NFeListagemLotesParametros): Promise<NFeListagemLotesResultado> {
    return await this.httpClient.get<NFeListagemLotesResultado>(`${BASE}/lotes`, {
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

  async consultar(id: string): Promise<NFeConsultaResultado> {
    return await this.httpClient.get<NFeConsultaResultado>(`${BASE}/${id}`);
  }

  async consultarLote(id: string): Promise<NFeConsultaLoteResultado> {
    return await this.httpClient.get<NFeConsultaLoteResultado>(`${BASE}/lotes/${id}`);
  }

  async emitir(dados: NFeEmissaoParametros): Promise<NFeConsultaResultado> {
    return await this.httpClient.post<NFeConsultaResultado>(`${BASE}`, dados);
  }

  async emitirLote(dados: NFeEmissaoLoteParametros): Promise<NFeConsultaLoteResultado> {
    return await this.httpClient.post<NFeConsultaLoteResultado>(`${BASE}/lotes`, dados)
  }

  async cancelar(dados: NFeCancelamentoParametros): Promise<NFeConsultaResultado> {
    return await this.httpClient.post<NFeConsultaResultado>(`${BASE}/${dados.id}/cancelamento`, {
      justificativa: dados.justificativa,
    });
  }

  async inutilizarSequencia(dados: NFeInutilizarSequenciaParametros): Promise<NFeInutilizarSequenciaResultado> {
    return await this.httpClient.post<NFeInutilizarSequenciaResultado>(`${BASE}/inutilizacoes`, dados);
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
}