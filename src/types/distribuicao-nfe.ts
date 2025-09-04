import { Ambiente } from './common';
import { StatusEventoDfe } from './dfe';

export type StatusDistribuicaoNfe = 'processando' | 'concluido' | 'erro';
export type TipoConsultaDistribuicaoNfe = 'dist-nsu' | 'cons-nsu' | 'cons-chave';
export type TipoDocumentoDistribuicaoNfe = 'nota' | 'evento';

export interface DistribuicaoNfeListagemQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
}

export interface DistribuicaoNfeListagemDocumentosQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  dist_nsu?: number;
  tipo_documento?: string;
  forma_distribuicao?: string;
  chave_acesso?: string;
}

export interface DistribuicaoNfeListagemNotasSemManifestacaoQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  conclusiva?: boolean;
}

export interface DistribuicaoNfe {
  id: string;
  created_at?: string;
  status: StatusDistribuicaoNfe;
  ambiente: Ambiente;
  uf_autor?: string;
  tipo_consulta: TipoConsultaDistribuicaoNfe;
  dist_nsu?: number;
  cons_nsu?: number;
  cons_chave?: string;
  codigo_status: number;
  motivo_status?: string;
  data_hora_resposta: string;
  ultimo_nsu: number;
  max_nsu: number;
  documentos?: DistribuicaoNfeDocumento[];
}

export interface DistribuicaoNfeDocumento {
  id: string;
  created_at?: string;
  nsu?: number;
  schema: string;
  tipo_documento?: TipoDocumentoDistribuicaoNfe;
  chave_acesso?: string;
  resumo?: boolean;
  tipo_evento?: string;
  numero_sequencial?: number;
  data_evento?: string;
  data_recebimento?: string;
  numero_protocolo?: string;
  tipo_nfe?: number;
  valor_nfe?: number;
  digest_value?: string;
  emitente_cpf_cnpj?: string;
  emitente_nome_razao_social?: string;
  emitente_inscricao_estadual?: string;
}

export interface DistribuicaoNfeDocumentoListagem {
  '@count'?: number;
  data?: DistribuicaoNfeDocumento[];
}

export interface DistribuicaoNfeEvento {
  id?: string;
  created_at?: string;
  ambiente?: Ambiente;
  status?: StatusEventoDfe;
  cpf_cnpj_autor?: string;
  chave_acesso?: string;
  tipo_evento?: string;
  data_evento?: string;
  numero_sequencial?: number;
  justificativa?: string;
  data_registro?: string;
  codigo_status?: number;
  motivo_status?: string;
  numero_protocolo?: string;
}

export interface DistribuicaoNfeListagem {
  '@count'?: number;
  data?: DistribuicaoNfe[];
}

export interface DistribuicaoNfeNota {
  chave_acesso?: string;
  numero_protocolo?: string;
  tipo_nfe?: number;
  data_emissao?: string;
  valor_nfe?: number;
  digest_value?: string;
  emitente_cpf_cnpj?: string;
  emitente_nome_razao_social?: string;
  emitente_inscricao_estadual?: string;
}

export interface DistribuicaoNfeNotaListagem {
  '@count'?: number;
  data?: DistribuicaoNfeNota[];
}

export interface DistribuicaoNfePedido {
  cpf_cnpj: string;
  ambiente: Ambiente;
  uf_autor?: string;
  tipo_consulta: TipoConsultaDistribuicaoNfe;
  dist_nsu?: number;
  cons_nsu?: number;
  cons_chave?: string;
  ignorar_tempo_espera?: boolean;
}

export interface DistribuicaoNfePedidoManifestacao {
  cpf_cnpj: string;
  ambiente: Ambiente;
  chave_acesso: string;
  tipo_evento: string;
  justificativa?: string;
}

export interface ManifestacaoNfeListagem {
  '@count'?: number;
  data?: DistribuicaoNfeEvento[];
}