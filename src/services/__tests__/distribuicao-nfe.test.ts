import { HttpClient } from '../../core/httpClient';
import { DistribuicaoNfeListagemDocumentosQuery, DistribuicaoNfeListagemNotasSemManifestacaoQuery, DistribuicaoNfeListagemQuery, DistribuicaoNfePedido, DistribuicaoNfePedidoManifestacao } from '../../types/distribuicao-nfe';
import { DistribuicaoNFeService } from '../distribuicao-nfe';

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

describe('DistribuicaoNFeService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let distribuicaoNfeService: DistribuicaoNFeService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    distribuicaoNfeService = new DistribuicaoNFeService(httpClient);
  });

  it('listarDistribuicoes', async () => {
    const params: DistribuicaoNfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await distribuicaoNfeService.listarDistribuicoes(params);

    expect(httpClient.get).toHaveBeenCalledWith('/distribuicao/nfe', { params });
  });

  it('listarDocumentos', async () => {
    const params: DistribuicaoNfeListagemDocumentosQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await distribuicaoNfeService.listarDocumentos(params);

    expect(httpClient.get).toHaveBeenCalledWith('/distribuicao/nfe/documentos', { params });
  });

  it('listarNotasSemManifestacao', async () => {
    const params: DistribuicaoNfeListagemNotasSemManifestacaoQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await distribuicaoNfeService.listarNotasSemManifestacao(params);

    expect(httpClient.get).toHaveBeenCalledWith('/distribuicao/nfe/notas-sem-manifestacao', { params });
  });

  it('consultarDistribuicao', async () => {
    const id = 'cons-distr-123';

    await distribuicaoNfeService.consultarDistribuicao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/distribuicao/nfe/${id}`);
  });

  it('consultarDocumento', async () => {
    const id = 'cons-doc-123';

    await distribuicaoNfeService.consultarDocumento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/distribuicao/nfe/documentos/${id}`);
  });

  it('consultarManifestacao', async () => {
    const id = 'cons-manif-123';

    await distribuicaoNfeService.consultarManifestacao(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/distribuicao/nfe/manifestacoes/${id}`);
  });

  it('distribuirDocumentos', async () => {
    const params = {
      cpf_cnpj: '12345678901',
      ambiente: 'homologacao',
    };

    await distribuicaoNfeService.distribuirDocumentos(params as DistribuicaoNfePedido);

    expect(httpClient.post).toHaveBeenCalledWith('/distribuicao/nfe', params);
  });

  it('baixarPDFDocumento', async () => {
    const id = 'baixar-pdf-123';

    await distribuicaoNfeService.baixarPDFDocumento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/distribuicao/nfe/documentos/${id}/pdf`, {
      responseType: 'arraybuffer',
    });
  });

  it('baixarXMLDocumento', async () => {
    const id = 'baixar-xml-123';

    await distribuicaoNfeService.baixarXMLDocumento(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/distribuicao/nfe/documentos/${id}/xml`, {
      responseType: 'arraybuffer',
    });
  });

  it('listarManifestacoes', async () => {
    const params: DistribuicaoNfeListagemQuery = {
      ambiente: 'homologacao',
      cpf_cnpj: '12345678901',
    };

    await distribuicaoNfeService.listarManifestacoes(params);

    expect(httpClient.get).toHaveBeenCalledWith('/distribuicao/nfe/manifestacoes', { params });
  });

  it('manifestarNota', async () => {
    const params = {
      cpf_cnpj: '12345678901',
      ambiente: 'homologacao',
    };

    await distribuicaoNfeService.manifestarNota(params as DistribuicaoNfePedidoManifestacao);

    expect(httpClient.post).toHaveBeenCalledWith('/distribuicao/nfe/manifestacoes', params);
  });
});