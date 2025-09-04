import { Ambiente } from './common';

export type StatusDfe = 'pendente' | 'autorizado' | 'rejeitado' | 'denegado' | 'encerrado' | 'cancelado' | 'erro';
export type StatusEventoDfe = 'pendente' | 'registrado' | 'rejeitado' | 'erro';
export type StatusSincronizacaoDfe = 'pendente' | 'sincronizado' | 'erro';
export type StatusDfeLote = 'pendente' | 'processado' | 'erro';
export type EstadosAutorizadorDfe = 'AM' | 'BA' | 'CE' | 'GO' | 'MG' | 'MS' | 'MT' | 'PE' | 'PR' | 'RS' | 'SP' | 'SVAN' | 'SVRS' | 'SVCAN' | 'SVCRS' | 'AN' | 'SVSP' | 'SVCSP';

export interface DfeListagemQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  referencia?: string;
  ambiente: Ambiente;
  chave?: string;
  serie?: string;
}

export interface DfeListagemLotesQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  referencia?: string;
  ambiente: Ambiente;
}

export interface DfeConsultaStatusServicoQuery {
  cpf_cnpj: string;
  autorizador?: string;
}

export interface DfeListagem {
  '@count'?: number;
  data?: Dfe[];
}

export interface Dfe {
  id?: string;
  ambiente?: Ambiente;
  created_at?: string;
  status?: StatusDfe;
  referencia?: string;
  data_emissao?: string;
  modelo?: number;
  serie?: number;
  numero?: number;
  tipo_emissao?: number;
  valor_total?: number;
  chave?: string;
  autorizacao?: DfeAutorizacao;
}

export interface DfeEvento {
  id?: string;
  ambiente?: Ambiente;
  status?: StatusEventoDfe;
  autor?: DfeAutorEvento;
  chave_acesso?: string;
  data_evento?: string;
  numero_sequencial?: number;
  data_recebimento?: string;
  codigo_status?: number;
  motivo_status?: string;
  numero_protocolo?: string;
  codigo_mensagem?: number;
  mensagem?: string;
  tipo_evento?: string;
}

export interface DfeSefazStatus {
  autorizador?: EstadosAutorizadorDfe;
  ambiente?: Ambiente;
  data_hora_consulta?: string;
  codigo_status?: number;
  motivo_status?: string;
  tempo_medio_resposta?: number;
  data_hora_retorno?: string;
}

export interface DfeSincronizacao {
  status?: StatusSincronizacaoDfe;
  codigo_status?: number;
  motivo_status?: string;
  data_recebimento?: string;
  chave?: string;
}

export interface DfeAutorizacao {
  digest_value?: string;
  id?: string;
  ambiente?: Ambiente;
  status?: StatusEventoDfe;
  autor?: DfeAutorEvento;
  chave_acesso?: string;
  data_evento?: string;
  numero_sequencial?: number;
  data_recebimento?: string;
  codigo_status?: number;
  motivo_status?: string;
  numero_protocolo?: string;
  codigo_mensagem?: number;
  mensagem?: string;
  tipo_evento?: string;
}

export interface DfeAutorEvento {
  cpf_cnpj?: string;
}

export interface DfeLoteListagem {
  '@count'?: number;
  data?: DfeLote[];
}

export interface DfeLote {
  id?: string;
  created_at?: string;
  status?: StatusDfeLote;
  ambiente?: Ambiente;
  referencia?: string;
  id_lote?: string;
  recibo?: DfeRecibo;
  documentos?: Dfe[];
}

export interface DfeRecibo {
  numero?: string;
  codigo_status?: number;
  motivo_status?: string;
  data_recebimento?: string;
  codigo_mensagem?: number;
  mensagem?: string;
}

export interface DfeCancelamento {
  justificativa?: string;
  id?: string;
  ambiente?: Ambiente;
  status?: StatusEventoDfe;
  autor?: DfeAutorEvento;
  chave_acesso?: string;
  data_evento?: string;
  numero_sequencial?: number;
  data_recebimento?: string;
  codigo_status?: number;
  motivo_status?: string;
  numero_protocolo?: string;
  codigo_mensagem?: number;
  mensagem?: string;
  tipo_evento?: string;
}

export interface DfePedidoInutilizacao {
  ambiente: Ambiente;
  cnpj: string;
  ano: number;
  serie: number;
  numero_inicial: number;
  numero_final: number;
  justificativa: string;
}

export interface DfeInutilizacao {
  cnpj?: string;
  ano?: number;
  modelo?: number;
  serie?: number;
  numero_inicial?: number;
  numero_final?: number;
  justificativa?: string;
  id?: string;
  ambiente?: Ambiente;
  status?: StatusEventoDfe;
  autor?: DfeAutorEvento;
  chave_acesso?: string;
  data_evento?: string;
  numero_sequencial?: number;
  data_recebimento?: string;
  codigo_status?: number;
  motivo_status?: string;
  numero_protocolo?: string;
  codigo_mensagem?: number;
  mensagem?: string;
  tipo_evento?: string;
}