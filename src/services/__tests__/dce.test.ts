import { HttpClient } from '../../core/httpClient';
import { DcePedidoEmissao } from '../../types/dce';
import { DfeListagemQuery } from '../../types/dfe';
import { DCeService } from '../dce';

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

describe('DCeService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let dceService: DCeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    dceService = new DCeService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await dceService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/dce', { params });
  });

  it('consultar', async () => {
    const id = 'dfe-id-123';

    await dceService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}`);
  });

  it('consultarStatusServico', async () => {
    const params = {
      cpf_cnpj: '12312312312312',
      autorizador: 'aut',
    };

    await dceService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith('/dce/sefaz/status', { params });
  });

  it('consultarCancelamento', async () => {
    const id = 'dfe-id-123';

    await dceService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}/cancelamento`);
  });

  it('emitir', async () => {
    const params = {
      infDCe: {
        versao: '3.0.0',
      },
    };

    await dceService.emitir(params as DcePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/dce', params);
  });

  it('cancelar', async () => {
    const id = 'dfe-id-123';
    const params = {
      justificativa: 'teste-de-just',
    }

    await dceService.cancelar(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/dce/${id}/cancelamento`, params);
  });

  it('baixarPDF', async () => {
    const id = 'dfe-id-123';

    await dceService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', async () => {
    const id = 'dfe-id-123';

    await dceService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    await dceService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}/xml/declaracao`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = 'dfe-id-123';

    await dceService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLProtocolo', async () => {
    const id = 'dfe-id-123';

    await dceService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/dce/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});