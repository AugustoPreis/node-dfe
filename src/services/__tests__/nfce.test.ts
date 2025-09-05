import { HttpClient } from '../../core/httpClient';
import { DfeListagemEventosQuery, DfeListagemLotesQuery, DfeListagemQuery, DfePedidoInutilizacao, DfePreviaQuery } from '../../types/dfe';
import { NfceComandosEscPosImpressaoQuery } from '../../types/nfce';
import { NfePedidoEmissao, NfePedidoEmissaoLote } from '../../types/nfe';
import { NFCeService } from '../nfce';

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

describe('NFCeService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let nfceService: NFCeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    nfceService = new NFCeService(httpClient);
  });

  it('listar', async () => {
    const params: DfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfceService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfce', { params });
  });

  it('listarLotes', async () => {
    const params: DfeListagemLotesQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfceService.listarLotes(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfce/lotes', { params });
  });

  it('listarEventos', async () => {
    const params: DfeListagemEventosQuery = {
      dfe_id: '12345678901',
    };

    await nfceService.listarEventos(params);

    expect(httpClient.get).toHaveBeenCalledWith('/nfce/eventos', { params });
  });

  it('consultar', async () => {
    const id = '123';

    await nfceService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}`);
  });

  it('consultarLote', async () => {
    const id = '123';

    await nfceService.consultarLote(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/lotes/${id}`);
  });

  it('consultarEvento', async () => {
    const id = '123';

    await nfceService.consultarEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/eventos/${id}`);
  });

  it('consultarInutilizacaoSequencia', async () => {
    const id = '123';

    await nfceService.consultarInutilizacaoSequencia(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/inutilizacoes/${id}`);
  });

  it('consultarStatusServico', async () => {
    const params = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await nfceService.consultarStatusServico(params);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/sefaz/status`, { params });
  });

  it('consultarCancelamento', async () => {
    const id = '123';

    await nfceService.consultarCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/cancelamento`);
  });

  it('emitir', async () => {
    const params = {
      infNFe: {
        versao: '1.0.0',
      }
    };

    await nfceService.emitir(params as NfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith('/nfce', params);
  });

  it('emitirLote', async () => {
    const params = {
      ambiente: 'homologacao',
      documentos: [{
        infNFe: {
          versao: '1.0.0',
        },
      }],
    };

    await nfceService.emitirLote(params as NfePedidoEmissaoLote);

    expect(httpClient.post).toHaveBeenCalledWith('/nfce/lotes', params);
  });

  it('sincronizar', async () => {
    const id = '123';

    await nfceService.sincronizar(id);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfce/${id}/sincronizar`);
  });

  it('enviarEmail', async () => {
    const id = '123';
    const params = {
      destinatarios: [{
        email: 'email@email.email',
      }],
    };

    await nfceService.enviarEmail(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfce/${id}/email`, params);
  });

  it('cancelar', async () => {
    const id = '123';
    const params = {
      justificativa: 'Cancelamento de Teste',
    }

    await nfceService.cancelar(id, params);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfce/${id}/cancelamento`, params);
  });

  it('inutilizarSequencia', async () => {
    const params = {
      numero_inicial: 1,
      numero_final: 10,
    };

    await nfceService.inutilizarSequencia(params as DfePedidoInutilizacao);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfce/inutilizacoes`, params);
  });

  it('comandosEscPosImpressao', async () => {
    const id = '123';
    const params = {
      qrcode_lateral: true,
    };

    await nfceService.comandosEscPosImpressao(id, params as NfceComandosEscPosImpressaoQuery);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/escpos`, {
      params,
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDF', async () => {
    const id = '123';

    await nfceService.baixarPDF(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXML', async () => {
    const id = '123';

    await nfceService.baixarXML(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/xml`, {
      responseType: 'arraybuffer',
    });

    await nfceService.baixarXML(id, false);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/xml/nota`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPreviaPDF', async () => {
    const params: DfePreviaQuery = {
      resumido: true,
    };
    const dados = {
      infNFe: {
        versao: '1.0.0',
      }
    }

    await nfceService.baixarPreviaPDF(params, dados as NfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfce/previa/pdf`, dados, {
      params,
      responseType: 'arraybuffer',
    });
  });

  it('baixarPreviaXML', async () => {
    const params: DfePreviaQuery = {
      resumido: true,
    };
    const dados = {
      infNFe: {
        versao: '1.0.0',
      }
    }

    await nfceService.baixarPreviaXML(params, dados as NfePedidoEmissao);

    expect(httpClient.post).toHaveBeenCalledWith(`/nfce/previa/xml`, dados, {
      params,
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFEvento', async () => {
    const id = '123';

    await nfceService.baixarPDFEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/eventos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLEvento', async () => {
    const id = '123';

    await nfceService.baixarXMLEvento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/eventos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFInutilizacao', async () => {
    const id = '123';

    await nfceService.baixarPDFInutilizacao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/inutilizacoes/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLInutilizacao', async () => {
    const id = '123';

    await nfceService.baixarXMLInutilizacao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/inutilizacoes/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarPDFCancelamento', async () => {
    const id = '123';

    await nfceService.baixarPDFCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/cancelamento/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLCancelamento', async () => {
    const id = '123';

    await nfceService.baixarXMLCancelamento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/cancelamento/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLProtocolo', async () => {
    const id = '123';

    await nfceService.baixarXMLProtocolo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/nfce/${id}/xml/protocolo`, {
      responseType: 'arraybuffer',
    });
  });
});