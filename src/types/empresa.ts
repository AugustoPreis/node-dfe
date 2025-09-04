export interface EmpresaListagemQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj?: string;
}

export interface Empresa {
  cpf_cnpj: string;
  created_at?: string;
  updated_at?: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  nome_razao_social: string;
  nome_fantasia?: string;
  fone?: string;
  email: string;
  endereco: EmpresaEndereco;
}

export interface EmpresaCertificado {
  serial_number?: string;
  issuer_name?: string;
  not_valid_before?: string;
  not_valid_after?: string;
  thumbprint?: string;
  subject_name?: string;
  cpf_cnpj?: string;
  nome_razao_social?: string;
}

export interface EmpresaConfigCte {
  CRT?: number;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigCteOs {
  CRT?: number;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigDce {
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigDistribuicaoNfe {
  distribuicao_automatica?: boolean;
  distribuicao_intervalo_horas?: number;
  ciencia_automatica?: boolean;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigMdfe {
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigNfce {
  CRT?: number;
  sefaz: EmpresaConfigNfceSefaz;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigNfceSefaz {
  id_csc: number;
  csc: string;
}

export interface EmpresaConfigNfcom {
  CRT?: number;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigNfe {
  CRT?: number;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigNfse {
  regTrib?: EmpresaConfigNfseRegTrib;
  rps: EmpresaConfigRps;
  prefeitura?: EmpresaConfigPrefeitura;
  incentivo_fiscal?: boolean;
  ambiente: 'homologacao' | 'producao';
}

export interface EmpresaConfigNfseRegTrib {
  opSimpNac?: number;
  regApTribSN?: number;
  regEspTrib?: number;
}

export interface EmpresaConfigPrefeitura {
  login?: string;
  senha?: string;
  token?: string;
}

export interface EmpresaConfigRps {
  lote: number;
  serie: string;
  numero: number;
}

export interface EmpresaEndereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  codigo_municipio: string;
  cidade?: string;
  uf: string;
  codigo_pais?: string;
  pais?: string;
  cep: string;
}

export interface EmpresaListagem {
  '@count'?: number;
  data?: Empresa[];
}

export interface EmpresaPedidoCadastroCertificado {
  certificado: string;
  password: string;
}