import { Ambiente, Provedor } from './common';
import { Endereco, EnderecoSimples } from './endereco';

export type StatusNfse = 'processando' | 'autorizada' | 'negada' | 'cancelada' | 'substituida' | 'erro';
export type StatusEventoNfse = 'pendente' | 'concluido' | 'rejeitado' | 'erro';
export type StatusRpsLote = 'novo' | 'fila_envio' | 'fila_consulta' | 'processado' | 'erro';

export interface NfseListagemQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  referencia?: string;
  chave?: string;
  serie?: string;
}

export interface NfseListagemLotesQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  referencia?: string;
}

export interface Nfse {
  id?: string;
  created_at?: string;
  status?: StatusNfse;
  numero?: string;
  codigo_verificacao?: string;
  link_url?: string;
  data_emissao?: string;
  ambiente?: Ambiente;
  referencia?: string;
  DPS?: DPS;
  cancelamento?: NfseCancelamento;
  mensagens?: NfseMensagemRetorno[];
}

export interface NfseCancelamento {
  id?: string;
  status?: StatusEventoNfse;
  codigo?: string;
  motivo?: string;
  data_hora?: string;
  mensagens?: NfseMensagemRetorno[];
}

export interface NfseDpsPedidoEmissao {
  provedor?: Provedor;
  ambiente: Ambiente;
  referencia?: string;
  infDPS: InfDPS;
}

export interface NfseListagem {
  '@count'?: number;
  data?: Nfse[];
}

export interface NfseLoteDpsPedidoEmissao {
  provedor?: Provedor;
  ambiente: Ambiente;
  referencia?: string;
  documentos?: NfseDpsPedidoEmissao[];
}

export interface NfseMensagemRetorno {
  codigo?: string;
  descricao?: string;
  correcao?: string;
}

export interface NfsePedidoCancelamento {
  codigo?: string;
  motivo?: string;
}

export interface InfDPS {
  tpAmb?: number;
  dhEmi: string;
  verAplic?: string;
  dCompet?: string;
  subst?: Substituicao;
  prest: InfoPrestador;
  toma?: InfoTomador;
  interm?: InfoIntermediario;
  serv: Serv;
  valores: InfoValores;
}

export interface Serv {
  locPrest?: LocPrest;
  cServ: CServ;
  comExt?: ComExterior;
  lsadppu?: LocacaoSublocacao;
  obra?: InfoObra;
  atvEvento?: AtvEvento;
  explRod?: ExploracaoRodoviaria;
  infoCompl?: InfoCompl;
}

export interface AtvEvento {
  xNome?: string;
  desc?: string;
  dtIni: string;
  dtFim: string;
  idAtvEvt?: string;
  id?: string;
  end?: EnderecoSimples;
}

export interface Substituicao {
  chSubstda: string;
  cMotivo: string;
  xMotivo?: string;
}

export interface InfoPrestador {
  CNPJ?: string;
  CPF?: string;
  regTrib?: RegTrib;
}

export interface InfoTomador {
  orgaoPublico?: boolean;
  CNPJ?: string;
  CPF?: string;
  NIF?: string;
  cNaoNIF?: number;
  CAEPF?: string;
  IM?: string;
  IE?: string;
  xNome: string;
  end?: Endereco;
  fone?: string;
  email?: string;
}

export interface InfoValores {
  vServPrest: VServPrest;
  vDescCondIncond?: VDescCondIncond;
  vDedRed?: InfoDedRed;
  trib: InfoTributacao;
}

export interface RegTrib {
  regEspTrib?: number;
}

export interface BeneficioMunicipal {
  tpBM: number;
  nBM: string;
  vRedBCBM?: number;
  pRedBCBM?: number;
}

export interface CServ {
  cTribNac: string;
  cTribMun?: string;
  CNAE?: string;
  xDescServ: string;
  cNBS?: string;
  cNatOp?: string;
  cSitTrib?: string;
}

export interface ComExterior {
  mdPrestacao: number;
  vincPrest: number;
  tpMoeda: string;
  vServMoeda: number;
  mecAFComexP: string;
  mecAFComexT: string;
  movTempBens: number;
  nDI?: string;
  nRE?: string;
  mdic: number;
}

export interface DPS {
  serie?: string;
  nDPS?: string;
}

export interface DocDedRed {
  chNFSe?: string;
  chNFe?: string;
  NFSeMun?: DocOutNFSe;
  NFNFS?: DocNFNFS;
  nDocFisc?: string;
  nDoc?: string;
  tpDedRed: number;
  xDescOutDed?: string;
  dtEmiDoc: string;
  vDedutivelRedutivel: number;
  vDeducaoReducao: number;
  fornec?: InfoFornecDocDedRed;
}

export interface DocNFNFS {
  nNFS: number;
  modNFS: number;
  serieNFS: string;
}

export interface DocOutNFSe {
  cMunNFSeMun: string;
  nNFSeMun: number;
  cVerifNFSeMun: string;
}

export interface ExigSuspensa {
  tpSusp: number;
  nProcesso: string;
}

export interface ExploracaoRodoviaria {
  categVeic: string;
  nEixos: string;
  rodagem: number;
  sentido: string;
  placa: string;
  codAcessoPed: string;
  codContrato: string;
}

export interface InfoCompl {
  idDocTec?: string;
  docRef?: string;
  xInfComp?: string;
}

export interface InfoDedRed {
  pDR?: number;
  vDR?: number;
  documentos?: ListaDocDedRed;
}

export interface InfoFornecDocDedRed {
  CNPJ?: string;
  CPF?: string;
  NIF?: string;
  cNaoNIF?: number;
  CAEPF?: string;
  IM?: string;
  IE?: string;
  xNome: string;
  end?: Endereco;
  fone?: string;
  email?: string;
}

export interface InfoIntermediario {
  CNPJ?: string;
  CPF?: string;
  NIF?: string;
  cNaoNIF?: number;
  CAEPF?: string;
  IM?: string;
  IE?: string;
  xNome: string;
  end?: Endereco;
  fone?: string;
  email?: string;
}

export interface InfoObra {
  cObra?: string;
  inscImobFisc?: string;
  end?: EnderecoSimples;
}

export interface InfoTributacao {
  tribMun: TribMunicipal;
  tribFed?: TribFederal;
  totTrib?: TribTotal;
}

export interface ListaDocDedRed {
  docDedRed: DocDedRed[];
}

export interface LocPrest {
  cLocPrestacao?: string;
  cPaisPrestacao?: string;
}

export interface LocacaoSublocacao {
  categ: number;
  objeto: number;
  extensao: string;
  nPostes: string;
}

export interface TribFederal {
  piscofins?: TribOutrosPisCofins;
  vRetCP?: number;
  vRetIRRF?: number;
  vRetCSLL?: number;
}

export interface TribMunicipal {
  tribISSQN: number;
  cLocIncid?: string;
  cPaisResult?: string;
  BM?: BeneficioMunicipal;
  exigSusp?: ExigSuspensa;
  tpImunidade?: number;
  vBC?: number;
  pAliq?: number;
  vISSQN?: number;
  tpRetISSQN?: number;
  vLiq?: number;
}

export interface TribOutrosPisCofins {
  CST: string;
  vBCPisCofins?: number;
  pAliqPis?: number;
  pAliqCofins?: number;
  vPis?: number;
  vCofins?: number;
  tpRetPisCofins?: number;
}

export interface TribTotal {
  vTotTrib?: TribTotalMonet;
  pTotTrib?: TribTotalPercent;
  indTotTrib?: number;
  pTotTribSN?: number;
}

export interface TribTotalMonet {
  vTotTribFed: number;
  vTotTribEst: number;
  vTotTribMun: number;
}

export interface TribTotalPercent {
  pTotTribFed: number;
  pTotTribEst: number;
  pTotTribMun: number;
}

export interface VDescCondIncond {
  vDescIncond?: number;
  vDescCond?: number;
}

export interface VServPrest {
  vReceb?: number;
  vServ: number;
}

export interface RpsLote {
  id?: string;
  created_at?: string;
  status?: StatusRpsLote;
  numero?: string;
  ambiente?: Ambiente;
  referencia?: string;
  notas?: Nfse[];
}

export interface RpsLoteListagem {
  '@count'?: number;
  data?: RpsLote[];
}