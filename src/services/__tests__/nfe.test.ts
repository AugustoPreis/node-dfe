import { HttpClient } from '../../core/httpClient';
import { DfeConsultaStatusServicoQuery, DfeListagemEventosQuery, DfeListagemLotesQuery, DfeListagemQuery, DfePedidoInutilizacao } from '../../types/dfe';
import { NfeConsultaContribuinteQuery, NfePedidoEmissao, NfePedidoEmissaoLote } from '../../types/nfe';
import { NFeService } from '../nfe';

jest.mock('../../core/httpClient', () => {
  return {
    HttpClient: jest.fn().mockImplementation(() => {
      return {
        get: jest.fn(),
        post: jest.fn(),
      };
    }),
  };
});

describe('NFeService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let nfeService: NFeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    nfeService = new NFeService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfeService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfe', { params });
  });

  it('listarLotes', async () => {
    const params: DfeListagemLotesQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfeService.listarLotes(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfe/lotes', { params });
  });

  it('listarEventos', async () => {
    const params: DfeListagemEventosQuery = {
      dfe_id: '19247192',
    };

    await nfeService.listarEventos(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfe/eventos', { params });
  });

  it('consultar', async () => {
    const id = 'cons-123';

    await nfeService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}`);
  });

  it('consultarLote', async () => {
    const id = 'lote-123';

    await nfeService.consultarLote(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/lotes/${id}`);
  });

  it('consultarContribuinte', async () => {
    const params: NfeConsultaContribuinteQuery = {
      cpf_cnpj: '12345678901',
      argumento: 'valor',
      documento: 'cpf',
    };

    await nfeService.consultarContribuinte(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfe/cadastro-contribuinte', { params });
  });

  it('consultarEvento', async () => {
    const id = 'evento-123';

    await nfeService.consultarEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/eventos/${id}`);
  });

  it('consultarInutilizacaoSequencia', async () => {
    const id = 'inutilizacao-123';

    await nfeService.consultarInutilizacaoSequencia(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/inutilizacoes/${id}`);
  });

  it('consultarStatusServico', async () => {
    const params: DfeConsultaStatusServicoQuery = {
      cpf_cnpj: '12345678901',
    };

    await nfeService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfe/sefaz/status', { params });
  });

  it('consultarCancelamento', async () => {
    const id = 'cancelamento-123';

    await nfeService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/cancelamento`);
  });

  it('consultarSolicitacaoCorrecao', async () => {
    const id = 'solicitacao-123';

    await nfeService.consultarSolicitacaoCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/carta-correcao`);
  });

  it('emitir', async () => {
    const dados = {
      infNFe: {
        versao: '1.2.3',
      },
    };

    await nfeService.emitir(dados as NfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/nfe', dados);
  });

  it('emitirLote', async () => {
    const dados = {
      documentos: [{
        infNFe: {
          versao: '1.2.3',
        },
      }],
    };

    await nfeService.emitirLote(dados as NfePedidoEmissaoLote);

    expect(httpClient.post).toHaveBeenCalledWith('/nfe/lotes', dados);
  });

  it('sincronizar', async () => {
    const id = 'sincronizar-123';

    await nfeService.sincronizar(id);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfe/${id}/sincronizar`);
  });

  it('enviarEmail', async () => {
    const id = 'email-123';
    const params = {
      destinatarios: [{ email: 'string' }],
    };

    await nfeService.enviarEmail(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfe/${id}/email`, params);
  });

  it('solicitarCorrecao', async () => {
    const id = 'correcao-123';
    const params = {
      correcao: 'oacerroc',
    };

    await nfeService.solicitarCorrecao(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfe/${id}/carta-correcao`, params);
  });

  it('cancelar', async () => {
    const id = 'cancelar-123';
    const params = {
      justificativa: 'string',
    };

    await nfeService.cancelar(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfe/${id}/cancelamento`, params);
  });

  it('inutilizarSequencia', async () => {
    const params = {
      numero_inicial: 1,
      numero_final: 10,
    }

    await nfeService.inutilizarSequencia(params as DfePedidoInutilizacao);

    expect(httpClient.post).toHaveBeenCalledWith('/nfe/inutilizacoes', params);
  });

  it('baixarPDF', async () => {
    const id = 'baixar-123';

    await nfeService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', async () => {
    const id = 'baixar-123';

    await nfeService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    await nfeService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/xml/nota`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFEvento', async () => {
    const id = 'evento-123';

    await nfeService.baixarPDFEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/eventos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLEvento', async () => {
    const id = 'evento-123';

    await nfeService.baixarXMLEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/eventos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFInutilizacao', async () => {
    const id = 'inutilizacao-123';

    await nfeService.baixarPDFInutilizacao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/inutilizacoes/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLInutilizacao', async () => {
    const id = 'inutilizacao-123';

    await nfeService.baixarXMLInutilizacao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/inutilizacoes/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPreviaPDF', async () => {
    const params = {
      logotipo: true,
    };
    const dados = {
      infNFe: {
        versao: '1.2.3',
      },
    };

    await nfeService.baixarPreviaPDF(params, dados as NfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfe/previa/pdf`, dados, {
      params,
      responseType: 'arraybuffer',
    });
  });

  it('baixarPreviaXML', async () => {
    const params = {
      logotipo: true,
    };
    const dados = {
      infNFe: {
        versao: '1.2.3',
      },
    };

    await nfeService.baixarPreviaXML(params, dados as NfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfe/previa/xml`, dados, {
      params,
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCancelamento', async () => {
    const id = 'cancelamento-123';

    await nfeService.baixarPDFCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/cancelamento/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = 'cancelamento-123';

    await nfeService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCartaCorrecao', async () => {
    const id = 'carta-correcao-123';

    await nfeService.baixarPDFCartaCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/carta-correcao/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCartaCorrecao', async () => {
    const id = 'carta-correcao-123';

    await nfeService.baixarXMLCartaCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/carta-correcao/xml`, {
      responseType: 'arraybuffer',
    });

  });

  it('baixarXMLProtocolo', async () => {
    const id = 'protocolo-123';

    await nfeService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfe/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});
