import { HttpClient } from '../../core/httpClient';
import { CtePedidoCartaCorrecao, CtePedidoEmissao, CteSimpPedidoEmissao } from '../../types/cte';
import { DfeListagemQuery } from '../../types/dfe';
import { CTeService } from '../cte';

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

describe('CTeService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let cteService: CTeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    cteService = new CTeService(httpClient);
  });

  it('listar', () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '00112233445566',
    };

    cteService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/cte', { params });
  });

  it('consultar', () => {
    const id = '12345';

    cteService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}`);
  });

  it('consultarEvento', () => {
    const id = '12345';

    cteService.consultarEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/eventos/${id}`);
  });

  it('consultarStatusServico', () => {
    const params = {
      cpf_cnpj: '00112233445566',
    };

    cteService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith('/cte/sefaz/status', { params });
  });

  it('consultarCancelamento', () => {
    const id = '12345';

    cteService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/cancelamento`);
  });

  it('consultarSolicitacaoCorrecao', () => {
    const id = '12345';

    cteService.consultarSolicitacaoCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/carta-correcao`);
  });

  it('emitir', () => {
    const dados = {
      infCte: {
        versao: '1.0.0',
      },
    };

    cteService.emitir(dados as CtePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/cte', dados);
  });

  it('emitirSimplificado', () => {
    const dados = {
      infCte: {
        versao: '2.0.0',
      },
    };

    cteService.emitirSimplificado(dados as CteSimpPedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/cte/simp', dados);
  });

  it('sincronizar', () => {
    const id = '12345';

    cteService.sincronizar(id);

    expect(httpClient.post).toHaveBeenCalledWith(`/cte/${id}/sincronizar`);
  });

  it('solicitarCorrecao', () => {
    const id = 'solicitar-corr';
    const dados = {
      correcoes: [{
        grupo_alterado: 'grupo1',
        campo_alterado: 'campo1',
        valor_alterado: 'valor1',
      }],
    };

    cteService.solicitarCorrecao(id, dados as CtePedidoCartaCorrecao);

    expect(httpClient.post).toHaveBeenCalledWith(`/cte/${id}/carta-correcao`, dados);
  });

  it('cancelar', () => {
    const id = 'cancelar';
    const dados = {
      justificativa: 'Justificativa de cancelamento',
    };

    cteService.cancelar(id, dados);

    expect(httpClient.post).toHaveBeenCalledWith(`/cte/${id}/cancelamento`, {
      justificativa: dados.justificativa,
    });
  });

  it('baixarPDF', () => {
    const id = 'baixar-pdf';

    cteService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', () => {
    const id = 'baixar-xml';

    cteService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    cteService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/xml/conhecimento`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFEvento', () => {
    const id = 'baixar-pdf-evento';

    cteService.baixarPDFEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/eventos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLEvento', () => {
    const id = 'baixar-xml-evento';

    cteService.baixarXMLEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/eventos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCancelamento', () => {
    const id = 'baixar-pdf-canc';

    cteService.baixarPDFCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/cancelamento/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', () => {
    const id = 'baixar-xml-canc';

    cteService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCartaCorrecao', () => {
    const id = 'baixar-pdf-car-corr';

    cteService.baixarPDFCartaCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/carta-correcao/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCartaCorrecao', () => {
    const id = 'baixar-xml-car-corr';

    cteService.baixarXMLCartaCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/carta-correcao/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLProtocolo', () => {
    const id = 'baixar-xml-prot';

    cteService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cte/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});