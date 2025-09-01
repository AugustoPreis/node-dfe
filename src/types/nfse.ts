import { Ambiente } from './common';

export type StatusNfse = 'processando' | 'autorizada' | 'negada' | 'cancelada' | 'substituida' | 'erro';
export type StatusCancelamentoNfse = 'pendente' | 'concluido' | 'rejeitado' | 'erro';
export type StatusNfseLote = 'novo' | 'fila_envio' | 'fila_consulta' | 'processado' | 'erro';

export interface ParametrosListagem {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  referencia?: string;
  chave?: string;
  serie?: string;
}

export interface ListagemResposta {
  '@count'?: number;
  data: Array<{
    id: string;
    created_at: string;
    status: StatusNfse;
    numero: string;
    codigo_verificacao: string;
    link_url: string;
    data_emissao: string | null;
    ambiente: Ambiente;
    referencia: string;
    DPS: {
      serie: string | null;
      nDPS: string | null;
    };
    cancelamento: {
      id: string;
      status: StatusCancelamentoNfse;
      codigo: string;
      motivo: string;
      data_hora: string | null;
      mensagens: Array<{
        codigo: string;
        descricao: string;
        correcao: string;
      }>;
    };
    mensagens: Array<{
      codigo: string;
      descricao: string;
      correcao: string;
    }>;
  }>;
}

export interface ParametrosListagemLotes {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  referencia?: string;
}

export interface ListagemLotesResposta {
  '@count'?: number;
  data: Array<{
    id: string;
    created_at: string;
    status: StatusNfseLote;
    numero: string;
    ambiente: Ambiente;
    referencia: string;
    notas: ListagemResposta['data'];
  }>;
}

export type ConsultaResposta = ListagemResposta['data'][0];
export type ConsultaLoteResposta = ListagemLotesResposta['data'][0];
export type ConsultaCancelamentoResposta = ConsultaResposta['cancelamento'];

export interface CidadesAtendidasResposta {
  codigo_ibge: string;
  uf: string;
  municipio: string;
  provedor: string;
  ambientes: Ambiente[];
  credenciais: Array<'certificado' | 'login_senha' | 'token'>;
}