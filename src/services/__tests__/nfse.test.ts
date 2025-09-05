import { HttpClient } from '../../core/httpClient';
import { DfeListagemLotesQuery, DfeListagemQuery } from '../../types/dfe';
import { NfseDpsPedidoEmissao, NfseLoteDpsPedidoEmissao } from '../../types/nfse';
import { NFSeService } from '../nfse';

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

describe('NFSeService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let nfseService: NFSeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    nfseService = new NFSeService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfseService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfse', { params });
  });

  it('listarLotes', async () => {
    const params: DfeListagemLotesQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfseService.listarLotes(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfse/lotes', { params });
  });

  it('consultar', async () => {
    const id = '12345678901';

    await nfseService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/${id}`);
  });

  it('consultarLote', async () => {
    const id = '12345678901';

    await nfseService.consultarLote(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/lotes/${id}`);
  });

  it('consultarCancelamento', async () => {
    const id = '12345678901';

    await nfseService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/${id}/cancelamento`);
  });

  it('consultarMetadados', async () => {
    const id = '12345678901';

    await nfseService.consultarMetadados(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/cidades/${id}`);
  });

  it('cidadesAtendidas', async () => {
    await nfseService.cidadesAtendidas();

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/cidades`);
  });

  it('emitir', async () => {
    const params = {
      infDPS: {
        verAplic: '1.0.0',
      },
    };

    await nfseService.emitir(params as NfseDpsPedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/nfse/dps', params);
  });

  it('emitirLote', async () => {
    const params = {
      documentos: [{
        infDPS: {
          verAplic: '1.0.0',
        }
      }],
    };

    await nfseService.emitirLote(params as NfseLoteDpsPedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/nfse/dps/lotes', params);
  });

  it('sincronizar', async () => {
    const id = '12345678901';

    await nfseService.sincronizar(id);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfse/${id}/sincronizar`);
  });

  it('cancelar', async () => {
    const id = '12345678901';
    const params = {
      motivo: 'Teste de cancelamento'
    };

    await nfseService.cancelar(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfse/${id}/cancelamento`, params);
  });

  it('baixarPDF', async () => {
    const id = '12345678901';

    await nfseService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', async () => {
    const id = '12345678901';

    await nfseService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLDPS', async () => {
    const id = '12345678901';

    await nfseService.baixarXMLDPS(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/${id}/xml/dps`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = '12345678901';

    await nfseService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfse/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });
});