import { HttpClient } from '../core/httpClient';
import {
  Empresa,
  EmpresaCertificado,
  EmpresaConfigCte,
  EmpresaConfigCteOs,
  EmpresaConfigDce,
  EmpresaConfigDistribuicaoNfe,
  EmpresaConfigMdfe,
  EmpresaConfigNfce,
  EmpresaConfigNfcom,
  EmpresaConfigNfe,
  EmpresaConfigNfse,
  EmpresaListagem,
  EmpresaListagemQuery,
  EmpresaPedidoCadastroCertificado
} from '../types/empresa';

const BASE = '/empresas';

export class EmpresaService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listar(params: EmpresaListagemQuery): Promise<EmpresaListagem> {
    return await this.httpClient.get<EmpresaListagem>(BASE, { params });
  }

  async consultar(cpfCnpj: string): Promise<Empresa> {
    return await this.httpClient.get<Empresa>(`${BASE}/${cpfCnpj}`);
  }

  async cadastrar(dados: Empresa): Promise<Empresa> {
    return await this.httpClient.post<Empresa>(BASE, dados);
  }

  async alterar(cpfCnpj: string, dados: Empresa): Promise<Empresa> {
    return await this.httpClient.put<Empresa>(`${BASE}/${cpfCnpj}`, dados);
  }

  async deletar(cpfCnpj: string): Promise<void> {
    await this.httpClient.delete(`${BASE}/${cpfCnpj}`);
  }

  async baixarLogotipo(cpfCnpj: string): Promise<Buffer> {
    return await this.httpClient.get(`${BASE}/${cpfCnpj}/logotipo`, {
      responseType: 'arraybuffer',
    });
  }

  async enviarLogotipo(cpfCnpj: string, dados: Buffer): Promise<void> {
    await this.httpClient.put(`${BASE}/${cpfCnpj}/logotipo`, dados, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  async deletarLogotipo(cpfCnpj: string): Promise<void> {
    await this.httpClient.delete(`${BASE}/${cpfCnpj}/logotipo`);
  }

  // =========================================================================  //
  // ============================== CERTIFICADO ==============================  //
  // =========================================================================  //

  async consultarCertificado(cpfCnpj: string): Promise<EmpresaCertificado> {
    return await this.httpClient.get<EmpresaCertificado>(`${BASE}/${cpfCnpj}/certificado`);
  }

  async cadastrarCertificado(cpfCnpj: string, dados: EmpresaPedidoCadastroCertificado): Promise<EmpresaCertificado> {
    return await this.httpClient.put<EmpresaCertificado>(`${BASE}/${cpfCnpj}/certificado`, dados);
  }

  async deletarCertificado(cpfCnpj: string): Promise<void> {
    await this.httpClient.delete(`${BASE}/${cpfCnpj}/certificado`);
  }

  async uploadCertificado(cpfCnpj: string, dados: EmpresaPedidoCadastroCertificado): Promise<EmpresaCertificado> {
    // TODO: Implementar diretamente na rota /certificado/upload
    return await this.cadastrarCertificado(cpfCnpj, dados);
  }

  // =========================================================================  //
  // ============================= CONFIGURAÇÕES =============================  //
  // =========================================================================  //

  async consultarConfiguracoesCTe(cpfCnpj: string): Promise<EmpresaConfigCte> {
    return await this.httpClient.get<EmpresaConfigCte>(`${BASE}/${cpfCnpj}/cte`);
  }

  async alterarConfiguracoesCTe(cpfCnpj: string, dados: EmpresaConfigCte): Promise<EmpresaConfigCte> {
    return await this.httpClient.put<EmpresaConfigCte>(`${BASE}/${cpfCnpj}/cte`, dados);
  }

  async consultarConfiguracoesCTeOs(cpfCnpj: string): Promise<EmpresaConfigCteOs> {
    return await this.httpClient.get<EmpresaConfigCte>(`${BASE}/${cpfCnpj}/cteos`);
  }

  async alterarConfiguracoesCTeOs(cpfCnpj: string, dados: EmpresaConfigCteOs): Promise<EmpresaConfigCteOs> {
    return await this.httpClient.put<EmpresaConfigCteOs>(`${BASE}/${cpfCnpj}/cteos`, dados);
  }

  async consultarConfiguracoesDCe(cpfCnpj: string): Promise<EmpresaConfigDce> {
    return await this.httpClient.get<EmpresaConfigDce>(`${BASE}/${cpfCnpj}/dce`);
  }

  async alterarConfiguracoesDCe(cpfCnpj: string, dados: EmpresaConfigDce): Promise<EmpresaConfigDce> {
    return await this.httpClient.put<EmpresaConfigDce>(`${BASE}/${cpfCnpj}/dce`, dados);
  }

  async consultarConfiguracoesDistribuicaoNFe(cpfCnpj: string): Promise<EmpresaConfigDistribuicaoNfe> {
    return await this.httpClient.get<EmpresaConfigDistribuicaoNfe>(`${BASE}/${cpfCnpj}/distnfe`);
  }

  async alterarConfiguracoesDistribuicaoNFe(cpfCnpj: string, dados: EmpresaConfigDistribuicaoNfe): Promise<EmpresaConfigDistribuicaoNfe> {
    return await this.httpClient.put<EmpresaConfigDistribuicaoNfe>(`${BASE}/${cpfCnpj}/distnfe`, dados);
  }

  async consultarConfiguracoesMDFe(cpfCnpj: string): Promise<EmpresaConfigMdfe> {
    return await this.httpClient.get<EmpresaConfigMdfe>(`${BASE}/${cpfCnpj}/mdfe`);
  }

  async alterarConfiguracoesMDFe(cpfCnpj: string, dados: EmpresaConfigMdfe): Promise<EmpresaConfigMdfe> {
    return await this.httpClient.put<EmpresaConfigMdfe>(`${BASE}/${cpfCnpj}/mdfe`, dados);
  }

  async consultarConfiguracoesNFCe(cpfCnpj: string): Promise<EmpresaConfigNfce> {
    return await this.httpClient.get<EmpresaConfigNfce>(`${BASE}/${cpfCnpj}/nfce`);
  }

  async alterarConfiguracoesNFCe(cpfCnpj: string, dados: EmpresaConfigNfce): Promise<EmpresaConfigNfce> {
    return await this.httpClient.put<EmpresaConfigNfce>(`${BASE}/${cpfCnpj}/nfce`, dados);
  }

  async consultarConfiguracoesNFCom(cpfCnpj: string): Promise<EmpresaConfigNfcom> {
    return await this.httpClient.get<EmpresaConfigNfcom>(`${BASE}/${cpfCnpj}/nfcom`);
  }

  async alterarConfiguracoesNFCom(cpfCnpj: string, dados: EmpresaConfigNfcom): Promise<EmpresaConfigNfcom> {
    return await this.httpClient.put<EmpresaConfigNfcom>(`${BASE}/${cpfCnpj}/nfcom`, dados);
  }

  async consultarConfiguracoesNFe(cpfCnpj: string): Promise<EmpresaConfigNfe> {
    return await this.httpClient.get<EmpresaConfigNfe>(`${BASE}/${cpfCnpj}/nfe`);
  }

  async alterarConfiguracoesNFe(cpfCnpj: string, dados: EmpresaConfigNfe): Promise<EmpresaConfigNfe> {
    return await this.httpClient.put<EmpresaConfigNfe>(`${BASE}/${cpfCnpj}/nfe`, dados);
  }

  async consultarConfiguracoesNFSe(cpfCnpj: string): Promise<EmpresaConfigNfse> {
    return await this.httpClient.get<EmpresaConfigNfse>(`${BASE}/${cpfCnpj}/nfse`);
  }

  async alterarConfiguracoesNFSe(cpfCnpj: string, dados: EmpresaConfigNfse): Promise<EmpresaConfigNfse> {
    return await this.httpClient.put<EmpresaConfigNfse>(`${BASE}/${cpfCnpj}/nfse`, dados);
  }
}