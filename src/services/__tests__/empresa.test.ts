import { HttpClient } from '../../core/httpClient';
import { Empresa, EmpresaConfigCte, EmpresaConfigCteOs, EmpresaConfigDce, EmpresaConfigDistribuicaoNfe, EmpresaConfigMdfe, EmpresaConfigNfce, EmpresaConfigNfcom, EmpresaConfigNfe, EmpresaConfigNfse, EmpresaListagemQuery } from '../../types/empresa';
import { EmpresaService } from '../empresa';

jest.mock('../../core/httpClient', () => {
  return {
    HttpClient: jest.fn().mockImplementation(() => {
      return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      };
    }),
  };
});

describe('EmpresaService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let empresaService: EmpresaService;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new (HttpClient as jest.Mock<HttpClient>)() as jest.Mocked<HttpClient>;
    empresaService = new EmpresaService(httpClient);
  });

  it('listar', async () => {
    const params: EmpresaListagemQuery = {
      cpf_cnpj: '12345678901',
    };

    await empresaService.listar(params);

    expect(httpClient.get).toHaveBeenCalledWith('/empresas', { params });
  });

  it('consultar', async () => {
    const id = 'cons-01';

    await empresaService.consultar(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}`);
  });

  it('cadastrar', async () => {
    const data = {
      cpf_cnpj: '12345678901',
    };

    await empresaService.cadastrar(data as Empresa);

    expect(httpClient.post).toHaveBeenCalledWith('/empresas', data);
  });

  it('alterar', async () => {
    const id = 'cons-01';
    const data = {
      cpf_cnpj: '12345678901',
    };

    await empresaService.alterar(id, data as Empresa);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}`, data);
  });

  it('deletar', async () => {
    const id = 'cons-01';

    await empresaService.deletar(id);

    expect(httpClient.delete).toHaveBeenCalledWith(`/empresas/${id}`);
  });

  it('baixarLogotipo', async () => {
    const id = 'cons-01';

    await empresaService.baixarLogotipo(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/logotipo`, {
      responseType: 'arraybuffer',
    });
  });

  it('enviarLogotipo', async () => {
    const id = '00000000001';
    const dados = Buffer.from('logotipo');

    await empresaService.enviarLogotipo(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/logotipo`, dados, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  });

  it('deletarLogotipo', async () => {
    const id = '00000000001';

    await empresaService.deletarLogotipo(id);

    expect(httpClient.delete).toHaveBeenCalledWith(`/empresas/${id}/logotipo`);
  });

  it('consultarCertificado', async () => {
    const id = 'cons-01';

    await empresaService.consultarCertificado(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/certificado`);
  });

  it('cadastrarCertificado', async () => {
    const id = 'cons-01';
    const dados = {
      certificado: 'cert.pfx',
      password: 'senha',
    };

    await empresaService.cadastrarCertificado(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/certificado`, dados);
  });

  it('deletarCertificado', async () => {
    const id = 'cons-01';

    await empresaService.deletarCertificado(id);

    expect(httpClient.delete).toHaveBeenCalledWith(`/empresas/${id}/certificado`);
  });

  it('uploadCertificado', async () => {
    const id = 'cons-01';
    const dados = {
      certificado: 'cert.pfx',
      password: 'senha',
    };

    await empresaService.uploadCertificado(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/certificado`, dados);
  });

  it('consultarConfiguracoesCTe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesCTe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/cte`);
  });

  it('alterarConfiguracoesCTe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigCte = {
      CRT: 10,
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesCTe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/cte`, dados);
  });

  it('consultarConfiguracoesCTeOs', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesCTeOs(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/cteos`);
  });

  it('alterarConfiguracoesCTeOs', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigCteOs = {
      CRT: 10,
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesCTeOs(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/cteos`, dados);
  });

  it('consultarConfiguracoesDCe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesDCe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/dce`);
  });

  it('alterarConfiguracoesDCe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigDce = {
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesDCe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/dce`, dados);
  });

  it('consultarConfiguracoesDistribuicaoNFe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesDistribuicaoNFe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/distnfe`);
  });

  it('alterarConfiguracoesDistribuicaoNFe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigDistribuicaoNfe = {
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesDistribuicaoNFe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/distnfe`, dados);
  });

  it('consultarConfiguracoesMDFe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesMDFe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/mdfe`);
  });

  it('alterarConfiguracoesMDFe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigMdfe = {
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesMDFe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/mdfe`, dados);
  });

  it('consultarConfiguracoesNFCe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesNFCe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/nfce`);
  });

  it('alterarConfiguracoesNFCe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigNfce = {
      ambiente: 'homologacao',
      sefaz: {
        csc: '12345678901234567890',
        id_csc: 1234567890,
      },
    };

    await empresaService.alterarConfiguracoesNFCe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/nfce`, dados);
  });

  it('consultarConfiguracoesNFCom', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesNFCom(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/nfcom`);
  });

  it('alterarConfiguracoesNFCom', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigNfcom = {
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesNFCom(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/nfcom`, dados);

  });

  it('consultarConfiguracoesNFe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesNFe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/nfe`);
  });

  it('alterarConfiguracoesNFe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigNfe = {
      ambiente: 'homologacao',
    };

    await empresaService.alterarConfiguracoesNFe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/nfe`, dados);
  });

  it('consultarConfiguracoesNFSe', async () => {
    const id = 'cons-01';

    await empresaService.consultarConfiguracoesNFSe(id);

    expect(httpClient.get).toHaveBeenCalledWith(`/empresas/${id}/nfse`);
  });

  it('alterarConfiguracoesNFSe', async () => {
    const id = 'cons-01';
    const dados: EmpresaConfigNfse = {
      ambiente: 'homologacao',
      rps: {
        serie: '1',
        numero: 1,
        lote: 10,
      },
    };

    await empresaService.alterarConfiguracoesNFSe(id, dados);

    expect(httpClient.put).toHaveBeenCalledWith(`/empresas/${id}/nfse`, dados);
  });
});