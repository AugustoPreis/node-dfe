import { HttpClient } from '../../core/httpClient';
import { DfeListagemQuery } from '../../types/dfe';
import { NfcomPedidoEmissao } from '../../types/nfcom';
import { NFComService } from '../nfcom';

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

describe('NFComService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let nfComService: NFComService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    nfComService = new NFComService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfComService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfcom', { params });
  });

  it('consultar', async () => {
    const id = 'cons-123';

    await nfComService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}`);
  });

  it('consultarStatusServico', async () => {
    const params = {
      cpf_cnpj: '0912382193',
    };

    await nfComService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/sefaz/status`, { params });
  });

  it('consultarCancelamento', async () => {
    const id = 'cons-123';

    await nfComService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}/cancelamento`);
  });

  it('emitir', async () => {
    const params = {
      infNFCom: {
        versao: '1.0.0',
      },
    };

    await nfComService.emitir(params as NfcomPedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfcom`, params);
  });

  it('cancelar', async () => {
    const id = 'canc-123';
    const params = {
      justificativa: 'Cancelamento solicitado pelo usuário',
    };

    await nfComService.cancelar(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfcom/${id}/cancelamento`, params);
  });

  it('baixarPDF', async () => {
    const id = '123';

    await nfComService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', async () => {
    const id = '123';

    await nfComService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    await nfComService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}/xml/nota`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = '123';

    await nfComService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLProtocolo', async () => {
    const id = '123';

    await nfComService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfcom/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});
