export interface NfcePreviaQuery {
  logotipo?: boolean;
  nome_fantasia?: boolean;
  mensagem_rodape?: string;
  resumido?: boolean;
  qrcode_lateral?: boolean;
  largura?: number;
  margem?: string;
}

export interface NfceComandosEscPosImpressaoQuery {
  modelo?: number;
  colunas?: number;
  qrcode_lateral?: boolean;
}