import { Ambiente } from './common';

export type StatusNfe = 'pendente' | 'autorizado' | 'rejeitado' | 'denegado' | 'encerrado' | 'cancelado' | 'erro';
export type StatusEventoNfe = 'pendente' | 'registrado' | 'rejeitado' | 'erro';

export interface NFeConsultaResultado {
  id: string;
  ambiente: Ambiente;
  created_at: string;
  status: StatusNfe;
  referencia: string;
  data_emissao: string;
  modelo: number;
  serie: number;
  numero: number;
  tipo_emissao: number;
  valor_total: number;
  chave: string;
  autorizacao: {
    digest_value: string;
    id: string;
    ambiente: Ambiente;
    status: StatusEventoNfe;
    autor: {
      cpf_cnpj: string;
    };
    chave_acesso: string;
    data_evento: string;
    numero_sequencial: number;
    data_recebimento: string;
    codigo_status: number;
    motivo_status: string;
    numero_protocolo: number;
    codigo_mensagem: number;
    mensagem: string;
    tipo_evento: string;
  };
}

export interface NFeListagemParametros {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  ambiente: Ambiente;
  referencia?: string;
  chave?: string;
  serie?: string;
}

export interface NFeListagemResultado {
  '@count'?: number;
  data: Array<Omit<NFeConsultaResultado, 'numero' | 'serie'>>;
}

export type NFeListagemLotesParametros = Omit<NFeListagemParametros, 'chave' | 'serie'>;

export interface NFeListagemLotesResultado {
  '@count'?: number;
  data: Array<{
    id: string;
    created_at: string;
    status: 'pendente' | 'processado' | 'erro';
    ambiente: Ambiente;
    referencia: string;
    id_lote: string | null;
    recibo: {
      numero: string;
      codigo_status: number;
      motivo_status: string;
      data_recebimento: string;
      codigo_mensagem: number;
      mensagem: string;
    };
    documentos: NFeConsultaResultado[];
  }>
}

export type NFeConsultaLoteResultado = NFeListagemLotesResultado['data'][0];

export interface NFeInutilizarSequenciaParametros {
  ambiente: Ambiente;
  cnpj: string
  ano: number;
  serie: number;
  numero_inicial: number;
  numero_final: number;
  justificativa: string;
}

export interface NFeInutilizarSequenciaResultado {
  cnpj: string;
  ano: number;
  modelo: number;
  serie: number;
  numero_inicial: number;
  numero_final: number;
  justificativa: string;
  id: string;
  ambiente: Ambiente;
  status: StatusEventoNfe;
  autor: {
    cpf_cnpj: string;
  };
  chave_acesso: string;
  data_evento: string;
  numero_sequencial: number;
  data_recebimento: string | null;
  codigo_status: number;
  motivo_status: string;
  numero_protocolo: string;
  codigo_mensagem: number;
  mensagem: string;
  tipo_evento: string;
}

export interface NFeEmissaoLoteParametros {
  documentos: NFeEmissaoParametros;
  ambiente: Ambiente;
  referencia?: string;
  id_lote: string;
}

export interface NFeCancelamentoParametros {
  id: string;
  justificativa?: string;
}

/*
  Abaixo estão TODAS as interfaces utilizadas na emissão de NF-e,
  caso for adicionar algo que não tenha relação com EMISSÃO, adicione antes desse comentário

  Os campos estão divididos em diferentes interfaces, por conta de seu tamanho total.
  Para nomear uma interface nova na EMISSÃO, utilize o seguinte padrão:

    NFeTeste123: Nome do Pai
    impostos: Nome da Propriedade

    Nome da nova interface: NFeTeste123Impostos
*/
export interface NFeEmissaoParametros {
  ambiente: Ambiente;
  referencia?: string | null;
  infNFe: NFeEmissaoInfNFe;
  infNFeSupl?: NFeEmissaoInfNFeSupl;
}

export interface NFeEmissaoInfNFeSupl {
  qrCode?: string | null;
  urlChave?: string | null;
}

export interface NFeEmissaoInfNFe {
  versao: string | null;
  Id?: string | null;
  ide: NFeEmissaoInfNFeIde;
  emit: NFeEmissaoInfNFeEmit;
  avulsa: NFeEmissaoInfNFeAvulsa;
  dest?: NFeEmissaoInfNFeDest;
  retirada?: NFeEmissaoInfNFeRetirada;
  entrega?: NFeEmissaoInfNFeEntrega;
  autXML?: NFeEmissaoInfNFeAutXML[];
  det: NFeEmissaoInfNFeDet[];
  total: NFeEmissaoInfNFeTotal;
  transp: NFeEmissaoInfNFeTransp;
  cobr?: NFeEmissaoInfNFeCobr;
  pag: NFeEmissaoInfNFePag;
  infIntermed?: NFeEmissaoInfNFeInfIntermed;
  infAdic?: NFeEmissaoInfNFeInfAdic;
  exporta?: NFeEmissaoInfNFeExporta;
  compra?: NFeEmissaoInfNFeCompra;
  cana?: NFeEmissaoInfNFeCana;
  infRespTec?: NFeEmissaoInfNFeInfRespTec;
  infSolicNFF?: NFeEmissaoInfNFeInfSolicNFF;
  agropecuario?: NFeEmissaoInfNFeAgropecuario;
}

export interface NFeEmissaoInfNFeIde {
  cUF: number | null;
  cNF?: string | null;
  natOp: string | null;
  mod?: 55 | 65 | null;
  serie: number | null;
  nNF: number | null;
  dhEmi: string | null;
  dhSaiEnt?: string | null;
  tpNF?: 0 | 1 | null;
  idDest: 1 | 2 | 3 | null;
  cMunFG: string | null;
  cMunFGIBS?: string | null;
  tpImp: 0 | 1 | 2 | 3 | 4 | 5 | null;
  tpEmis: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | null;
  cDV?: number | null;
  tpAmb?: 1 | 2 | null;
  finNFe: 1 | 2 | 3 | 4 | 5 | 6 | null;
  tpNFDebito?: '01' | '02' | '03' | '04' | '05' | null;
  tpNFCredito?: string | null;
  indFinal: 0 | 1 | null;
  indPres: 0 | 1 | 2 | 3 | 4 | 5 | 9 | null;
  indIntermed?: number | null;
  procEmi: 0 | 1 | 2 | 3 | null;
  verProc: string | null;
  dhCont?: string | null;
  xJust?: string | null;
  NFref?: NFeEmissaoInfNFeIdeNFRef[];
  gCompraGov?: NFeEmissaoInfNFeIdeGCompraGov;
  gPagAntecipado?: NFeEmissaoInfNFeIdeGPagAntecipado;
}

export interface NFeEmissaoInfNFeIdeNFRef {
  refNFe?: string | null;
  refNFeSig?: string | null;
  refNF?: NFeEmissaoInfNFeIdeNFRefRefNF;
  refNFP?: NFeEmissaoInfNFeIdeNFRefRefNFP;
  refCTe?: string | null;
  refECF?: NFeEmissaoInfNFeIdeNFRefRefECF;
}

export interface NFeEmissaoInfNFeIdeNFRefRefNF {
  cUF: number | null;
  AAMM: string | null;
  CNPJ: string | null;
  mod: string | null;
  serie: number | null;
  nNF: number | null;
}

export interface NFeEmissaoInfNFeIdeNFRefRefNFP {
  cUF: number | null;
  AAMM: string | null;
  CNPJ?: string | null;
  CPF?: string | null;
  mod: string | null;
  serie: number | null;
  nNF: number | null;
}

export interface NFeEmissaoInfNFeIdeNFRefRefECF {
  mod: string | null;
  nECF: number | null;
  nCOO: number | null;
}

export interface NFeEmissaoInfNFeIdeGCompraGov {
  tpEnteGov: 1 | 2 | 3 | 4 | null;
  pRedutor: number | null;
  tpOperGov: 1 | 2 | null;
}

export interface NFeEmissaoInfNFeIdeGPagAntecipado {
  refNFe: string[];
}

export interface NFeEmissaoInfNFeEmit {
  CNPJ?: string | null;
  CPF?: string | null;
  xNome?: string | null;
  xFant?: string | null;
  enderEmit?: NFeEmissaoInfNFeEmitEnderEmit;
  IE?: string | null;
  IEST?: string | null;
  IM?: string | null;
  CNAE?: string | null;
  CRT?: 1 | 2 | 3 | 4 | null;
}

export interface NFeEmissaoInfNFeEmitEnderEmit {
  xLgr?: string | null;
  nro?: string | null;
  xCpl?: string | null;
  xBairro?: string | null;
  cMun?: string | null;
  xMun?: string | null;
  UF?: string | null;
  CEP?: string | null;
  cPais?: string | null;
  xPais?: string | null;
  fone?: string | null;
}

export interface NFeEmissaoInfNFeAvulsa {
  CNPJ: string | null;
  xOrgao: string | null;
  matr: string | null;
  xAgente: string | null;
  fone?: string | null;
  UF: string | null;
  nDAR?: string | null;
  dEmi?: string | null;
  vDAR?: number | null;
  repEmi: string | null;
  dPag?: string | null;
}

export interface NFeEmissaoInfNFeDest {
  CNPJ?: string | null;
  CPF?: string | null;
  idEstrangeiro?: string | null;
  xNome?: string | null;
  enderDest?: NFeEmissaoInfNFeDestEnderDest;
  indIEDest?: 1 | 2 | 9 | null;
  IE?: string | null;
  ISUF?: string | null;
  IM?: string | null;
  email?: string | null;
}

export interface NFeEmissaoInfNFeDestEnderDest {
  xLrg: string | null;
  nro: string | null;
  xCPl?: string | null;
  xBairro: string | null;
  cMun: string | null;
  xMun: string | null;
  UF: string | null;
  cPais?: string | null;
  xPais?: string | null;
  fone?: string | null;
}

export interface NFeEmissaoInfNFeRetirada {
  CNPJ?: string | null;
  CPF?: string | null;
  xNome?: string | null;
  xLgr: string | null;
  nro: string | null;
  xCpl?: string | null;
  xBairro: string | null;
  cMun: string | null;
  xMun: string | null;
  UF: string | null;
  CEP?: string | null;
  cPais?: string | null;
  xPais?: string | null;
  fone?: string | null;
  email?: string | null;
  IE?: string | null;
}

export interface NFeEmissaoInfNFeEntrega {
  CNPJ?: string | null;
  CPF?: string | null;
  xNome?: string | null;
  xLgr: string | null;
  nro: string | null;
  xCpl?: string | null;
  xBairro: string | null;
  cMun: string | null;
  xMun: string | null;
  UF: string | null;
  CEP?: string | null;
  cPais?: string | null;
  xPais?: string | null;
  fone?: string | null;
  email?: string | null;
  IE?: string | null;
}

export interface NFeEmissaoInfNFeAutXML {
  CNPJ?: string | null;
  CPF?: string | null;
}

export interface NFeEmissaoInfNFeDet {
  nItem: number | null;
  prod: NFeEmissaoInfNFeDetProd;
  imposto: NFeEmissaoInfNFeDetImposto;
  impostoDevol?: NFeEmissaoInfNFeDetImpostoDevol;
  infAdProd?: string | null;
  obsItem?: NFeEmissaoInfNFeDetObsItem;
  vItem?: number | null;
  DFeReferenciado?: NFeEmissaoInfNFeDetDFeReferenciado;
}

export interface NFeEmissaoInfNFeDetProd {
  cProd: string | null;
  cEAN: string | null;
  cBarra?: string | null;
  xProd: string | null;
  NCM: string | null;
  NVE?: string[];
  CEST?: string | null;
  indEscala?: string | null;
  CNPJFab?: string | null;
  cBenef?: string | null;
  gCred?: NFeEmissaoInfNFeDetProdGCred[];
  EXTIPI?: string | null;
  CFOP: string | null;
  uCom: string | null;
  qCom: number | null;
  vUnCom: number | null;
  vProd: number | null;
  cEANTrib: string | null;
  cBarraTrib?: string | null;
  uTrib: string | null;
  qTrib: number | null;
  vUnTrib: number | null;
  vFrete?: number | null;
  vSeg?: number | null;
  vDesc?: number | null;
  vOutro?: number | null;
  indTot: 0 | 1 | null;
  indBemMovelUsado?: number | null;
  DI?: NFeEmissaoInfNFeDetProdDI[];
  detExport?: NFeEmissaoInfNFeDetProdDetExport[];
  xPed?: string | null;
  nItemPed?: number | null;
  nFCI?: string | null;
  rastro?: NFeEmissaoInfNFeDetProdRastro[];
  infProdNFF?: NFeEmissaoInfNFeDetProdInfProdNFF;
  infProdEmb?: NFeEmissaoInfNFeDetProdInfProdEmb;
  veicProd?: NFeEmissaoInfNFeDetProdVeicProd;
  med?: NFeEmissaoInfNFeDetProdMed;
  arma?: NFeEmissaoInfNFeDetProdArma[];
  comb?: NFeEmissaoInfNFeDetProdComb;
  nRECOPI?: string | null;
}

export interface NFeEmissaoInfNFeDetProdGCred {
  cCredPresumido: string | null;
  pCredPresumido: number | null;
  vCredPresumido: number | null;
}

export interface NFeEmissaoInfNFeDetProdDI {
  nDI: string | null;
  dDI: string | null;
  xLocDesemb: string | null;
  UFDesemb: string | null;
  dDesemb: string | null;
  tpViaTransp: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | null;
  vAFRMM?: number | null;
  tpIntermedio: 1 | 2 | 3 | null;
  CNPJ?: string | null;
  CPF?: string | null;
  UFTerceiro?: string | null;
  cExportador: string | null;
  adi: NFeEmissaoInfNFeDetProdDIAdi[];
}

export interface NFeEmissaoInfNFeDetProdDIAdi {
  nAdicao?: number | null;
  nSeqAdic: number | null;
  cFabricante: string | null;
  vDescDI: number | null;
  nDraw: string | null;
}

export interface NFeEmissaoInfNFeDetProdDetExport {
  nDraw?: string | null;
  exportInd?: NFeEmissaoInfNFeDetProdDetExportExportInd;
}

export interface NFeEmissaoInfNFeDetProdDetExportExportInd {
  nRE: string | null;
  chNFe: string | null;
  qExport: string | null;
}

export interface NFeEmissaoInfNFeDetProdRastro {
  nLote: string | null;
  qLote: number | null;
  dFab: string | null;
  dVal: string | null;
  cAgreg?: string | null;
}

export interface NFeEmissaoInfNFeDetProdInfProdNFF {
  cProdFisco: string | null;
  cOperNFF: string | null;
}

export interface NFeEmissaoInfNFeDetProdInfProdEmb {
  xEmb: string | null;
  qVolEmb: number | null;
  uEmb: string | null;
}

export interface NFeEmissaoInfNFeDetProdVeicProd {
  tpOp: number | null;
  chassi: string | null;
  cCor: string | null;
  xCor: string | null;
  pot: string | null;
  cilin: string | null;
  pesoL: string | null;
  pesoB: string | null;
  nSerie: string | null;
  tpComb: '02' | '03' | '16' | '17' | '18' | null;
  nMotor: string | null;
  CMT: string | null;
  dist: string | null;
  anoMod: number | null;
  anoFab: number | null;
  tpPint: string | null;
  tpVeic: number | null;
  espVeic: number | null;
  VIN: 'R' | 'N' | null;
  condVeic: 1 | 2 | 3 | null;
  cMod: string | null;
  cCorDenatran: '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | null;
  lota: number | null;
  tpRest: 0 | 1 | 2 | 3 | 4 | 9 | null;
}

export interface NFeEmissaoInfNFeDetProdMed {
  cProdANVISA: string | null;
  xMotivoIsencao: string | null;
  vPMC: number | null;
}

export interface NFeEmissaoInfNFeDetProdArma {
  tpArma: 0 | 1 | null;
  nSerie: string | null;
  nCano: string | null;
  descr: string | null;
}

export interface NFeEmissaoInfNFeDetProdComb {
  cProdANP: number | null;
  descANP: string | null;
  pGLP?: number | null;
  pGNn?: number | null;
  pGNi?: number | null;
  vPart?: number | null;
  CODIF?: string | null;
  qTemp?: number | null;
  UFCons: string | null;
  CIDE?: NFeEmissaoInfNFeDetProdCombCIDE;
  encerrante?: NFeEmissaoInfNFeDetProdCombEncerrante;
  pBio?: number | null;
  origComb?: NFeEmissaoInfNFeDetProdCombOrigComb[];
}

export interface NFeEmissaoInfNFeDetProdCombCIDE {
  qBCProd: number | null;
  vAliqProd: number | null;
  vCIDE: number | null;
}

export interface NFeEmissaoInfNFeDetProdCombEncerrante {
  nBico: number | null;
  nBomba?: number | null;
  nTanque: number | null;
  vEncIni: number | null;
  vEncFin: number | null;
}

export interface NFeEmissaoInfNFeDetProdCombOrigComb {
  indImport: 0 | 1 | null;
  cUFOrig: number;
  pOrig: number;
}

export interface NFeEmissaoInfNFeDetImposto {
  vTotTrib?: number | null;
  ICMS?: NFeEmissaoInfNFeDetImpostoICMS;
  IPI?: NFeEmissaoInfNFeDetImpostoIPI;
  II?: NFeEmissaoInfNFeDetImpostoII;
  ISSQN?: NFeEmissaoInfNFeDetImpostoISSQN;
  PIS?: NFeEmissaoInfNFeDetImpostoPIS;
  PISST?: NFeEmissaoInfNFeDetImpostoPISST;
  COFINS?: NFeEmissaoInfNFeDetImpostoCOFINS;
  COFINSST?: NFeEmissaoInfNFeDetImpostoCOFINSST;
  ICMSUFDest?: NFeEmissaoInfNFeDetImpostoICMSUFDest;
  IS?: NFeEmissaoInfNFeDetImpostoIS;
  IBSCBS?: NFeEmissaoInfNFeDetImpostoIBSCBS;
}

export interface NFeEmissaoInfNFeDetImpostoICMS {
  ICMS00?: NFeEmissaoInfNFeDetImpostoICMS00;
  ICMS02?: NFeEmissaoInfNFeDetImpostoICMS02;
  ICMS10?: NFeEmissaoInfNFeDetImpostoICMS10;
  ICMS15?: NFeEmissaoInfNFeDetImpostoICMS15;
  ICMS20?: NFeEmissaoInfNFeDetImpostoICMS20;
  ICMS30?: NFeEmissaoInfNFeDetImpostoICMS30;
  ICMS40?: NFeEmissaoInfNFeDetImpostoICMS40;
  ICMS51?: NFeEmissaoInfNFeDetImpostoICMS51;
  ICMS53?: NFeEmissaoInfNFeDetImpostoICMS53;
  ICMS60?: NFeEmissaoInfNFeDetImpostoICMS60;
  ICMS61?: NFeEmissaoInfNFeDetImpostoICMS61;
  ICMS70?: NFeEmissaoInfNFeDetImpostoICMS70;
  ICMS90?: NFeEmissaoInfNFeDetImpostoICMS90;
  ICMSPart?: NFeEmissaoInfNFeDetImpostoICMSPart;
  ICMSST?: NFeEmissaoInfNFeDetImpostoICMSST;
  ICMSSN101?: NFeEmissaoInfNFeDetImpostoICMSSN101;
  ICMSSN102?: NFeEmissaoInfNFeDetImpostoICMSSN102;
  ICMSSN201?: NFeEmissaoInfNFeDetImpostoICMSSN201;
  ICMSSN202?: NFeEmissaoInfNFeDetImpostoICMSSN202;
  ICMSSN500?: NFeEmissaoInfNFeDetImpostoICMSSN500;
  ICMSSN900?: NFeEmissaoInfNFeDetImpostoICMSSN900;
}

export interface NFeEmissaoInfNFeDetImpostoICMS00 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '00' | null;
  modBC: 0 | 1 | 2 | 3 | null;
  vBC: number | null;
  pICMS: number | null;
  vICMS: number | null;
  pFCP?: number | null;
  vFCP?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS02 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '02' | null;
  qBCMono?: number | null;
  adRemICMS: number | null;
  vICMSMono: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS10 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '10' | null;
  modBC: 0 | 1 | 2 | 3 | null;
  vBC: number | null;
  pICMS: number | null;
  vICMS: number | null;
  vBCFCP?: number | null;
  pFCP?: number | null;
  modBCST?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST: number | null;
  pICMSST: number | null;
  vICMSST: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  vICMSSTDeson?: number | null;
  motDesICMSST?: 9 | 12 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS15 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '15';
  qBCMono?: number | null;
  adRemICMS: number | null;
  vICMSMono: number | null;
  qBCMonoReten?: number | null;
  adRemICMSReten: number | null;
  vICMSMonoReten: number | null;
  pRedAdRem?: number | null;
  motRedAdRem?: 1 | 9 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS20 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '20' | null;
  modBC: 0 | 1 | 2 | 3 | null;
  pRedBC: number | null;
  vBC: number | null;
  pICMS: number | null;
  vICMS: number | null;
  vBCFCP?: number | null;
  pFCP?: number | null;
  vFCP?: number | null;
  vICMSDeson?: number | null;
  motDesICMS?: 9 | 12 | null;
  indDeduzDeson?: 0 | 1 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS30 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '30' | null;
  modBCST: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST: number | null;
  pICMSST: number | null;
  vICMSST: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  vICMSDeson?: number | null;
  motDesICMS?: 7 | 9 | null;
  indDeduzDeson?: 0 | 1 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS40 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '40' | null;
  vICMSDeson?: number | null;
  motDesICMS?: 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 16 | 90 | null;
  indDeduzDeson?: 0 | 1 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS51 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '51' | null;
  modBC?: 0 | 1 | 2 | 3 | null;
  pRedBC?: number | null;
  cBenefRBC?: string | null;
  vBC?: number | null;
  pICMS?: number | null;
  vICMSOp?: number | null;
  pDif?: number | null;
  vICMSDif?: number | null;
  vICMS?: number | null;
  vBCFCP?: number | null;
  pFCP?: number | null;
  vFCP?: number | null;
  pFCPDif?: number | null;
  vFCPDif?: number | null;
  vFCPEfet?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS53 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '53' | null;
  qBCMono?: number | null;
  adRemICMS?: number | null;
  vICMSMonoOp?: number | null;
  pDif?: number | null;
  vICMSMonoDif?: number | null;
  vICMSMono?: number | null;
  qBCMonoDif?: number | null;
  adRemICMSDif?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS60 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '60' | null;
  vBCSTRet?: number | null;
  pST?: number | null;
  vICMSSubstituto?: number | null;
  vICMSSTRet?: number | null;
  vBCFCPSTRet?: number | null;
  pFCPSTRet?: number | null;
  vFCPSTRet?: number | null;
  pRedBCEfet?: number | null;
  vBCEfet?: number | null;
  pICMSEfet?: number | null;
  vICMSEfet?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS61 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '61' | null;
  qBCMonoRet?: number | null;
  adRemICMSRet: number | null;
  vICMSMonoRet: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS70 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '70' | null;
  modBC: 0 | 1 | 2 | 3 | null;
  pRedBC: number | null;
  vBC: number | null;
  pICMS: number | null;
  vICMS: number | null;
  vBCFCP?: number | null;
  pFCP?: number | null;
  vFCP?: number | null;
  modBCST?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST: number | null;
  pICMSST: number | null;
  vICMSST: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  vICMSDeson?: number | null;
  motDesICMS?: 9 | 12 | null;
  indDeduzDeson?: 0 | 1 | null;
  vICMSSTDeson?: number | null;
  motDesICMSST?: 9 | 12 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMS90 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '90' | null;
  modBC?: 0 | 1 | 2 | 3 | null;
  vBC?: number | null;
  pRedBC?: number | null;
  pICMS?: number | null;
  vICMS?: number | null;
  vBCFCP?: number | null;
  pFCP?: number | null;
  vFCP?: number | null;
  modBCST?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST?: number | null;
  pICMSST?: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  vICMSDeson?: number | null;
  motDesICMS?: 9 | 12 | null;
  indDeduzDeson?: 0 | 1 | null;
  vICMSSTDeson?: number | null;
  motDesICMSST?: 9 | 12 | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSPart {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '10' | '90' | null;
  modBC: 0 | 1 | 2 | 3 | null;
  vBC: number | null;
  pRedBC?: number | null;
  pICMS: number | null;
  vICMS: number | null;
  modBCST: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  vBCST?: number | null;
  pRedBCST: number | null;
  pICMSST: number | null;
  vICMSST: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  pBCOp: number | null;
  UFST: string | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSST {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CST: '41' | '60' | null;
  vBCSTRet: number | null;
  pST?: number | null;
  vICMSSubstituto?: number | null;
  vICMSSTRet: number | null;
  vBCFCPSTRet?: number | null;
  pFCPSTRet?: number | null;
  vFCPSTRet?: number | null;
  vBCSTDest: number | null;
  vICMSSTDest: number | null;
  pRedBCEfet?: number | null;
  vBCEfet?: number | null;
  pICMSEfet?: number | null;
  vICMSEfet?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSSN101 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CSOSN: '101' | null;
  pCredSN: number | null;
  vCredICMSSN: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSSN102 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CSOSN: '102' | '103' | '300' | '400' | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSSN201 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CSOSN: '201' | null;
  modBCST: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST: number | null;
  pICMSST: number | null;
  vICMSST: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  pCredSN: number | null;
  vCredICMSSN: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSSN202 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CSOSN: '202' | '203' | null;
  modBCST: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST: number | null;
  pICMSST: number | null;
  vICMSST: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSSN500 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CSOSN: '500' | null;
  vBCSTRet?: number | null;
  pST?: number | null;
  vICMSSubstituto?: number | null;
  vICMSSTRet?: number | null;
  vBCFCPSTRet?: number | null;
  pFCPSTRet?: number | null;
  vFCPSTRet?: number | null;
  pRedBCEfet?: number | null;
  vBCEfet?: number | null;
  pICMSEfet?: number | null;
  vICMSEfet?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSSN900 {
  orig: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  CSOSN: '900' | null;
  modBC: 0 | 1 | 2 | 3 | null;
  vBC?: number | null;
  pRedBC?: number | null;
  pICMS?: number | null;
  vICMS?: number | null;
  modBCST?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
  pMVAST?: number | null;
  pRedBCST?: number | null;
  vBCST?: number | null;
  pICMSST?: number | null;
  vICMSST?: number | null;
  vBCFCPST?: number | null;
  pFCPST?: number | null;
  vFCPST?: number | null;
  pCredSN?: number | null;
  vCredICMSSN?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIPI {
  CNPJProd?: string | null;
  cSelo?: string | null;
  qSelo?: string | null;
  cEnq: string | null;
  IPITrib?: NFeEmissaoInfNFeDetImpostoIPIIPITrib;
  IPINT?: NFeEmissaoInfNFeDetImpostoIPIIPINT;
}

export interface NFeEmissaoInfNFeDetImpostoIPIIPITrib {
  CST: '00' | '49' | '50' | '99';
  vBC?: number | null;
  pIPI?: number | null;
  qUnid?: number | null;
  vUnid?: number | null;
  vIPI: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIPIIPINT {
  CST: '01' | '02' | '03' | '04' | '05' | '51' | '52' | '53' | '54' | '55';
}

export interface NFeEmissaoInfNFeDetImpostoII {
  vBC: number | null;
  vDespAdu: number | null;
  vII: number | null;
  vIOF: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoISSQN {
  vBC: number | null;
  vAliq: number | null;
  vISSQN: number | null;
  cMunFG: string | null;
  cListServ: string | null;
  vDeducao?: number | null;
  vOutro?: number | null;
  vDescIncond?: number | null;
  vDescCond?: number | null;
  vISSRet?: number | null;
  indISS: 2 | 3 | 4 | 5 | 6 | 7 | null;
  cServico?: string | null;
  cMun?: string | null;
  cPais?: string | null;
  nProcesso?: string | null;
  indIncentivo: 2 | null;
}

export interface NFeEmissaoInfNFeDetImpostoPIS {
  PISAliq?: NFeEmissaoInfNFeDetImpostoPISPISAliq;
  PISQtde?: NFeEmissaoInfNFeDetImpostoPISPISQtde;
  PISNT?: NFeEmissaoInfNFeDetImpostoPISPISNT;
  PISOutr?: NFeEmissaoInfNFeDetImpostoPISPISOutr;
}

export interface NFeEmissaoInfNFeDetImpostoPISPISAliq {
  CST: '01' | '02' | null;
  vBC: number;
  pPIS: number;
  vPIS: number;
}

export interface NFeEmissaoInfNFeDetImpostoPISPISQtde {
  CST: '03' | null;
  qBCProd: number | null;
  vAliqProd: number | null;
  vPIS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoPISPISNT {
  CST: '04' | '05' | '06' | '07' | '08' | '09';
}

export interface NFeEmissaoInfNFeDetImpostoPISPISOutr {
  CST: '99' | null;
  vBC?: number | null;
  pPIS?: number | null;
  qBCProd?: number | null;
  vAliqProd?: number | null;
  vPIS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoPISST {
  vBC?: number | null;
  pPIS?: number | null;
  qBCProd?: number | null;
  vAliqProd?: number | null;
  vPIS: number | null;
  indSomaPISST?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoCOFINS {
  COFINSAliq?: NFeEmissaoInfNFeDetImpostoCOFINSCOFINSAliq;
  COFINSQtde?: NFeEmissaoInfNFeDetImpostoCOFINSCOFINSQtde;
  COFINSNT?: NFeEmissaoInfNFeDetImpostoCOFINSCOFINSNT;
  COFINSOutr?: NFeEmissaoInfNFeDetImpostoCOFINSCOFINSOutr;
}

export interface NFeEmissaoInfNFeDetImpostoCOFINSCOFINSAliq {
  CST: '01' | '02' | null;
  vBC: number | null;
  pCOFINS: number | null;
  vCOFINS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoCOFINSCOFINSQtde {
  CST: '03' | null;
  qBCProd: number | null;
  vAliqProd: number | null;
  vCOFINS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoCOFINSCOFINSNT {
  CST: '04' | '05' | '06' | '07' | '08' | '09' | null;
}

export interface NFeEmissaoInfNFeDetImpostoCOFINSCOFINSOutr {
  CST: '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '70' | '71' | '72' | '73' | '74' | '75' | '98' | '99';
  vBC?: number | null;
  pCOFINS?: number | null;
  qBCProd?: number | null;
  vAliqProd?: number | null;
  vCOFINS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoCOFINSST {
  vBC?: number | null;
  pCOFINS?: number | null;
  qBCProd?: number | null;
  vAliqProd?: number | null;
  vCOFINS: number | null;
  indSomaCOFINSST?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoICMSUFDest {
  vBCUFDest: number | null;
  vBCFCPUFDest?: number | null;
  pFCPUFDest?: number | null;
  pICMSUFDest: number | null;
  pICMSInter: 4 | 7 | 12 | null;
  pICMSInterPart: 40 | 60 | 80 | 100 | null;
  vFCPUFDest?: number | null;
  vICMSUFDest: number | null;
  vICMSUFRemet: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIS {
  CSTIS: string | null;
  cClassTribIS?: string | null;
  vBCIS?: number | null;
  pIS?: number | null;
  pISEspec?: number | null;
  uTrib?: number | null;
  qTrib?: number | null;
  vIS?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBS {
  CST: string | null;
  cClassTrib?: string | null;
  gIBSCBS?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBS;
  gIBSCBSMono?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMono;
  gTransfCred?: NFeEmissaoInfNFeDetImpostoIBSCBSGTransfCred;
  gCredPresIBSZFM?: NFeEmissaoInfNFeDetImpostoIBSCBSGTransfCredPresIBSZFM
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBS {
  vBC: number;
  gIBSUF: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUF;
  gIBSMun: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMun;
  vIBS: number | null;
  gCBS: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBS;
  gTribRegular?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGTribRegular;
  gIBSCredPres?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSCredPres;
  gCBSCredPres?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSCredPres;
  gTribCompraGov?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGTribCompraGov;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUF {
  pIBSUF: number | null;
  gDif?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUFGDif;
  gDevTrib?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUFGDevTrib;
  gRed?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUFGRed;
  vIBSUF: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUFGDif {
  pDif: number | null;
  vDif: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUFGDevTrib {
  vDevTrib: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSUFGRed {
  pRedAliq: number | null;
  vRedAliq: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMun {
  pIBSMun: number | null;
  gDif?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMunGDif;
  gDevTrib?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMunGDevTrib;
  gRed?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMunGRed;
  vIBSMun: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMunGDif {
  pDif: number | null;
  vDif: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMunGDevTrib {
  vDevTrib: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSMunGRed {
  pRedAliq: number | null;
  vRedAliq: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBS {
  pCBS: number | null;
  gDif?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSGDif;
  gDevTrib?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSGDevTrib;
  gRed?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSGRed;
  vCBS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSGDif {
  pDif: number | null;
  vDif: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSGDevTrib {
  vDevTrib: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSGRed {
  pRedAliq: number | null;
  pAliqEfet: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGTribRegular {
  CSTReg: string | null;
  cClassTribReg: string | null;
  pAliqEfetRegIBSUF: number | null;
  vTribRegIBSUF: number | null;
  pAliqEfetRegIBSMun: number | null;
  vTribRegIBSMun: number | null;
  pAliqEfetRegCBS: number | null;
  vTribRegCBS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGIBSCredPres {
  cCredPres: string | null;
  pCredPres: number | null;
  vCredPres?: number | null;
  vCredPresCondSus?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGCBSCredPres {
  cCredPres: string | null;
  pCredPres: number | null;
  vCredPres?: number | null;
  vCredPresCondSus?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSGTribCompraGov {
  pAliqIBSUF?: number | null;
  vTribIBSUF: number | null;
  pAliqIBSMun?: number | null;
  vTribIBSMun: number | null;
  pAliqCBS?: number | null;
  vTribCBS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMono {
  gMonoPadrao?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoPadrao;
  gMonoReten?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoReten;
  gMonoRet?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoRet;
  gMonoDif?: NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoDif;
  vTotIBSMonoItem: number | null;
  vTotCBSMonoItem: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoPadrao {
  qBCMono: number | null;
  adRemIBS: number | null;
  adRemCBS: number | null;
  vIBSMono: number | null;
  vCBSMono: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoReten {
  qBCMonoReten: number | null;
  adRemIBSReten: number | null;
  vIBSMonoReten: number | null;
  adRemCBSReten: number | null;
  vCBSMonoReten: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoRet {
  qBCMonoRet: number | null;
  adRemIBSRet: number | null;
  vIBSMonoRet: number | null;
  adRemCBSRet: number | null;
  vCBSMonoRet: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGIBSCBSMonoGMonoDif {
  pDifIBS: number | null;
  vIBSMonoDif: number | null;
  pDifCBS: number | null;
  vCBSMonoDif: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGTransfCred {
  vIBS: number | null;
  vCBS: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoIBSCBSGTransfCredPresIBSZFM {
  tpCredPresIBSZFM: 0 | 1 | 2 | 3 | 4 | null;
  vCredPresIBSZFM?: number | null;
}

export interface NFeEmissaoInfNFeDetImpostoDevol {
  pDevol: number | null;
  IPI: NFeEmissaoInfNFeDetImpostoDevolIPI;
}

export interface NFeEmissaoInfNFeDetImpostoDevolIPI {
  pIPIDevol: number | null;
}

export interface NFeEmissaoInfNFeDetObsItem {
  obsCont?: NFeEmissaoInfNFeDetObsItemObsCont;
  obsFisco?: NFeEmissaoInfNFeDetObsItemObsFisco;
}

export interface NFeEmissaoInfNFeDetObsItemObsCont {
  xCampo?: string | null;
  xTexto?: string | null;
}

export interface NFeEmissaoInfNFeDetObsItemObsFisco {
  xCampo?: string | null;
  xTexto?: string | null;
}

export interface NFeEmissaoInfNFeDetDFeReferenciado {
  chaveAcesso: string | null;
  nItem?: number | null;
}

export interface NFeEmissaoInfNFeTotal {
  ICMSTot: NFeEmissaoInfNFeTotalICMSTot;
  ISSQNtot?: NFeEmissaoInfNFeTotalISSQNtot;
  retTrib?: NFeEmissaoInfNFeTotalRetTrib;
  ISTot?: NFeEmissaoInfNFeTotalISTot;
  IBSCBSTot?: NFeEmissaoInfNFeTotalIBSCBSTot;
  vNFTot?: number | null;
}

export interface NFeEmissaoInfNFeTotalICMSTot {
  vBC: number | null;
  vICMS: number | null;
  vICMSDeson: number | null;
  vFCPUFDest?: number | null;
  vICMSUFDest?: number | null;
  vICMSUFRemet?: number | null;
  vFCP: number | null;
  vBCST: number | null;
  vST: number | null;
  vFCPST: number | null;
  vFCPSTRet: number | null;
  qBCMono?: number | null;
  vICMSMono?: number | null;
  qBCMonoReten?: number | null;
  vICMSMonoReten?: number | null;
  qBCMonoRet?: number | null;
  vICMSMonoRet?: number | null;
  vProd: number | null;
  vFrete: number | null;
  vSeg: number | null;
  vDesc: number | null;
  vII: number | null;
  vIPI: number | null;
  vIPIDevol: number | null;
  vPIS: number | null;
  vCOFINS: number | null;
  vOutro: number | null;
  vNF: number | null;
  vTotTrib?: number | null;
}

export interface NFeEmissaoInfNFeTotalISSQNtot {
  vServ?: number | null;
  vBC?: number | null;
  vISS?: number | null;
  vPIS?: number | null;
  vCOFINS?: number | null;
  dCompet: string | null;
  vDeducao?: number | null;
  vOutro?: number | null;
  vDescIncond?: number | null;
  vDescCond?: number | null;
  vISSRet?: number | null;
  cRegTrib?: number | null;
}

export interface NFeEmissaoInfNFeTotalRetTrib {
  vRetPIS?: number | null;
  vRetCOFINS?: number | null;
  vRetCSLL?: number | null;
  vBCIRRF?: number | null;
  vIRRF?: number | null;
  vBCRetPrev?: number | null;
  vRetPrev?: number | null;
}

export interface NFeEmissaoInfNFeTotalISTot {
  vIS: number | null;
}

export interface NFeEmissaoInfNFeTotalIBSCBSTot {
  vBCIBSCBS: number | null;
  gIBS?: NFeEmissaoInfNFeTotalIBSCBSTotGIBS;
  gCBS?: NFeEmissaoInfNFeTotalIBSCBSTotGCBS;
  gMono?: NFeEmissaoInfNFeTotalIBSCBSTotGMono;
}

export interface NFeEmissaoInfNFeTotalIBSCBSTotGIBS {
  gIBSUF: NFeEmissaoInfNFeTotalIBSCBSTotGIBSGIBSUF;
  gIBSMun: NFeEmissaoInfNFeTotalIBSCBSTotGIBSGIBSMun;
  vIBS: number | null;
  vCredPres: number | null;
  vCredPresCondSus: number | null;
}

export interface NFeEmissaoInfNFeTotalIBSCBSTotGIBSGIBSUF {
  vDif: number | null;
  vDevTrib: number | null;
  vIBSUF: number | null;
}

export interface NFeEmissaoInfNFeTotalIBSCBSTotGIBSGIBSMun {
  vDif: number | null;
  vDevTrib: number | null;
  vIBSMun: number | null;
}

export interface NFeEmissaoInfNFeTotalIBSCBSTotGCBS {
  vDif: number | null;
  vDevTrib: number | null;
  vCBS: number | null;
  vCredPres: number | null;
  vCredPresCondSus: number | null;
}

export interface NFeEmissaoInfNFeTotalIBSCBSTotGMono {
  vIBSMono: number | null;
  vCBSMono: number | null;
  vIBSMonoReten: number | null;
  vCBSMonoReten: number | null;
  vIBSMonoRet: number | null;
  vCBSMonoRet: number | null;
}

export interface NFeEmissaoInfNFeTransp {
  modFrete: 0 | 1 | 2 | 3 | 4 | 9 | null;
  transporta?: NFeEmissaoInfNFeTranspTransporta;
  retTransp?: NFeEmissaoInfNFeTranspRetTransp;
  veicTransp?: NFeEmissaoInfNFeTranspVeicTransp;
  reboque?: NFeEmissaoInfNFeTranspVeicTransp[];
  vagao?: string | null;
  balsa?: string | null;
  vol?: NFeEmissaoInfNFeTranspVol[];
}

export interface NFeEmissaoInfNFeTranspTransporta {
  CNPJ?: string | null;
  CPF?: string | null;
  xNome?: string | null;
  IE?: string | null;
  xEnder?: string | null;
  xMun?: string | null;
  UF?: string | null;
}

export interface NFeEmissaoInfNFeTranspRetTransp {
  vServ: number | null;
  vBCRet: number | null;
  pICMSRet: number | null;
  vICMSRet: number | null;
  CFOP: string | null;
  cMunFG: string | null;
}

export interface NFeEmissaoInfNFeTranspVeicTransp {
  placa: string | null;
  UF?: string | null;
  RNTC?: string | null;
}

export interface NFeEmissaoInfNFeTranspVol {
  qVol?: number | null;
  esp?: string | null;
  marca?: string | null;
  nVol?: string | null;
  pesoL?: number | null;
  pesoB?: number | null;
  lacres?: NFeEmissaoInfNFeTranspVolLacre[];
}

export interface NFeEmissaoInfNFeTranspVolLacre {
  nLacre: string | null;
}

export interface NFeEmissaoInfNFeCobr {
  fat?: NFeEmissaoInfNFeCobrFat;
  dup?: NFeEmissaoInfNFeCobrDup[];
}

export interface NFeEmissaoInfNFeCobrFat {
  nFat?: string | null;
  vOrig?: number | null;
  vDesc?: number | null;
  vLiq?: number | null;
}

export interface NFeEmissaoInfNFeCobrDup {
  nDup?: string | null;
  dVenc?: string | null;
  vDup: number | null;
}

export interface NFeEmissaoInfNFePag {
  detPag: NFeEmissaoInfNFePagDetPag[];
  vTroco?: number | null;
}

export interface NFeEmissaoInfNFePagDetPag {
  indPag?: 1 | null;
  tPag: string | null;
  xPag?: string | null;
  dPag?: string | null;
  CNPJPag?: string | null;
  UFPag?: string | null;
  card?: NFeEmissaoInfNFePagDetPagCard;
}

export interface NFeEmissaoInfNFePagDetPagCard {
  tpIntegra: 1 | 2 | null;
  CNPJ?: string | null;
  tBand?: string | null;
  cAut?: string | null;
  CNPJReceb?: string | null;
  idTermPag?: string | null;
}

export interface NFeEmissaoInfNFeInfIntermed {
  CNPJ: string | null;
  idCadIntTran: string | null;
}

export interface NFeEmissaoInfNFeInfAdic {
  infAdFisco?: string | null;
  infCpl?: string | null;
  obsCont?: NFeEmissaoInfNFeInfAdicObsCont[];
  obsFisco?: NFeEmissaoInfNFeInfAdicObsFisco[];
  obsRet?: NFeEmissaoInfNFeInfAdicObsRet[];
}

export interface NFeEmissaoInfNFeInfAdicObsCont {
  xCampo?: string | null;
  xTexto?: string | null;
}

export interface NFeEmissaoInfNFeInfAdicObsFisco {
  xCampo?: string | null;
  xTexto?: string | null;
}

export interface NFeEmissaoInfNFeInfAdicObsRet {
  nProc: string | null;
  indProc: 0 | 1 | 2 | 3 | 4 | 9 | null;
  tpAto?: '08' | '10' | '12' | '14' | '15';
}

export interface NFeEmissaoInfNFeExporta {
  UFSaidaPais: string | null;
  xLocExporta: string | null;
  xLocDespacho?: string | null;
}

export interface NFeEmissaoInfNFeCompra {
  xNEmp?: string | null;
  xPed?: string | null;
  xCont?: string | null;
}

export interface NFeEmissaoInfNFeCana {
  safra: string | null;
  ref: string | null;
  forDia: NFeEmissaoInfNFeCanaForDia[];
  qTotMes: number | null;
  qTotAnt: number | null;
  qTotGer: number | null;
  deduc?: NFeEmissaoInfNFeCanaDeduc;
  vFor: number | null;
  vTotDed: number | null;
  vLiqFor: number | null;
}

export interface NFeEmissaoInfNFeCanaForDia {
  dia: number | null;
  qtde: number | null;
}

export interface NFeEmissaoInfNFeCanaDeduc {
  xDed: string | null;
  vDed: number | null;
}

export interface NFeEmissaoInfNFeInfRespTec {
  CNPJ: string | null;
  xContato: string | null;
  email: string | null;
  fone: string | null;
  idCSRT?: number | null;
  CSRT?: string | null;
  hashCSRT?: string | null;
}

export interface NFeEmissaoInfNFeInfSolicNFF {
  xSolic: string | null;
}

export interface NFeEmissaoInfNFeAgropecuario {
  defensivo?: NFeEmissaoInfNFeAgropecuarioDefensivo[];
  guiaTransito?: NFeEmissaoInfNFeAgropecuarioGuiaTransito;
}

export interface NFeEmissaoInfNFeAgropecuarioDefensivo {
  nReceituario: string | null;
  CPFRespTec: string | null;
}

export interface NFeEmissaoInfNFeAgropecuarioGuiaTransito {
  tpGuia: 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
  UFGuia?: string | null;
  serieGuia?: string | null;
  nGuia: string | null;
}