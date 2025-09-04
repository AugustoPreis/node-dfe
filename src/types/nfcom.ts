import { Ambiente } from './common';

export interface NfcomPedidoCancelamento {
  justificativa?: string;
}

export interface NfcomPedidoEmissao {
  infNFCom: NfcomSefazInfNFCom;
  ambiente: Ambiente;
  referencia?: string;
}

export interface NfcomSefazAssinante {
  iCodAssinante: string;
  tpAssinante: number;
  tpServUtil: number;
  nContrato?: string;
  dContratoIni?: string;
  dContratoFim?: string;
  NroTermPrinc?: string;
  cUFPrinc?: number;
  NroTermAdic?: string;
  cUFAdic?: number;
}

export interface NfcomSefazAutXML {
  CNPJ?: string;
  CPF?: string;
}

export interface NfcomSefazCIBS {
  vBC: number;
  gIBSUF: NfcomSefazGIBSUF;
  gIBSMun: NfcomSefazGIBSMun;
  vIBS: number;
  gCBS: NfcomSefazGCBS;
  gTribRegular?: NfcomSefazTribRegular;
  gIBSCredPres?: NfcomSefazCredPres;
  gCBSCredPres?: NfcomSefazCredPres;
  gTribCompraGov?: NfcomSefazTribCompraGov;
}

export interface NfcomSefazCOFINS {
  CST: string;
  vBC: number;
  pCOFINS: number;
  vCOFINS: number;
}

export interface NfcomSefazCompraGovReduzido {
  tpEnteGov: number;
  pRedutor: number;
}

export interface NfcomSefazCredPres {
  cCredPres: string;
  pCredPres: number;
  vCredPres?: number;
  vCredPresCondSus?: number;
}

export interface NfcomSefazDest {
  xNome: string;
  CNPJ?: string;
  CPF?: string;
  idOutros?: string;
  indIEDest: number;
  IE?: string;
  IM?: string;
  enderDest: NfcomSefazEndeDest;
}

export interface NfcomSefazDet {
  nItem: number;
  chNFComAnt?: string;
  nItemAnt?: string;
  indNFComAntPapelFatCentral?: number;
  prod: NfcomSefazProd;
  imposto: NfcomSefazImposto;
  gProcRef?: NfcomSefazGProcRef;
  gRessarc?: NfcomSefazGRessarc;
  infAdProd?: string;
}

export interface NfcomSefazDevTrib {
  vDevTrib: number;
}

export interface NfcomSefazDif {
  pDif: number;
  vDif: number;
}

export interface NfcomSefazEmit {
  CNPJ: string;
  IE?: string;
  IEUFDest?: string;
  CRT?: number;
  xNome?: string;
  xFant?: string;
  enderEmit?: NfcomSefazEndeEmi;
}

export interface NfcomSefazEndeDest {
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  CEP: string;
  UF: string;
  cPais?: string;
  xPais?: string;
  fone?: string;
  email?: string;
}

export interface NfcomSefazEndeEmi {
  xLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun?: string;
  xMun?: string;
  CEP?: string;
  UF?: string;
  fone?: string;
  email?: string;
}

export interface NfcomSefazFUNTTEL {
  vBC: number;
  pFUNTTEL: number;
  vFUNTTEL: number;
}

export interface NfcomSefazFUST {
  vBC: number;
  pFUST: number;
  vFUST: number;
}

export interface NfcomSefazGCBS {
  pCBS: number;
  gDif?: NfcomSefazDif;
  gDevTrib?: NfcomSefazDevTrib;
  gRed?: NfcomSefazRed;
  vCBS: number;
}

export interface NfcomSefazGCofat {
  chNFComLocal?: string;
  gNF?: NfcomSefazGCofat_GNF;
}

export interface NfcomSefazGCofat_GNF {
  CNPJ: string;
  mod: number;
  serie: string;
  nNF: number;
  CompetEmis: string;
  hash115?: string;
}

export interface NfcomSefazGFat {
  CompetFat: string;
  dVencFat: string;
  dPerUsoIni?: string;
  dPerUsoFim?: string;
  codBarras: string;
  codDebAuto?: string;
  codBanco?: string;
  codAgencia?: string;
  enderCorresp?: NfcomSefazEndeEmi;
  gPIX?: NfcomSefazGPIX;
}

export interface NfcomSefazGFatCentral {
  CNPJ: string;
  cUF: number;
}

export interface NfcomSefazGFidelidade {
  qtdSaldoPts: string;
  dRefSaldoPts: string;
  qtdPtsResg: string;
  dRefResgPts: string;
}

export interface NfcomSefazGIBS {
  gIBSUF: NfcomSefazGIBS_GIBSUF;
  gIBSMun: NfcomSefazGIBS_GIBSMun;
  vIBS: number;
  vCredPres: number;
  vCredPresCondSus: number;
}

export interface NfcomSefazGIBSMun {
  pIBSMun: number;
  gDif?: NfcomSefazDif;
  gDevTrib?: NfcomSefazDevTrib;
  gRed?: NfcomSefazRed;
  vIBSMun: number;
}

export interface NfcomSefazGIBSUF {
  pIBSUF: number;
  gDif?: NfcomSefazDif;
  gDevTrib?: NfcomSefazDevTrib;
  gRed?: NfcomSefazRed;
  vIBSUF: number;
}

export interface NfcomSefazGIBS_GIBSMun {
  vDif: number;
  vDevTrib: number;
  vIBSMun: number;
}

export interface NfcomSefazGIBS_GIBSUF {
  vDif: number;
  vDevTrib: number;
  vIBSUF: number;
}

export interface NfcomSefazGNF {
  CNPJ: string;
  mod: number;
  serie: string;
  nNF: number;
  CompetEmis: string;
  hash115?: string;
}

export interface NfcomSefazGPIX {
  urlQRCodePIX: string;
}

export interface NfcomSefazGProc {
  tpProc: number;
  nProcesso: string;
}

export interface NfcomSefazGProcRef {
  vItem: number;
  qFaturada: number;
  vProd: number;
  vDesc?: number;
  vOutro?: number;
  indDevolucao?: number;
  vBC?: number;
  pICMS?: number;
  vICMS?: number;
  vPIS?: number;
  vCOFINS?: number;
  vFCP?: number;
  gProc: NfcomSefazGProc[];
}

export interface NfcomSefazGRessarc {
  tpRessarc: number;
  dRef: string;
  nProcesso?: string;
  nProtReclama?: string;
  xObs?: string;
}

export interface NfcomSefazGSub {
  chNFCom?: string;
  gNF?: NfcomSefazGNF;
  motSub: string;
}

export interface NfcomSefazIBSCBSTot {
  vBCIBSCBS: number;
  gIBS: NfcomSefazGIBS;
  gCBS: NfcomSefazIBSCBSTot_GCBS;
}

export interface NfcomSefazIBSCBSTot_GCBS {
  vDif: number;
  vDevTrib: number;
  vCBS: number;
  vCredPres: number;
  vCredPresCondSus: number;
}

export interface NfcomSefazICMS00 {
  CST: string;
  vBC: number;
  pICMS: number;
  vICMS: number;
  pFCP?: number;
  vFCP?: number;
}

export interface NfcomSefazICMS20 {
  CST: string;
  pRedBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vICMSDeson?: number;
  cBenef?: string;
  pFCP?: number;
  vFCP?: number;
}

export interface NfcomSefazICMS40 {
  CST: string;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface NfcomSefazICMS51 {
  CST: string;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface NfcomSefazICMS90 {
  CST: string;
  vBC?: number;
  pICMS?: number;
  vICMS?: number;
  vICMSDeson?: number;
  cBenef?: string;
  pFCP?: number;
  vFCP?: number;
}

export interface NfcomSefazICMSSN {
  CST: string;
  indSN: number;
}

export interface NfcomSefazICMSTot {
  vBC: number;
  vICMS: number;
  vICMSDeson: number;
  vFCP: number;
}

export interface NfcomSefazICMSUFDest {
  cUFDest?: number;
  vBCUFDest: number;
  pFCPUFDest: number;
  pICMSUFDest: number;
  vFCPUFDest: number;
  vICMSUFDest: number;
  vICMSUFEmi: number;
  cBenefUFDest?: string;
}

export interface NfcomSefazIde {
  cUF: number;
  tpAmb?: number;
  mod?: number;
  serie: number;
  nNF: number;
  cNF?: string;
  cDV?: number;
  dhEmi: string;
  tpEmis: number;
  nSiteAutoriz: number;
  cMunFG: string;
  finNFCom: number;
  tpFat: number;
  verProc: string;
  indPrePago?: number;
  indCessaoMeiosRede?: number;
  indNotaEntrada?: number;
  dhCont?: string;
  xJust?: string;
  gCompraGov?: NfcomSefazCompraGovReduzido;
}

export interface NfcomSefazImposto {
  ICMS00?: NfcomSefazICMS00;
  ICMS20?: NfcomSefazICMS20;
  ICMS40?: NfcomSefazICMS40;
  ICMS51?: NfcomSefazICMS51;
  ICMS90?: NfcomSefazICMS90;
  ICMSSN?: NfcomSefazICMSSN;
  ICMSUFDest?: NfcomSefazICMSUFDest[];
  indSemCST?: number;
  PIS?: NfcomSefazPIS;
  COFINS?: NfcomSefazCOFINS;
  FUST?: NfcomSefazFUST;
  FUNTTEL?: NfcomSefazFUNTTEL;
  retTrib?: NfcomSefazRetTrib;
  IBSCBS?: NfcomSefazTribNFCom;
}

export interface NfcomSefazInfAdic {
  infAdFisco?: string;
  infCpl?: string[];
}

export interface NfcomSefazInfNFCom {
  versao: string;
  Id?: string;
  ide: NfcomSefazIde;
  emit: NfcomSefazEmit;
  dest: NfcomSefazDest;
  assinante: NfcomSefazAssinante;
  gSub?: NfcomSefazGSub;
  gCofat?: NfcomSefazGCofat;
  det: NfcomSefazDet[];
  total: NfcomSefazTotal;
  gFidelidade?: NfcomSefazGFidelidade;
  gFat?: NfcomSefazGFat;
  gFatCentral?: NfcomSefazGFatCentral;
  autXML?: NfcomSefazAutXML[];
  infAdic?: NfcomSefazInfAdic;
  gRespTec?: NfcomSefazRespTec;
}

export interface NfcomSefazPIS {
  CST: string;
  vBC: number;
  pPIS: number;
  vPIS: number;
}

export interface NfcomSefazProd {
  cProd: string;
  xProd: string;
  cClass: string;
  CFOP?: string;
  CNPJLD?: string;
  uMed: number;
  qFaturada: number;
  vItem: number;
  vDesc?: number;
  vOutro?: number;
  vProd: number;
  dExpiracao?: string;
  indDevolucao?: number;
}

export interface NfcomSefazRed {
  pRedAliq: number;
  pAliqEfet: number;
}

export interface NfcomSefazRespTec {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: number;
  CSRT?: string;
  hashCSRT?: string;
}

export interface NfcomSefazRetTrib {
  vRetPIS: number;
  vRetCofins: number;
  vRetCSLL: number;
  vBCIRRF: number;
  vIRRF: number;
}

export interface NfcomSefazTotal {
  vProd: number;
  ICMSTot: NfcomSefazICMSTot;
  vCOFINS: number;
  vPIS: number;
  vFUNTTEL: number;
  vFUST: number;
  vRetTribTot: NfcomSefazVRetTribTot;
  vDesc: number;
  vOutro: number;
  vNF: number;
  IBSCBSTot?: NfcomSefazIBSCBSTot;
  vTotDFe?: number;
}

export interface NfcomSefazTribCompraGov {
  pAliqIBSUF?: number;
  vTribIBSUF: number;
  pAliqIBSMun?: number;
  vTribIBSMun: number;
  pAliqCBS?: number;
  vTribCBS: number;
}

export interface NfcomSefazTribNFCom {
  CST: string;
  cClassTrib?: string;
  gIBSCBS?: NfcomSefazCIBS;
}

export interface NfcomSefazTribRegular {
  CSTReg: string;
  cClassTribReg: string;
  pAliqEfetRegIBSUF: number;
  vTribRegIBSUF: number;
  pAliqEfetRegIBSMun: number;
  vTribRegIBSMun: number;
  pAliqEfetRegCBS: number;
  vTribRegCBS: number;
}

export interface NfcomSefazVRetTribTot {
  vRetPIS: number;
  vRetCofins: number;
  vRetCSLL: number;
  vIRRF: number;
}