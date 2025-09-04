import { Ambiente } from './common';
import { DfeAutorEvento, StatusEventoDfe } from './dfe';

export interface CteCartaCorrecao {
  correcoes: CteInfCorrecao[];
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

export interface CtePedidoCartaCorrecao {
  correcoes: CteInfCorrecao[];
}

export interface CteInfCorrecao {
  grupo_alterado: string;
  campo_alterado: string;
  valor_alterado: string;
  numero_item_alterado?: number;
}

export interface CtePedidoCancelamento {
  justificativa?: string;
}

export interface CtePedidoEmissao {
  infCte: CteSefazInfCte;
  infCTeSupl?: CteSefazInfCTeSupl;
  ambiente: Ambiente;
  referencia?: string;
}

export interface CteSefazAereo {
  nMinu?: number;
  nOCA?: string;
  dPrevAereo: string;
  natCarga: CteSefazNatCarga;
  tarifa: CteSefazTarifa;
  peri?: CteSefazPeri[];
}

export interface CteSefazAquav {
  vPrest: number;
  vAFRMM: number;
  xNavio: string;
  balsa?: CteSefazBalsa[];
  nViag?: string;
  direc: string;
  irin: string;
  detCont?: CteSefazDetCont[];
  tpNav?: number;
}

export interface CteSefazAutXML {
  CNPJ?: string;
  CPF?: string;
}

export interface CteSefazBalsa {
  xBalsa: string;
}

export interface CteSefazCIBS {
  vBC: number;
  gIBSUF: CteSefazGIBSUF;
  gIBSMun: CteSefazGIBSMun;
  vIBS: number;
  gCBS: CteSefazGCBS;
  gTribRegular?: CteSefazTribRegular;
  gIBSCredPres?: CteSefazCredPres;
  gCBSCredPres?: CteSefazCredPres;
  gTribCompraGov?: CteSefazTribCompraGov;
}

export interface CteSefazCobr {
  fat?: CteSefazFat;
  dup?: CteSefazDup[];
}

export interface CteSefazComData {
  tpPer: number;
  dProg: string;
}

export interface CteSefazComHora {
  tpHor: number;
  hProg: string;
}

export interface CteSefazComp {
  xNome: string;
  vComp: number;
}

export interface CteSefazCompl {
  xCaracAd?: string;
  xCaracSer?: string;
  xEmi?: string;
  fluxo?: CteSefazFluxo;
  Entrega?: CteSefazEntrega;
  origCalc?: string;
  destCalc?: string;
  xObs?: string;
  ObsCont?: CteSefazObsCont[];
  ObsFisco?: CteSefazObsFisco[];
}

export interface CteSefazCompraGovReduzido {
  tpEnteGov: number;
  pRedutor: number;
}

export interface CteSefazCredPres {
  cCredPres: string;
  pCredPres: number;
  vCredPres?: number;
  vCredPresCondSus?: number;
}

export interface CteSefazDest {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  fone?: string;
  ISUF?: string;
  enderDest: CteSefazEndereco;
  email?: string;
}

export interface CteSefazDetCont {
  nCont: string;
  lacre?: CteSefazLacre[];
  infDoc?: CteSefazDetCont_InfDoc;
}

export interface CteSefazDetCont_InfDoc {
  infNF?: CteSefazDetCont_InfDoc_InfNF[];
  infNFe?: CteSefazDetCont_InfDoc_InfNFe[];
}

export interface CteSefazDetCont_InfDoc_InfNF {
  serie: string;
  nDoc: string;
  unidRat?: number;
}

export interface CteSefazDetCont_InfDoc_InfNFe {
  chave: string;
  unidRat?: number;
}

export interface CteSefazDevTrib {
  vDevTrib: number;
}

export interface CteSefazDif {
  pDif: number;
  vDif: number;
}

export interface CteSefazDocAnt {
  emiDocAnt: CteSefazEmiDocAnt[];
}

export interface CteSefazDup {
  nDup?: string;
  dVenc?: string;
  vDup?: number;
}

export interface CteSefazDuto {
  vTar?: number;
  dIni: string;
  dFim: string;
  classDuto?: number;
  tpContratacao?: number;
  codPontoEntrada?: string;
  codPontoSaida?: string;
  nContrato?: string;
}

export interface CteSefazEmiDocAnt {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  UF?: string;
  xNome: string;
  idDocAnt: CteSefazIdDocAnt[];
}

export interface CteSefazEmiOcc {
  CNPJ: string;
  cInt?: string;
  IE: string;
  UF: string;
  fone?: string;
}

export interface CteSefazEmit {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  IEST?: string;
  xNome?: string;
  xFant?: string;
  enderEmit?: CteSefazEndeEmi;
  CRT?: number;
}

export interface CteSefazEndeEmi {
  xLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun?: string;
  xMun?: string;
  CEP?: string;
  UF?: string;
  fone?: string;
}

export interface CteSefazEnderFer {
  xLgr: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun: string;
  xMun: string;
  CEP: string;
  UF: string;
}

export interface CteSefazEndereco {
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  CEP?: string;
  UF: string;
  cPais?: string;
  xPais?: string;
}

export interface CteSefazEntrega {
  semData?: CteSefazSemData;
  comData?: CteSefazComData;
  noPeriodo?: CteSefazNoPeriodo;
  semHora?: CteSefazSemHora;
  comHora?: CteSefazComHora;
  noInter?: CteSefazNoInter;
}

export interface CteSefazExped {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  fone?: string;
  enderExped: CteSefazEndereco;
  email?: string;
}

export interface CteSefazFat {
  nFat?: string;
  vOrig?: number;
  vDesc?: number;
  vLiq?: number;
}

export interface CteSefazFerroEnv {
  CNPJ: string;
  cInt?: string;
  IE?: string;
  xNome: string;
  enderFerro: CteSefazEnderFer;
}

export interface CteSefazFerrov {
  tpTraf: number;
  trafMut?: CteSefazTrafMut;
  fluxo: string;
}

export interface CteSefazFluxo {
  xOrig?: string;
  pass?: CteSefazPass[];
  xDest?: string;
  xRota?: string;
}

export interface CteSefazGCBS {
  pCBS: number;
  gDif?: CteSefazDif;
  gDevTrib?: CteSefazDevTrib;
  gRed?: CteSefazRed;
  vCBS: number;
}

export interface CteSefazGIBSMun {
  pIBSMun: number;
  gDif?: CteSefazDif;
  gDevTrib?: CteSefazDevTrib;
  gRed?: CteSefazRed;
  vIBSMun: number;
}

export interface CteSefazGIBSUF {
  pIBSUF: number;
  gDif?: CteSefazDif;
  gDevTrib?: CteSefazDevTrib;
  gRed?: CteSefazRed;
  vIBSUF: number;
}

export interface CteSefazICMS00 {
  CST: string;
  vBC: number;
  pICMS: number;
  vICMS: number;
}

export interface CteSefazICMS20 {
  CST: string;
  pRedBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSefazICMS45 {
  CST: string;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSefazICMS60 {
  CST: string;
  vBCSTRet: number;
  vICMSSTRet: number;
  pICMSSTRet: number;
  vCred?: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSefazICMS90 {
  CST: string;
  pRedBC?: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vCred?: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSefazICMSOutraUF {
  CST: string;
  pRedBCOutraUF?: number;
  vBCOutraUF: number;
  pICMSOutraUF: number;
  vICMSOutraUF: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSefazICMSSN {
  CST: string;
  indSN: number;
}

export interface CteSefazICMSUFFim {
  vBCUFFim: number;
  pFCPUFFim: number;
  pICMSUFFim: number;
  pICMSInter: number;
  vFCPUFFim: number;
  vICMSUFFim: number;
  vICMSUFIni: number;
}

export interface CteSefazIdDocAnt {
  idDocAntPap?: CteSefazIdDocAntPap[];
  idDocAntEle?: CteSefazIdDocAntEle[];
}

export interface CteSefazIdDocAntEle {
  chCTe: string;
}

export interface CteSefazIdDocAntPap {
  tpDoc: string;
  serie: string;
  subser?: string;
  nDoc: string;
  dEmi: string;
}

export interface CteSefazIde {
  cUF: number;
  cCT?: string;
  CFOP: string;
  natOp: string;
  mod?: number;
  serie: number;
  nCT: number;
  dhEmi: string;
  tpImp: number;
  tpEmis: number;
  cDV?: number;
  tpAmb?: number;
  tpCTe: number;
  procEmi: number;
  verProc: string;
  indGlobalizado?: number;
  cMunEnv: string;
  xMunEnv: string;
  UFEnv: string;
  modal: string;
  tpServ: number;
  cMunIni: string;
  xMunIni: string;
  UFIni: string;
  cMunFim: string;
  xMunFim: string;
  UFFim: string;
  retira: number;
  xDetRetira?: string;
  indIEToma: number;
  toma3?: CteSefazToma3;
  toma4?: CteSefazToma4;
  dhCont?: string;
  xJust?: string;
  gCompraGov?: CteSefazCompraGovReduzido;
}

export interface CteSefazImp {
  ICMS00?: CteSefazICMS00;
  ICMS20?: CteSefazICMS20;
  ICMS45?: CteSefazICMS45;
  ICMS60?: CteSefazICMS60;
  ICMS90?: CteSefazICMS90;
  ICMSOutraUF?: CteSefazICMSOutraUF;
  ICMSSN?: CteSefazICMSSN;
}

export interface CteSefazInfCTeMultimodal {
  chCTeMultimodal: string;
}

export interface CteSefazInfCTeNorm {
  infCarga: CteSefazInfCarga;
  infDoc?: CteSefazInfDoc;
  docAnt?: CteSefazDocAnt;
  infModal: CteSefazInfModal;
  veicNovos?: CteSefazVeicNovos[];
  cobr?: CteSefazCobr;
  infCteSub?: CteSefazInfCteSub;
  infGlobalizado?: CteSefazInfGlobalizado;
  infServVinc?: CteSefazInfServVinc;
}

export interface CteSefazInfCTeSupl {
  qrCodCTe?: string;
}

export interface CteSefazInfCarga {
  vCarga?: number;
  proPred: string;
  xOutCat?: string;
  infQ: CteSefazInfQ[];
  vCargaAverb?: number;
}

export interface CteSefazInfCte {
  versao: string;
  Id?: string;
  ide: CteSefazIde;
  compl?: CteSefazCompl;
  emit: CteSefazEmit;
  rem?: CteSefazRem;
  exped?: CteSefazExped;
  receb?: CteSefazReceb;
  dest?: CteSefazDest;
  vPrest: CteSefazVPrest;
  imp: CteSefazInfCte_Imp;
  infCTeNorm?: CteSefazInfCTeNorm;
  infCteComp?: CteSefazInfCteComp[];
  autXML?: CteSefazAutXML[];
  infRespTec?: CteSefazRespTec;
  infSolicNFF?: CteSefazInfSolicNFF;
}

export interface CteSefazInfCteComp {
  chCTe: string;
}

export interface CteSefazInfCteSub {
  chCte: string;
  indAlteraToma?: number;
}

export interface CteSefazInfCte_Imp {
  ICMS: CteSefazImp;
  vTotTrib?: number;
  infAdFisco?: string;
  ICMSUFFim?: CteSefazICMSUFFim;
  IBSCBS?: CteSefazTribCTe;
  vTotDFe?: number;
}

export interface CteSefazInfDCe {
  chave: string;
}

export interface CteSefazInfDoc {
  infNF?: CteSefazInfNF[];
  infNFe?: CteSefazInfNFe[];
  infOutros?: CteSefazInfOutros[];
  infDCe?: CteSefazInfDCe[];
}

export interface CteSefazInfGlobalizado {
  xObs: string;
}

export interface CteSefazInfModal {
  versaoModal: string;
  rodo?: CteSefazRodo;
  aereo?: CteSefazAereo;
  ferrov?: CteSefazFerrov;
  aquav?: CteSefazAquav;
  duto?: CteSefazDuto;
  multimodal?: CteSefazMultimodal;
}

export interface CteSefazInfNF {
  nRoma?: string;
  nPed?: string;
  mod: string;
  serie: string;
  nDoc: string;
  dEmi: string;
  vBC: number;
  vICMS: number;
  vBCST: number;
  vST: number;
  vProd: number;
  vNF: number;
  nCFOP: string;
  nPeso?: number;
  PIN?: string;
  dPrev?: string;
  infUnidCarga?: CteSefazUnidCarga[];
  infUnidTransp?: CteSefazUnidadeTransp[];
}

export interface CteSefazInfNFe {
  chave: string;
  PIN?: string;
  dPrev?: string;
  infUnidCarga?: CteSefazUnidCarga[];
  infUnidTransp?: CteSefazUnidadeTransp[];
}

export interface CteSefazInfOutros {
  tpDoc: string;
  descOutros?: string;
  nDoc?: string;
  dEmi?: string;
  vDocFisc?: number;
  dPrev?: string;
  infUnidCarga?: CteSefazUnidCarga[];
  infUnidTransp?: CteSefazUnidadeTransp[];
}

export interface CteSefazInfQ {
  cUnid: string;
  tpMed: string;
  qCarga: number;
}

export interface CteSefazInfSeg {
  xSeg: string;
  CNPJ: string;
}

export interface CteSefazInfServVinc {
  infCTeMultimodal: CteSefazInfCTeMultimodal[];
}

export interface CteSefazInfSolicNFF {
  xSolic: string;
}

export interface CteSefazInfTotAP {
  qTotProd: number;
  uniAP: number;
}

export interface CteSefazLacUnidCarga {
  nLacre: string;
}

export interface CteSefazLacUnidTransp {
  nLacre: string;
}

export interface CteSefazLacre {
  nLacre: string;
}

export interface CteSefazMultimodal {
  COTM: string;
  indNegociavel: number;
  seg?: CteSefazSeg;
}

export interface CteSefazNatCarga {
  xDime?: string;
  cInfManu?: string[];
}

export interface CteSefazNoInter {
  tpHor: number;
  hIni: string;
  hFim: string;
}

export interface CteSefazNoPeriodo {
  tpPer: number;
  dIni: string;
  dFim: string;
}

export interface CteSefazObsCont {
  xCampo: string;
  xTexto: string;
}

export interface CteSefazObsFisco {
  xCampo: string;
  xTexto: string;
}

export interface CteSefazOcc {
  serie?: string;
  nOcc: number;
  dEmi: string;
  emiOcc?: CteSefazEmiOcc;
}

export interface CteSefazPass {
  xPass?: string;
}

export interface CteSefazPeri {
  nONU: string;
  qTotEmb: string;
  infTotAP: CteSefazInfTotAP;
}

export interface CteSefazReceb {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  fone?: string;
  enderReceb: CteSefazEndereco;
  email?: string;
}

export interface CteSefazRed {
  pRedAliq: number;
  pAliqEfet: number;
}

export interface CteSefazRem {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  xFant?: string;
  fone?: string;
  enderReme: CteSefazEndereco;
  email?: string;
}

export interface CteSefazRespTec {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: number;
  CSRT?: string;
  hashCSRT?: string;
}

export interface CteSefazRodo {
  RNTRC: string;
  occ?: CteSefazOcc[];
}

export interface CteSefazSeg {
  infSeg: CteSefazInfSeg;
  nApol: string;
  nAver: string;
}

export interface CteSefazSemData {
  tpPer: number;
}

export interface CteSefazSemHora {
  tpHor: number;
}

export interface CteSefazTarifa {
  CL: string;
  cTar?: string;
  vTar: number;
}

export interface CteSefazToma3 {
  toma: number;
}

export interface CteSefazToma4 {
  toma: number;
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  xFant?: string;
  fone?: string;
  enderToma: CteSefazEndereco;
  email?: string;
}

export interface CteSefazTrafMut {
  respFat: number;
  ferrEmi: number;
  vFrete: number;
  chCTeFerroOrigem?: string;
  ferroEnv?: CteSefazFerroEnv[];
}

export interface CteSefazTribCTe {
  CST: string;
  cClassTrib?: string;
  gIBSCBS?: CteSefazCIBS;
}

export interface CteSefazTribCompraGov {
  pAliqIBSUF?: number;
  vTribIBSUF: number;
  pAliqIBSMun?: number;
  vTribIBSMun: number;
  pAliqCBS?: number;
  vTribCBS: number;
}

export interface CteSefazTribRegular {
  CSTReg: string;
  cClassTribReg: string;
  pAliqEfetRegIBSUF: number;
  vTribRegIBSUF: number;
  pAliqEfetRegIBSMun: number;
  vTribRegIBSMun: number;
  pAliqEfetRegCBS: number;
  vTribRegCBS: number;
}

export interface CteSefazUnidCarga {
  tpUnidCarga: number;
  idUnidCarga: string;
  lacUnidCarga?: CteSefazLacUnidCarga[];
  qtdRat?: number;
}

export interface CteSefazUnidadeTransp {
  tpUnidTransp: number;
  idUnidTransp: string;
  lacUnidTransp?: CteSefazLacUnidTransp[];
  infUnidCarga?: CteSefazUnidCarga[];
  qtdRat?: number;
}

export interface CteSefazVPrest {
  vTPrest: number;
  vRec: number;
  Comp?: CteSefazComp[];
}

export interface CteSefazVeicNovos {
  chassi: string;
  cCor: string;
  xCor: string;
  cMod: string;
  vUnit: number;
  vFrete: number;
}

export interface CteSimpPedidoEmissao {
  infCte: CteSimpSefazInfCteSimp;
  infCTeSupl?: CteSimpSefazInfCTeSuplSimp;
  ambiente: Ambiente;
  referencia?: string;
}

export interface CteSimpSefazAereoSimp {
  nMinu?: number;
  nOCA?: string;
  dPrevAereo: string;
  natCarga: CteSimpSefazNatCargaSimp;
  tarifa: CteSimpSefazTarifaSimp;
  peri?: CteSimpSefazPeriSimp[];
}

export interface CteSimpSefazAquavSimp {
  vPrest: number;
  vAFRMM: number;
  xNavio: string;
  balsa?: CteSimpSefazBalsaSimp[];
  nViag?: string;
  direc: string;
  irin: string;
  detCont?: CteSimpSefazDetContSimp[];
  tpNav?: number;
}

export interface CteSimpSefazAutXMLSimp {
  CNPJ?: string;
  CPF?: string;
}

export interface CteSimpSefazBalsaSimp {
  xBalsa: string;
}

export interface CteSimpSefazCIBSSimp {
  vBC: number;
  gIBSUF: CteSimpSefazGIBSUFSimp;
  gIBSMun: CteSimpSefazGIBSMunSimp;
  vIBS: number;
  gCBS: CteSimpSefazGCBSSimp;
  gTribRegular?: CteSimpSefazTribRegularSimp;
  gIBSCredPres?: CteSimpSefazCredPresSimp;
  gCBSCredPres?: CteSimpSefazCredPresSimp;
  gTribCompraGov?: CteSimpSefazTribCompraGovSimp;
}

export interface CteSimpSefazCobrSimp {
  fat?: CteSimpSefazFatSimp;
  dup?: CteSimpSefazDupSimp[];
}

export interface CteSimpSefazCompSimp {
  xNome: string;
  vComp: number;
}

export interface CteSimpSefazComplSimp {
  xCaracAd?: string;
  xCaracSer?: string;
  fluxo?: CteSimpSefazFluxoSimp;
  xObs?: string;
  ObsCont?: CteSimpSefazObsContSimp[];
  ObsFisco?: CteSimpSefazObsFiscoSimp[];
}

export interface CteSimpSefazCompraGovReduzidoSimp {
  tpEnteGov: number;
  pRedutor: number;
}

export interface CteSimpSefazCredPresSimp {
  cCredPres: string;
  pCredPres: number;
  vCredPres?: number;
  vCredPresCondSus?: number;
}

export interface CteSimpSefazDetContSimp {
  nCont: string;
  lacre?: CteSimpSefazLacreSimp[];
  infDoc?: CteSimpSefazInfDocSimp;
}

export interface CteSimpSefazDetSimp {
  nItem: number;
  cMunIni: string;
  xMunIni: string;
  cMunFim: string;
  xMunFim: string;
  vPrest: number;
  vRec: number;
  Comp?: CteSimpSefazCompSimp[];
  infNFe?: CteSimpSefazInfNFeSimp[];
  infDocAnt?: CteSimpSefazInfDocAntSimp[];
}

export interface CteSimpSefazDevTribSimp {
  vDevTrib: number;
}

export interface CteSimpSefazDifSimp {
  pDif: number;
  vDif: number;
}

export interface CteSimpSefazDupSimp {
  nDup?: string;
  dVenc?: string;
  vDup?: number;
}

export interface CteSimpSefazDutoSimp {
  vTar?: number;
  dIni: string;
  dFim: string;
  classDuto?: number;
  tpContratacao?: number;
  codPontoEntrada?: string;
  codPontoSaida?: string;
  nContrato?: string;
}

export interface CteSimpSefazEmiOccSimp {
  CNPJ: string;
  cInt?: string;
  IE: string;
  UF: string;
  fone?: string;
}

export interface CteSimpSefazEmitSimp {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  IEST?: string;
  xNome?: string;
  xFant?: string;
  enderEmit?: CteSimpSefazEndeEmiSimp;
  CRT?: number;
}

export interface CteSimpSefazEndeEmiSimp {
  xLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun?: string;
  xMun?: string;
  CEP?: string;
  UF?: string;
  fone?: string;
}

export interface CteSimpSefazEnderFerSimp {
  xLgr: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun: string;
  xMun: string;
  CEP: string;
  UF: string;
}

export interface CteSimpSefazEnderecoSimp {
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  CEP?: string;
  UF: string;
  cPais?: string;
  xPais?: string;
}

export interface CteSimpSefazFatSimp {
  nFat?: string;
  vOrig?: number;
  vDesc?: number;
  vLiq?: number;
}

export interface CteSimpSefazFerroEnvSimp {
  CNPJ: string;
  cInt?: string;
  IE?: string;
  xNome: string;
  enderFerro: CteSimpSefazEnderFerSimp;
}

export interface CteSimpSefazFerrovSimp {
  tpTraf: number;
  trafMut?: CteSimpSefazTrafMutSimp;
  fluxo: string;
}

export interface CteSimpSefazFluxoSimp {
  xOrig?: string;
  pass?: CteSimpSefazPassSimp[];
  xDest?: string;
  xRota?: string;
}

export interface CteSimpSefazGCBSSimp {
  pCBS: number;
  gDif?: CteSimpSefazDifSimp;
  gDevTrib?: CteSimpSefazDevTribSimp;
  gRed?: CteSimpSefazRedSimp;
  vCBS: number;
}

export interface CteSimpSefazGIBSMunSimp {
  pIBSMun: number;
  gDif?: CteSimpSefazDifSimp;
  gDevTrib?: CteSimpSefazDevTribSimp;
  gRed?: CteSimpSefazRedSimp;
  vIBSMun: number;
}

export interface CteSimpSefazGIBSUFSimp {
  pIBSUF: number;
  gDif?: CteSimpSefazDifSimp;
  gDevTrib?: CteSimpSefazDevTribSimp;
  gRed?: CteSimpSefazRedSimp;
  vIBSUF: number;
}

export interface CteSimpSefazICMS00Simp {
  CST: string;
  vBC: number;
  pICMS: number;
  vICMS: number;
}

export interface CteSimpSefazICMS20Simp {
  CST: string;
  pRedBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSimpSefazICMS45Simp {
  CST: string;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSimpSefazICMS60Simp {
  CST: string;
  vBCSTRet: number;
  vICMSSTRet: number;
  pICMSSTRet: number;
  vCred?: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSimpSefazICMS90Simp {
  CST: string;
  pRedBC?: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vCred?: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSimpSefazICMSOutraUFSimp {
  CST: string;
  pRedBCOutraUF?: number;
  vBCOutraUF: number;
  pICMSOutraUF: number;
  vICMSOutraUF: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteSimpSefazICMSSNSimp {
  CST: string;
  indSN: number;
}

export interface CteSimpSefazICMSUFFimSimp {
  vBCUFFim: number;
  pFCPUFFim: number;
  pICMSUFFim: number;
  pICMSInter: number;
  vFCPUFFim: number;
  vICMSUFFim: number;
  vICMSUFIni: number;
}

export interface CteSimpSefazIdeSimp {
  cUF: number;
  cCT?: string;
  CFOP: string;
  natOp: string;
  mod?: number;
  serie: number;
  nCT: number;
  dhEmi: string;
  tpImp: number;
  tpEmis: number;
  cDV?: number;
  tpAmb?: number;
  tpCTe: number;
  procEmi: number;
  verProc: string;
  cMunEnv: string;
  xMunEnv: string;
  UFEnv: string;
  modal: string;
  tpServ: number;
  UFIni: string;
  UFFim: string;
  retira: number;
  xDetRetira?: string;
  dhCont?: string;
  xJust?: string;
  gCompraGov?: CteSimpSefazCompraGovReduzidoSimp;
}

export interface CteSimpSefazImpSimp {
  ICMS00?: CteSimpSefazICMS00Simp;
  ICMS20?: CteSimpSefazICMS20Simp;
  ICMS45?: CteSimpSefazICMS45Simp;
  ICMS60?: CteSimpSefazICMS60Simp;
  ICMS90?: CteSimpSefazICMS90Simp;
  ICMSOutraUF?: CteSimpSefazICMSOutraUFSimp;
  ICMSSN?: CteSimpSefazICMSSNSimp;
}

export interface CteSimpSefazInfCTeSuplSimp {
  qrCodCTe?: string;
}

export interface CteSimpSefazInfCargaSimp {
  vCarga: number;
  proPred: string;
  xOutCat?: string;
  infQ: CteSimpSefazInfQSimp[];
  vCargaAverb?: number;
}

export interface CteSimpSefazInfCteSimp {
  versao: string;
  Id?: string;
  ide: CteSimpSefazIdeSimp;
  compl?: CteSimpSefazComplSimp;
  emit: CteSimpSefazEmitSimp;
  toma: CteSimpSefazTomaSimp;
  infCarga: CteSimpSefazInfCargaSimp;
  det: CteSimpSefazDetSimp[];
  infModal: CteSimpSefazInfModalSimp;
  cobr?: CteSimpSefazCobrSimp;
  infCteSub?: CteSimpSefazInfCteSubSimp;
  imp: CteSimpSefazInfCte_ImpSimp;
  total: CteSimpSefazTotalSimp;
  autXML?: CteSimpSefazAutXMLSimp[];
  infRespTec?: CteSimpSefazRespTecSimp;
  infSolicNFF?: CteSimpSefazInfSolicNFFSimp;
}

export interface CteSimpSefazInfCteSubSimp {
  chCte: string;
  indAlteraToma?: number;
}

export interface CteSimpSefazInfCte_ImpSimp {
  ICMS: CteSimpSefazImpSimp;
  vTotTrib?: number;
  infAdFisco?: string;
  ICMSUFFim?: CteSimpSefazICMSUFFimSimp;
  IBSCBS?: CteSimpSefazTribCTeSimp;
}

export interface CteSimpSefazInfDocAntSimp {
  chCTe: string;
  tpPrest: number;
  infNFeTranspParcial?: CteSimpSefazInfNFeTranspParcialSimp[];
}

export interface CteSimpSefazInfDocSimp {
  infNF?: CteSimpSefazInfNFSimp[];
  infNFe?: CteSimpSefazInfDoc_InfNFeSimp[];
}

export interface CteSimpSefazInfDoc_InfNFeSimp {
  chave: string;
  unidRat?: number;
}

export interface CteSimpSefazInfModalSimp {
  versaoModal: string;
  rodo?: CteSimpSefazRodoSimp;
  aereo?: CteSimpSefazAereoSimp;
  ferrov?: CteSimpSefazFerrovSimp;
  aquav?: CteSimpSefazAquavSimp;
  duto?: CteSimpSefazDutoSimp;
  multimodal?: CteSimpSefazMultimodalSimp;
}

export interface CteSimpSefazInfNFSimp {
  serie: string;
  nDoc: string;
  unidRat?: number;
}

export interface CteSimpSefazInfNFeSimp {
  chNFe: string;
  PIN?: string;
  dPrev?: string;
  infUnidCarga?: CteSimpSefazUnidCargaSimp[];
  infUnidTransp?: CteSimpSefazUnidadeTranspSimp[];
}

export interface CteSimpSefazInfNFeTranspParcialSimp {
  chNFe: string;
}

export interface CteSimpSefazInfQSimp {
  cUnid: string;
  tpMed: string;
  qCarga: number;
}

export interface CteSimpSefazInfSegSimp {
  xSeg: string;
  CNPJ: string;
}

export interface CteSimpSefazInfSolicNFFSimp {
  xSolic: string;
}

export interface CteSimpSefazInfTotAPSimp {
  qTotProd: number;
  uniAP: number;
}

export interface CteSimpSefazLacUnidCargaSimp {
  nLacre: string;
}

export interface CteSimpSefazLacUnidTranspSimp {
  nLacre: string;
}

export interface CteSimpSefazLacreSimp {
  nLacre: string;
}

export interface CteSimpSefazMultimodalSimp {
  COTM: string;
  indNegociavel: number;
  seg?: CteSimpSefazSegSimp;
}

export interface CteSimpSefazNatCargaSimp {
  xDime?: string;
  cInfManu?: string[];
}

export interface CteSimpSefazObsContSimp {
  xCampo: string;
  xTexto: string;
}

export interface CteSimpSefazObsFiscoSimp {
  xCampo: string;
  xTexto: string;
}

export interface CteSimpSefazOccSimp {
  serie?: string;
  nOcc: number;
  dEmi: string;
  emiOcc?: CteSimpSefazEmiOccSimp;
}

export interface CteSimpSefazPassSimp {
  xPass?: string;
}

export interface CteSimpSefazPeriSimp {
  nONU: string;
  qTotEmb: string;
  infTotAP: CteSimpSefazInfTotAPSimp;
}

export interface CteSimpSefazRedSimp {
  pRedAliq: number;
  pAliqEfet: number;
}

export interface CteSimpSefazRespTecSimp {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: number;
  CSRT?: string;
  hashCSRT?: string;
}

export interface CteSimpSefazRodoSimp {
  RNTRC: string;
  occ?: CteSimpSefazOccSimp[];
}

export interface CteSimpSefazSegSimp {
  infSeg: CteSimpSefazInfSegSimp;
  nApol: string;
  nAver: string;
}

export interface CteSimpSefazTarifaSimp {
  CL: string;
  cTar?: string;
  vTar: number;
}

export interface CteSimpSefazTomaSimp {
  toma: number;
  indIEToma: number;
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  ISUF?: string;
  fone?: string;
  enderToma: CteSimpSefazEnderecoSimp;
  email?: string;
}

export interface CteSimpSefazTotalSimp {
  vTPrest: number;
  vTRec: number;
  vTotDFe?: number;
}

export interface CteSimpSefazTrafMutSimp {
  respFat: number;
  ferrEmi: number;
  vFrete: number;
  chCTeFerroOrigem?: string;
  ferroEnv?: CteSimpSefazFerroEnvSimp[];
}

export interface CteSimpSefazTribCTeSimp {
  CST: string;
  cClassTrib?: string;
  gIBSCBS?: CteSimpSefazCIBSSimp;
}

export interface CteSimpSefazTribCompraGovSimp {
  pAliqIBSUF?: number;
  vTribIBSUF: number;
  pAliqIBSMun?: number;
  vTribIBSMun: number;
  pAliqCBS?: number;
  vTribCBS: number;
}

export interface CteSimpSefazTribRegularSimp {
  CSTReg: string;
  cClassTribReg: string;
  pAliqEfetRegIBSUF: number;
  vTribRegIBSUF: number;
  pAliqEfetRegIBSMun: number;
  vTribRegIBSMun: number;
  pAliqEfetRegCBS: number;
  vTribRegCBS: number;
}

export interface CteSimpSefazUnidCargaSimp {
  tpUnidCarga: number;
  idUnidCarga: string;
  lacUnidCarga?: CteSimpSefazLacUnidCargaSimp[];
  qtdRat?: number;
}

export interface CteSimpSefazUnidadeTranspSimp {
  tpUnidTransp: number;
  idUnidTransp: string;
  lacUnidTransp?: CteSimpSefazLacUnidTranspSimp[];
  infUnidCarga?: CteSimpSefazUnidCargaSimp[];
  qtdRat?: number;
}