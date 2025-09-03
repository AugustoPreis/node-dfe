import { Ambiente } from './common';

export interface NfeListagemQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  referencia?: string;
  ambiente: Ambiente;
  chave?: string;
  serie?: string;
}

export interface NfeListagemLotesQuery {
  $top?: string;
  $skip?: string;
  $inlinecount?: boolean;
  cpf_cnpj: string;
  referencia?: string;
  ambiente: Ambiente;
}

export interface NfePedidoCancelamento {
  justificativa?: string;
}

export interface NfePedidoEmissao {
  infNFe: NfeSefazInfNFe;
  infNFeSupl?: NfeSefazInfNFeSupl;
  ambiente: Ambiente;
  referencia?: string;
}

export interface NfePedidoEmissaoLote {
  documentos: NfePedidoEmissao[];
  ambiente: Ambiente;
  referencia?: string;
  id_lote: string;
}

export interface NfeSefazAdi {
  nAdicao?: number;
  nSeqAdic: number;
  cFabricante: string;
  vDescDI?: number;
  nDraw?: string;
}

export interface NfeSefazAgropecuario {
  defensivo?: NfeSefazDefensivo[];
  guiaTransito?: NfeSefazGuiaTransito;
}

export interface NfeSefazArma {
  tpArma: number;
  nSerie: string;
  nCano: string;
  descr: string;
}

export interface NfeSefazAutXML {
  CNPJ?: string;
  CPF?: string;
}

export interface NfeSefazAvulsa {
  CNPJ: string;
  xOrgao: string;
  matr: string;
  xAgente: string;
  fone?: string;
  UF: string;
  nDAR?: string;
  dEmi?: string;
  vDAR?: number;
  repEmi: string;
  dPag?: string;
}

export interface NfeSefazCIBS {
  vBC: number;
  gIBSUF: NfeSefazGIBSUF;
  gIBSMun: NfeSefazGIBSMun;
  vIBS: number;
  gCBS: NfeSefazGCBS;
  gTribRegular?: NfeSefazTribRegular;
  gIBSCredPres?: NfeSefazCredPres;
  gCBSCredPres?: NfeSefazCredPres;
  gTribCompraGov?: NfeSefazTribCompraGov;
}

export interface NfeSefazCIDE {
  qBCProd: number;
  vAliqProd: number;
  vCIDE: number;
}

export interface NfeSefazCOFINS {
  COFINSAliq?: NfeSefazCOFINSAliq;
  COFINSQtde?: NfeSefazCOFINSQtde;
  COFINSNT?: NfeSefazCOFINSNT;
  COFINSOutr?: NfeSefazCOFINSOutr;
}

export interface NfeSefazCOFINSAliq {
  CST: string;
  vBC: number;
  pCOFINS: number;
  vCOFINS: number;
}

export interface NfeSefazCOFINSNT {
  CST: string;
}

export interface NfeSefazCOFINSOutr {
  CST: string;
  vBC?: number;
  pCOFINS?: number;
  qBCProd?: number;
  vAliqProd?: number;
  vCOFINS: number;
}

export interface NfeSefazCOFINSQtde {
  CST: string;
  qBCProd: number;
  vAliqProd: number;
  vCOFINS: number;
}

export interface NfeSefazCOFINSST {
  vBC?: number;
  pCOFINS?: number;
  qBCProd?: number;
  vAliqProd?: number;
  vCOFINS: number;
  indSomaCOFINSST?: number;
}

export interface NfeSefazCana {
  safra: string;
  ref: string;
  forDia: NfeSefazForDia[];
  qTotMes: number;
  qTotAnt: number;
  qTotGer: number;
  deduc?: NfeSefazDeduc[];
  vFor: number;
  vTotDed: number;
  vLiqFor: number;
}

export interface NfeSefazCard {
  tpIntegra: number;
  CNPJ?: string;
  tBand?: string;
  cAut?: string;
  CNPJReceb?: string;
  idTermPag?: string;
}

export interface NfeSefazCobr {
  fat?: NfeSefazFat;
  dup?: NfeSefazDup[];
}

export interface NfeSefazComb {
  cProdANP: number;
  descANP: string;
  pGLP?: number;
  pGNn?: number;
  pGNi?: number;
  vPart?: number;
  CODIF?: string;
  qTemp?: number;
  UFCons: string;
  CIDE?: NfeSefazCIDE;
  encerrante?: NfeSefazEncerrante;
  pBio?: number;
  origComb?: NfeSefazOrigComb[];
}

export interface NfeSefazCompra {
  xNEmp?: string;
  xPed?: string;
  xCont?: string;
}

export interface NfeSefazCompraGov {
  tpEnteGov: number;
  pRedutor: number;
  tpOperGov: number;
}

export interface NfeSefazCredPres {
  cCredPres: string;
  pCredPres: number;
  vCredPres?: number;
  vCredPresCondSus?: number;
}

export interface NfeSefazCredPresIBSZFM {
  tpCredPresIBSZFM: number;
  vCredPresIBSZFM?: number;
}

export interface NfeSefazDFeReferenciado {
  chaveAcesso: string;
  nItem?: number;
}

export interface NfeSefazDI {
  nDI: string;
  dDI: string;
  xLocDesemb: string;
  UFDesemb: string;
  dDesemb: string;
  tpViaTransp: number;
  vAFRMM?: number;
  tpIntermedio: number;
  CNPJ?: string;
  CPF?: string;
  UFTerceiro?: string;
  cExportador: string;
  adi: NfeSefazAdi[];
}

export interface NfeSefazDeduc {
  xDed: string;
  vDed: number;
}

export interface NfeSefazDefensivo {
  nReceituario: string;
  CPFRespTec: string;
}

export interface NfeSefazDest {
  CNPJ?: string;
  CPF?: string;
  idEstrangeiro?: string;
  xNome?: string;
  enderDest?: NfeSefazEndereco;
  indIEDest: number;
  IE?: string;
  ISUF?: string;
  IM?: string;
  email?: string;
}

export interface NfeSefazDet {
  nItem: number;
  prod: NfeSefazProd;
  imposto: NfeSefazImposto;
  impostoDevol?: NfeSefazImpostoDevol;
  infAdProd?: string;
  obsItem?: NfeSefazObsItem;
  vItem?: number;
  DFeReferenciado?: NfeSefazDFeReferenciado;
}

export interface NfeSefazDetExport {
  nDraw?: string;
  exportInd?: NfeSefazExportInd;
}

export interface NfeSefazDetPag {
  indPag?: number;
  tPag: string;
  xPag?: string;
  vPag: number;
  dPag?: string;
  CNPJPag?: string;
  UFPag?: string;
  card?: NfeSefazCard;
}

export interface NfeSefazDevTrib {
  vDevTrib: number;
}

export interface NfeSefazDif {
  pDif: number;
  vDif: number;
}

export interface NfeSefazDup {
  nDup?: string;
  dVenc?: string;
  vDup: number;
}

export interface NfeSefazEmit {
  CNPJ?: string;
  CPF?: string;
  xNome?: string;
  xFant?: string;
  enderEmit?: NfeSefazEnderEmi;
  IE?: string;
  IEST?: string;
  IM?: string;
  CNAE?: string;
  CRT?: number;
}

export interface NfeSefazEncerrante {
  nBico: number;
  nBomba?: number;
  nTanque: number;
  vEncIni: number;
  vEncFin: number;
}

export interface NfeSefazEnderEmi {
  xLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun?: string;
  xMun?: string;
  UF?: string;
  CEP?: string;
  cPais?: string;
  xPais?: string;
  fone?: string;
}

export interface NfeSefazEndereco {
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  UF: string;
  CEP?: string;
  cPais?: string;
  xPais?: string;
  fone?: string;
}

export interface NfeSefazExportInd {
  nRE: string;
  chNFe: string;
  qExport: number;
}

export interface NfeSefazExporta {
  UFSaidaPais: string;
  xLocExporta: string;
  xLocDespacho?: string;
}

export interface NfeSefazFat {
  nFat?: string;
  vOrig?: number;
  vDesc?: number;
  vLiq?: number;
}

export interface NfeSefazForDia {
  dia: number;
  qtde: number;
}

export interface NfeSefazGCBS {
  pCBS: number;
  gDif?: NfeSefazDif;
  gDevTrib?: NfeSefazDevTrib;
  gRed?: NfeSefazRed;
  vCBS: number;
}

export interface NfeSefazGCred {
  cCredPresumido: string;
  pCredPresumido: number;
  vCredPresumido: number;
}

export interface NfeSefazGIBS {
  gIBSUF: NfeSefazGIBS_GIBSUF;
  gIBSMun: NfeSefazGIBS_GIBSMun;
  vIBS: number;
  vCredPres: number;
  vCredPresCondSus: number;
}

export interface NfeSefazGIBSMun {
  pIBSMun: number;
  gDif?: NfeSefazDif;
  gDevTrib?: NfeSefazDevTrib;
  gRed?: NfeSefazRed;
  vIBSMun: number;
}

export interface NfeSefazGIBSUF {
  pIBSUF: number;
  gDif?: NfeSefazDif;
  gDevTrib?: NfeSefazDevTrib;
  gRed?: NfeSefazRed;
  vIBSUF: number;
}

export interface NfeSefazGIBS_GIBSMun {
  vDif: number;
  vDevTrib: number;
  vIBSMun: number;
}

export interface NfeSefazGIBS_GIBSUF {
  vDif: number;
  vDevTrib: number;
  vIBSUF: number;
}

export interface NfeSefazGMono {
  vIBSMono: number;
  vCBSMono: number;
  vIBSMonoReten: number;
  vCBSMonoReten: number;
  vIBSMonoRet: number;
  vCBSMonoRet: number;
}

export interface NfeSefazGMonoDif {
  pDifIBS: number;
  vIBSMonoDif: number;
  pDifCBS: number;
  vCBSMonoDif: number;
}

export interface NfeSefazGMonoPadrao {
  qBCMono: number;
  adRemIBS: number;
  adRemCBS: number;
  vIBSMono: number;
  vCBSMono: number;
}

export interface NfeSefazGMonoRet {
  qBCMonoRet: number;
  adRemIBSRet: number;
  vIBSMonoRet: number;
  adRemCBSRet: number;
  vCBSMonoRet: number;
}

export interface NfeSefazGMonoReten {
  qBCMonoReten: number;
  adRemIBSReten: number;
  vIBSMonoReten: number;
  adRemCBSReten: number;
  vCBSMonoReten: number;
}

export interface NfeSefazGPagAntecipado {
  refNFe: string[];
}

export interface NfeSefazGuiaTransito {
  tpGuia: number;
  UFGuia?: string;
  serieGuia?: string;
  nGuia: string;
}

export interface NfeSefazIBSCBSMonoTot {
  vBCIBSCBS: number;
  gIBS?: NfeSefazGIBS;
  gCBS?: NfeSefazIBSCBSMonoTot_GCBS;
  gMono?: NfeSefazGMono;
}

export interface NfeSefazIBSCBSMonoTot_GCBS {
  vDif: number;
  vDevTrib: number;
  vCBS: number;
  vCredPres: number;
  vCredPresCondSus: number;
}

export interface NfeSefazICMS {
  ICMS00?: NfeSefazICMS00;
  ICMS02?: NfeSefazICMS02;
  ICMS10?: NfeSefazICMS10;
  ICMS15?: NfeSefazICMS15;
  ICMS20?: NfeSefazICMS20;
  ICMS30?: NfeSefazICMS30;
  ICMS40?: NfeSefazICMS40;
  ICMS51?: NfeSefazICMS51;
  ICMS53?: NfeSefazICMS53;
  ICMS60?: NfeSefazICMS60;
  ICMS61?: NfeSefazICMS61;
  ICMS70?: NfeSefazICMS70;
  ICMS90?: NfeSefazICMS90;
  ICMSPart?: NfeSefazICMSPart;
  ICMSST?: NfeSefazICMSST;
  ICMSSN101?: NfeSefazICMSSN101;
  ICMSSN102?: NfeSefazICMSSN102;
  ICMSSN201?: NfeSefazICMSSN201;
  ICMSSN202?: NfeSefazICMSSN202;
  ICMSSN500?: NfeSefazICMSSN500;
  ICMSSN900?: NfeSefazICMSSN900;
}

export interface NfeSefazICMS00 {
  orig: number;
  CST: string;
  modBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  pFCP?: number;
  vFCP?: number;
}

export interface NfeSefazICMS02 {
  orig: number;
  CST: string;
  qBCMono?: number;
  adRemICMS: number;
  vICMSMono: number;
}

export interface NfeSefazICMS10 {
  orig: number;
  CST: string;
  modBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vBCFCP?: number;
  pFCP?: number;
  vFCP?: number;
  modBCST: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST: number;
  pICMSST: number;
  vICMSST: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  vICMSSTDeson?: number;
  motDesICMSST?: number;
}

export interface NfeSefazICMS15 {
  orig: number;
  CST: string;
  qBCMono?: number;
  adRemICMS: number;
  vICMSMono: number;
  qBCMonoReten?: number;
  adRemICMSReten: number;
  vICMSMonoReten: number;
  pRedAdRem?: number;
  motRedAdRem?: number;
}

export interface NfeSefazICMS20 {
  orig: number;
  CST: string;
  modBC: number;
  pRedBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vBCFCP?: number;
  pFCP?: number;
  vFCP?: number;
  vICMSDeson?: number;
  motDesICMS?: number;
  indDeduzDeson?: number;
}

export interface NfeSefazICMS30 {
  orig: number;
  CST: string;
  modBCST: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST: number;
  pICMSST: number;
  vICMSST: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  vICMSDeson?: number;
  motDesICMS?: number;
  indDeduzDeson?: number;
}

export interface NfeSefazICMS40 {
  orig: number;
  CST: string;
  vICMSDeson?: number;
  motDesICMS?: number;
  indDeduzDeson?: number;
}

export interface NfeSefazICMS51 {
  orig: number;
  CST: string;
  modBC?: number;
  pRedBC?: number;
  cBenefRBC?: string;
  vBC?: number;
  pICMS?: number;
  vICMSOp?: number;
  pDif?: number;
  vICMSDif?: number;
  vICMS?: number;
  vBCFCP?: number;
  pFCP?: number;
  vFCP?: number;
  pFCPDif?: number;
  vFCPDif?: number;
  vFCPEfet?: number;
}

export interface NfeSefazICMS53 {
  orig: number;
  CST: string;
  qBCMono?: number;
  adRemICMS?: number;
  vICMSMonoOp?: number;
  pDif?: number;
  vICMSMonoDif?: number;
  vICMSMono?: number;
  qBCMonoDif?: number;
  adRemICMSDif?: number;
}

export interface NfeSefazICMS60 {
  orig: number;
  CST: string;
  vBCSTRet?: number;
  pST?: number;
  vICMSSubstituto?: number;
  vICMSSTRet?: number;
  vBCFCPSTRet?: number;
  pFCPSTRet?: number;
  vFCPSTRet?: number;
  pRedBCEfet?: number;
  vBCEfet?: number;
  pICMSEfet?: number;
  vICMSEfet?: number;
}

export interface NfeSefazICMS61 {
  orig: number;
  CST: string;
  qBCMonoRet?: number;
  adRemICMSRet: number;
  vICMSMonoRet: number;
}

export interface NfeSefazICMS70 {
  orig: number;
  CST: string;
  modBC: number;
  pRedBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vBCFCP?: number;
  pFCP?: number;
  vFCP?: number;
  modBCST: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST: number;
  pICMSST: number;
  vICMSST: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  vICMSDeson?: number;
  motDesICMS?: number;
  indDeduzDeson?: number;
  vICMSSTDeson?: number;
  motDesICMSST?: number;
}

export interface NfeSefazICMS90 {
  orig: number;
  CST: string;
  modBC?: number;
  vBC?: number;
  pRedBC?: number;
  pICMS?: number;
  vICMS?: number;
  vBCFCP?: number;
  pFCP?: number;
  vFCP?: number;
  modBCST?: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST?: number;
  pICMSST?: number;
  vICMSST?: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  vICMSDeson?: number;
  motDesICMS?: number;
  indDeduzDeson?: number;
  vICMSSTDeson?: number;
  motDesICMSST?: number;
}

export interface NfeSefazICMSPart {
  orig: number;
  CST: string;
  modBC: number;
  vBC: number;
  pRedBC?: number;
  pICMS: number;
  vICMS: number;
  modBCST: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST: number;
  pICMSST: number;
  vICMSST: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  pBCOp: number;
  UFST: string;
}

export interface NfeSefazICMSSN101 {
  orig: number;
  CSOSN: string;
  pCredSN: number;
  vCredICMSSN: number;
}

export interface NfeSefazICMSSN102 {
  orig: number;
  CSOSN: string;
}

export interface NfeSefazICMSSN201 {
  orig: number;
  CSOSN: string;
  modBCST: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST: number;
  pICMSST: number;
  vICMSST: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  pCredSN: number;
  vCredICMSSN: number;
}

export interface NfeSefazICMSSN202 {
  orig: number;
  CSOSN: string;
  modBCST: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST: number;
  pICMSST: number;
  vICMSST: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
}

export interface NfeSefazICMSSN500 {
  orig: number;
  CSOSN: string;
  vBCSTRet?: number;
  pST?: number;
  vICMSSubstituto?: number;
  vICMSSTRet?: number;
  vBCFCPSTRet?: number;
  pFCPSTRet?: number;
  vFCPSTRet?: number;
  pRedBCEfet?: number;
  vBCEfet?: number;
  pICMSEfet?: number;
  vICMSEfet?: number;
}

export interface NfeSefazICMSSN900 {
  orig: number;
  CSOSN: string;
  modBC?: number;
  vBC?: number;
  pRedBC?: number;
  pICMS?: number;
  vICMS?: number;
  modBCST?: number;
  pMVAST?: number;
  pRedBCST?: number;
  vBCST?: number;
  pICMSST?: number;
  vICMSST?: number;
  vBCFCPST?: number;
  pFCPST?: number;
  vFCPST?: number;
  pCredSN?: number;
  vCredICMSSN?: number;
}

export interface NfeSefazICMSST {
  orig: number;
  CST: string;
  vBCSTRet: number;
  pST?: number;
  vICMSSubstituto?: number;
  vICMSSTRet: number;
  vBCFCPSTRet?: number;
  pFCPSTRet?: number;
  vFCPSTRet?: number;
  vBCSTDest: number;
  vICMSSTDest: number;
  pRedBCEfet?: number;
  vBCEfet?: number;
  pICMSEfet?: number;
  vICMSEfet?: number;
}

export interface NfeSefazICMSTot {
  vBC: number;
  vICMS: number;
  vICMSDeson: number;
  vFCPUFDest?: number;
  vICMSUFDest?: number;
  vICMSUFRemet?: number;
  vFCP: number;
  vBCST: number;
  vST: number;
  vFCPST: number;
  vFCPSTRet: number;
  qBCMono?: number;
  vICMSMono?: number;
  qBCMonoReten?: number;
  vICMSMonoReten?: number;
  qBCMonoRet?: number;
  vICMSMonoRet?: number;
  vProd: number;
  vFrete: number;
  vSeg: number;
  vDesc: number;
  vII: number;
  vIPI: number;
  vIPIDevol: number;
  vPIS: number;
  vCOFINS: number;
  vOutro: number;
  vNF: number;
  vTotTrib?: number;
}

export interface NfeSefazICMSUFDest {
  vBCUFDest: number;
  vBCFCPUFDest?: number;
  pFCPUFDest?: number;
  pICMSUFDest: number;
  pICMSInter: number;
  pICMSInterPart: number;
  vFCPUFDest?: number;
  vICMSUFDest: number;
  vICMSUFRemet: number;
}

export interface NfeSefazII {
  vBC: number;
  vDespAdu: number;
  vII: number;
  vIOF: number;
}

export interface NfeSefazIPINT {
  CST: string;
}

export interface NfeSefazIPITrib {
  CST: string;
  vBC?: number;
  pIPI?: number;
  qUnid?: number;
  vUnid?: number;
  vIPI: number;
}

export interface NfeSefazIS {
  CSTIS: string;
  cClassTribIS?: string;
  vBCIS?: number;
  pIS?: number;
  pISEspec?: number;
  uTrib?: string;
  qTrib?: number;
  vIS?: number;
}

export interface NfeSefazISSQN {
  vBC: number;
  vAliq: number;
  vISSQN: number;
  cMunFG: string;
  cListServ: string;
  vDeducao?: number;
  vOutro?: number;
  vDescIncond?: number;
  vDescCond?: number;
  vISSRet?: number;
  indISS: number;
  cServico?: string;
  cMun?: string;
  cPais?: string;
  nProcesso?: string;
  indIncentivo: number;
}

export interface NfeSefazISSQNtot {
  vServ?: number;
  vBC?: number;
  vISS?: number;
  vPIS?: number;
  vCOFINS?: number;
  dCompet: string;
  vDeducao?: number;
  vOutro?: number;
  vDescIncond?: number;
  vDescCond?: number;
  vISSRet?: number;
  cRegTrib?: number;
}

export interface NfeSefazISTot {
  vIS: number;
}

export interface NfeSefazIde {
  cUF: number;
  cNF?: string;
  natOp: string;
  mod?: number;
  serie: number;
  nNF: number;
  dhEmi: string;
  dhSaiEnt?: string;
  tpNF: number;
  idDest: number;
  cMunFG: string;
  cMunFGIBS?: string;
  tpImp: number;
  tpEmis: number;
  cDV?: number;
  tpAmb?: number;
  finNFe: number;
  tpNFDebito?: string;
  tpNFCredito?: string;
  indFinal: number;
  indPres: number;
  indIntermed?: number;
  procEmi: number;
  verProc: string;
  dhCont?: string;
  xJust?: string;
  NFref?: NfeSefazNFref[];
  gCompraGov?: NfeSefazCompraGov;
  gPagAntecipado?: NfeSefazGPagAntecipado;
}

export interface NfeSefazImposto {
  vTotTrib?: number;
  ICMS?: NfeSefazICMS;
  IPI?: NfeSefazIpi;
  II?: NfeSefazII;
  ISSQN?: NfeSefazISSQN;
  PIS?: NfeSefazPIS;
  PISST?: NfeSefazPISST;
  COFINS?: NfeSefazCOFINS;
  COFINSST?: NfeSefazCOFINSST;
  ICMSUFDest?: NfeSefazICMSUFDest;
  IS?: NfeSefazIS;
  IBSCBS?: NfeSefazTribNFe;
}

export interface NfeSefazImpostoDevol {
  pDevol: number;
  IPI: NfeSefazImpostoDevol_IPI;
}

export interface NfeSefazImpostoDevol_IPI {
  vIPIDevol: number;
}

export interface NfeSefazInfAdic {
  infAdFisco?: string;
  infCpl?: string;
  obsCont?: NfeSefazInfAdic_ObsCont[];
  obsFisco?: NfeSefazInfAdic_ObsFisco[];
  procRef?: NfeSefazProcRef[];
}

export interface NfeSefazInfAdic_ObsCont {
  xCampo?: string;
  xTexto?: string;
}

export interface NfeSefazInfAdic_ObsFisco {
  xCampo?: string;
  xTexto?: string;
}

export interface NfeSefazInfIntermed {
  CNPJ: string;
  idCadIntTran: string;
}

export interface NfeSefazInfNFe {
  versao: string;
  Id?: string;
  ide: NfeSefazIde;
  emit: NfeSefazEmit;
  avulsa?: NfeSefazAvulsa;
  dest?: NfeSefazDest;
  retirada?: NfeSefazLocal;
  entrega?: NfeSefazLocal;
  autXML?: NfeSefazAutXML[];
  det: NfeSefazDet[];
  total: NfeSefazTotal;
  transp: NfeSefazTransp;
  cobr?: NfeSefazCobr;
  pag: NfeSefazPag;
  infIntermed?: NfeSefazInfIntermed;
  infAdic?: NfeSefazInfAdic;
  exporta?: NfeSefazExporta;
  compra?: NfeSefazCompra;
  cana?: NfeSefazCana;
  infRespTec?: NfeSefazInfRespTec;
  infSolicNFF?: NfeSefazInfSolicNFF;
  agropecuario?: NfeSefazAgropecuario;
}

export interface NfeSefazInfNFeSupl {
  qrCode?: string;
  urlChave?: string;
}

export interface NfeSefazInfProdEmb {
  xEmb: string;
  qVolEmb: number;
  uEmb: string;
}

export interface NfeSefazInfProdNFF {
  cProdFisco: string;
  cOperNFF: string;
}

export interface NfeSefazInfRespTec {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: number;
  CSRT?: string;
  hashCSRT?: string;
}

export interface NfeSefazInfSolicNFF {
  xSolic: string;
}

export interface NfeSefazIpi {
  CNPJProd?: string;
  cSelo?: string;
  qSelo?: number;
  cEnq: string;
  IPITrib?: NfeSefazIPITrib;
  IPINT?: NfeSefazIPINT;
}

export interface NfeSefazLacres {
  nLacre: string;
}

export interface NfeSefazLocal {
  CNPJ?: string;
  CPF?: string;
  xNome?: string;
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  UF: string;
  CEP?: string;
  cPais?: string;
  xPais?: string;
  fone?: string;
  email?: string;
  IE?: string;
}

export interface NfeSefazMed {
  cProdANVISA: string;
  xMotivoIsencao?: string;
  vPMC: number;
}

export interface NfeSefazMonofasia {
  gMonoPadrao?: NfeSefazGMonoPadrao;
  gMonoReten?: NfeSefazGMonoReten;
  gMonoRet?: NfeSefazGMonoRet;
  gMonoDif?: NfeSefazGMonoDif;
  vTotIBSMonoItem: number;
  vTotCBSMonoItem: number;
}

export interface NfeSefazNFref {
  refNFe?: string;
  refNFeSig?: string;
  refNF?: NfeSefazRefNF;
  refNFP?: NfeSefazRefNFP;
  refCTe?: string;
  refECF?: NfeSefazRefECF;
}

export interface NfeSefazObsCont {
  xCampo?: string;
  xTexto?: string;
}

export interface NfeSefazObsFisco {
  xCampo?: string;
  xTexto?: string;
}

export interface NfeSefazObsItem {
  obsCont?: NfeSefazObsCont;
  obsFisco?: NfeSefazObsFisco;
}

export interface NfeSefazOrigComb {
  indImport: number;
  cUFOrig: number;
  pOrig: number;
}

export interface NfeSefazPIS {
  PISAliq?: NfeSefazPISAliq;
  PISQtde?: NfeSefazPISQtde;
  PISNT?: NfeSefazPISNT;
  PISOutr?: NfeSefazPISOutr;
}

export interface NfeSefazPISAliq {
  CST: string;
  vBC: number;
  pPIS: number;
  vPIS: number;
}

export interface NfeSefazPISNT {
  CST: string;
}

export interface NfeSefazPISOutr {
  CST: string;
  vBC?: number;
  pPIS?: number;
  qBCProd?: number;
  vAliqProd?: number;
  vPIS: number;
}

export interface NfeSefazPISQtde {
  CST: string;
  qBCProd: number;
  vAliqProd: number;
  vPIS: number;
}

export interface NfeSefazPISST {
  vBC?: number;
  pPIS?: number;
  qBCProd?: number;
  vAliqProd?: number;
  vPIS: number;
  indSomaPISST?: number;
}

export interface NfeSefazPag {
  detPag: NfeSefazDetPag[];
  vTroco?: number;
}

export interface NfeSefazProcRef {
  nProc: string;
  indProc: number;
  tpAto?: string;
}

export interface NfeSefazProd {
  cProd: string;
  cEAN: string;
  cBarra?: string;
  xProd: string;
  NCM: string;
  NVE?: string[];
  CEST?: string;
  indEscala?: string;
  CNPJFab?: string;
  cBenef?: string;
  gCred?: NfeSefazGCred[];
  EXTIPI?: string;
  CFOP: string;
  uCom: string;
  qCom: number;
  vUnCom: number;
  vProd: number;
  cEANTrib: string;
  cBarraTrib?: string;
  uTrib: string;
  qTrib: number;
  vUnTrib: number;
  vFrete?: number;
  vSeg?: number;
  vDesc?: number;
  vOutro?: number;
  indTot: number;
  indBemMovelUsado?: number;
  DI?: NfeSefazDI[];
  detExport?: NfeSefazDetExport[];
  xPed?: string;
  nItemPed?: number;
  nFCI?: string;
  rastro?: NfeSefazRastro[];
  infProdNFF?: NfeSefazInfProdNFF;
  infProdEmb?: NfeSefazInfProdEmb;
  veicProd?: NfeSefazVeicProd;
  med?: NfeSefazMed;
  arma?: NfeSefazArma[];
  comb?: NfeSefazComb;
  nRECOPI?: string;
}

export interface NfeSefazRastro {
  nLote: string;
  qLote: number;
  dFab: string;
  dVal: string;
  cAgreg?: string;
}

export interface NfeSefazRed {
  pRedAliq: number;
  pAliqEfet: number;
}

export interface NfeSefazRefECF {
  mod: string;
  nECF: number;
  nCOO: number;
}

export interface NfeSefazRefNF {
  cUF: number;
  AAMM: string;
  CNPJ: string;
  mod: string;
  serie: number;
  nNF: number;
}

export interface NfeSefazRefNFP {
  cUF: number;
  AAMM: string;
  CNPJ?: string;
  CPF?: string;
  IE: string;
  mod: string;
  serie: number;
  nNF: number;
}

export interface NfeSefazRetTransp {
  vServ: number;
  vBCRet: number;
  pICMSRet: number;
  vICMSRet: number;
  CFOP: string;
  cMunFG: string;
}

export interface NfeSefazRetTrib {
  vRetPIS?: number;
  vRetCOFINS?: number;
  vRetCSLL?: number;
  vBCIRRF?: number;
  vIRRF?: number;
  vBCRetPrev?: number;
  vRetPrev?: number;
}

export interface NfeSefazTotal {
  ICMSTot: NfeSefazICMSTot;
  ISSQNtot?: NfeSefazISSQNtot;
  retTrib?: NfeSefazRetTrib;
  ISTot?: NfeSefazISTot;
  IBSCBSTot?: NfeSefazIBSCBSMonoTot;
  vNFTot?: number;
}

export interface NfeSefazTransfCred {
  vIBS: number;
  vCBS: number;
}

export interface NfeSefazTransp {
  modFrete: number;
  transporta?: NfeSefazTransporta;
  retTransp?: NfeSefazRetTransp;
  veicTransp?: NfeSefazVeiculo;
  reboque?: NfeSefazVeiculo[];
  vagao?: string;
  balsa?: string;
  vol?: NfeSefazVol[];
}

export interface NfeSefazTransporta {
  CNPJ?: string;
  CPF?: string;
  xNome?: string;
  IE?: string;
  xEnder?: string;
  xMun?: string;
  UF?: string;
}

export interface NfeSefazTribCompraGov {
  pAliqIBSUF?: number;
  vTribIBSUF: number;
  pAliqIBSMun?: number;
  vTribIBSMun: number;
  pAliqCBS?: number;
  vTribCBS: number;
}

export interface NfeSefazTribNFe {
  CST: string;
  cClassTrib?: string;
  gIBSCBS?: NfeSefazCIBS;
  gIBSCBSMono?: NfeSefazMonofasia;
  gTransfCred?: NfeSefazTransfCred;
  gCredPresIBSZFM?: NfeSefazCredPresIBSZFM;
}

export interface NfeSefazTribRegular {
  CSTReg: string;
  cClassTribReg: string;
  pAliqEfetRegIBSUF: number;
  vTribRegIBSUF: number;
  pAliqEfetRegIBSMun: number;
  vTribRegIBSMun: number;
  pAliqEfetRegCBS: number;
  vTribRegCBS: number;
}

export interface NfeSefazVeicProd {
  tpOp: number;
  chassi: string;
  cCor: string;
  xCor: string;
  pot: string;
  cilin: string;
  pesoL: string;
  pesoB: string;
  nSerie: string;
  tpComb: string;
  nMotor: string;
  CMT: string;
  dist: string;
  anoMod: number;
  anoFab: number;
  tpPint: string;
  tpVeic: number;
  espVeic: number;
  VIN: string;
  condVeic: number;
  cMod: string;
  cCorDENATRAN: string;
  lota: number;
  tpRest: number;
}

export interface NfeSefazVeiculo {
  placa: string;
  UF?: string;
  RNTC?: string;
}

export interface NfeSefazVol {
  qVol?: number;
  esp?: string;
  marca?: string;
  nVol?: string;
  pesoL?: number;
  pesoB?: number;
  lacres?: NfeSefazLacres[];
}