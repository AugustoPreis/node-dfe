import { HttpClient } from '../../core/httpClient';
import { CteOsPedidoEmissao } from '../../types/cte-os';
import { DfeListagemQuery } from '../../types/dfe';
import { CTeOsService } from '../cte-os';

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

describe('CTeOsService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let cteOsService: CTeOsService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    cteOsService = new CTeOsService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      $inlinecount: true,
      $top: '5',
      $skip: '10',
      ambiente: 'homologacao',
      cpf_cnpj: '00112233445566',
      chave: 'key',
      serie: '224',
      referencia: 'ref',
    };

    await cteOsService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/cteos', { params });
  });

  it('consultar', async () => {
    const id = '123-456';

    await cteOsService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}`);
  });

  it('consultarEvento', async () => {
    const id = 'event-id';

    await cteOsService.consultarEvento('event-id');

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/eventos/${id}`);
  });

  it('consultarStatusServico', async () => {
    const params = {
      cpf_cnpj: '12312312312312',
      autorizador: 'aut',
    };

    await cteOsService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/sefaz/status`, { params });
  });

  it('consultarCancelamento', async () => {
    const id = 'cancel-id';

    await cteOsService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/cancelamento`);
  });

  it('consultarSolicitacaoCorrecao', async () => {
    const id = 'sol-cancel-id';

    await cteOsService.consultarSolicitacaoCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/carta-correcao`);
  });

  it('emitir', async () => {
    const cteOsData = {
      ambiente: 'homologacao',
      infCte: {
        versao: '0.0.0',
      },
    };

    await cteOsService.emitir(cteOsData as CteOsPedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/cteos', cteOsData);
  });

  it('sincronizar', async () => {
    const id = 'sinc-id';

    await cteOsService.sincronizar(id);

    expect(httpClient.post).toHaveBeenCalledWith(`/cteos/${id}/sincronizar`);
  });

  it('solicitarCorrecao', async () => {
    const id = 'sol-corr-id';
    const data = {
      correcoes: [{
        grupo_alterado: 'grupo1',
        campo_alterado: 'campo1',
        valor_alterado: 'valor1',
        numero_item_alterado: 123,
      }],
    };

    await cteOsService.solicitarCorrecao(id, data);

    expect(httpClient.post).toHaveBeenCalledWith(`/cteos/${id}/carta-correcao`, data);
  });

  it('cancelar', async () => {
    const id = 'cancel-id';
    const dados = { justificativa: 'just1' };

    await cteOsService.cancelar(id, dados);

    expect(httpClient.post).toHaveBeenCalledWith(`/cteos/${id}/cancelamento`, dados);
  });

  it('baixarPDF', async () => {
    const id = 'pdf-id';

    await cteOsService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', async () => {
    const id = 'xml-id';

    await cteOsService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    await cteOsService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/xml/conhecimento`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFEvento', async () => {
    const id = 'event-id';

    await cteOsService.baixarPDFEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/eventos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLEvento', async () => {
    const id = 'event-id';

    await cteOsService.baixarXMLEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/eventos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCancelamento', async () => {
    const id = 'cancel-id';

    await cteOsService.baixarPDFCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/cancelamento/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = 'cancel-id';

    await cteOsService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCartaCorrecao', async () => {
    const id = 'carta-correcao-id';

    await cteOsService.baixarPDFCartaCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/carta-correcao/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCartaCorrecao', async () => {
    const id = 'carta-correcao-id';

    await cteOsService.baixarXMLCartaCorrecao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/carta-correcao/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLProtocolo', async () => {
    const id = 'protocolo-id';

    await cteOsService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/cteos/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});