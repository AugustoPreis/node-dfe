import { HttpClient } from '../../core/httpClient';
import { DfeConsultaStatusServicoQuery, DfeListagemLotesQuery, DfeListagemQuery } from '../../types/dfe';
import { MdfeConsultaNaoEncerradosQuery, MdfePedidoCancelamento, MdfePedidoEmissao, MdfePedidoEmissaoLote, MdfePedidoEncerramento, MdfePedidoInclusaoCondutor, MdfePedidoInclusaoDfe } from '../../types/mdfe';
import { MDFeService } from '../mdfe';

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

describe('EmpresaService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let mdfeService: MDFeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    mdfeService = new MDFeService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await mdfeService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/mdfe', { params });
  });

  it('listarLotes', async () => {
    const params: DfeListagemLotesQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await mdfeService.listarLotes(params);

    expect(httpClient.get).toHaveBeenCalledWith('/mdfe/lotes', { params });
  });

  it('consultar', async () => {
    const id = '12345678901';

    await mdfeService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}`);
  });

  it('consultarLote', async () => {
    const id = '12345678901';

    await mdfeService.consultarLote(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/lotes/${id}`);
  });

  it('consultarNaoEncerrados', async () => {
    const params: MdfeConsultaNaoEncerradosQuery = {
      cpfCnpj: '12345678901',
    };

    await mdfeService.consultarNaoEncerrados(params);

    expect(httpClient.get).toHaveBeenCalledWith('/mdfe/nao-encerrados', { params });
  });

  it('consultarEvento', async () => {
    const id = '12345678901';

    await mdfeService.consultarEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/eventos/${id}`);
  });

  it('consultarStatusServico', async () => {
    const params: DfeConsultaStatusServicoQuery = {
      cpf_cnpj: '12345678901',
    };

    await mdfeService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/sefaz/status`, { params });
  });

  it('consultarCancelamento', async () => {
    const id = '12345678901';

    await mdfeService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/cancelamento`);
  });

  it('emitir', async () => {
    const params = {
      infMDFe: {
        versao: '0.0.0',
      },
    };

    await mdfeService.emitir(params as MdfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/mdfe', params);
  });

  it('emitirLote', async () => {
    const params = {
      documentos: [{
        infMDFe: {
          versao: '1.1.1',
        },
      }],
    };

    await mdfeService.emitirLote(params as MdfePedidoEmissaoLote);

    expect(httpClient.post).toHaveBeenCalledWith('/mdfe/lotes', params);
  });

  it('incluirCondutor', async () => {
    const id = 'inc-cond-123';
    const params = {
      nome_condutor: 'Nome',
      cpf_condutor: '12321832183',
    };

    await mdfeService.incluirCondutor(id, params as MdfePedidoInclusaoCondutor);

    expect(httpClient.post).toHaveBeenCalledWith(`/mdfe/${id}/inclusao-condutor`, params);
  });

  it('incluirDfe', async () => {
    const id = 'inc-dfe-123';
    const params = {
      codigo_municipio_carrega: '20202',
    };

    await mdfeService.incluirDfe(id, params as MdfePedidoInclusaoDfe);

    expect(httpClient.post).toHaveBeenCalledWith(`/mdfe/${id}/inclusao-dfe`, params);
  });

  it('sincronizar', async () => {
    const id = 'sync-123';

    await mdfeService.sincronizar(id);

    expect(httpClient.post).toHaveBeenCalledWith(`/mdfe/${id}/sincronizar`);
  });

  it('encerrar', async () => {
    const id = 'enc-123';
    const params = {
      uf: 'SP',
      codigo_municipio: '202012',
    }

    await mdfeService.encerrar(id, params as MdfePedidoEncerramento);

    expect(httpClient.post).toHaveBeenCalledWith(`/mdfe/${id}/encerramento`, params);
  });

  it('cancelar', async () => {
    const id = 'cancel-123';
    const params = {
      justificativa: 'Justificativa de cancelamento',
    };

    await mdfeService.cancelar(id, params as MdfePedidoCancelamento);

    expect(httpClient.post).toHaveBeenCalledWith(`/mdfe/${id}/cancelamento`, params);
  });

  it('baixarXML', async () => {
    const id = 'baixar-xml-123';

    await mdfeService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    await mdfeService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/xml/manifesto`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLEvento', async () => {
    const id = 'baixar-xml-evento-123';

    await mdfeService.baixarXMLEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/eventos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCancelamento', async () => {
    const id = 'baixar-pdf-cancelamento-123';

    await mdfeService.baixarPDFCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/cancelamento/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = 'baixar-xml-cancelamento-123';

    await mdfeService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFEncerramento', async () => {
    const id = 'baixar-pdf-encerramento-123';

    await mdfeService.baixarPDFEncerramento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/encerramento/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLEncerramento', async () => {
    const id = 'baixar-xml-encerramento-123';

    await mdfeService.baixarXMLEncerramento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/encerramento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLProtocolo', async () => {
    const id = 'baixar-xml-protocolo-123';

    await mdfeService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/mdfe/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});