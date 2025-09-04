import { Ambiente } from './common';
import { DfeAutorEvento, StatusEventoDfe } from './dfe';

export interface CteOsPedidoCancelamento {
  justificativa?: string;
}

export interface CteOsCartaCorrecao {
  correcoes: CteOsInfCorrecao[];
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

export interface CteOsPedidoCartaCorrecao {
  correcoes: CteOsInfCorrecao[];
}

export interface CteOsInfCorrecao {
  grupo_alterado: string;
  campo_alterado: string;
  valor_alterado: string;
  numero_item_alterado?: number;
}

export interface CteOsPedidoEmissao {
  infCte: CteOsSefazInfCteOS;
  infCTeSupl?: CteOsSefazInfCTeSuplOS;
  ambiente: Ambiente;
  referencia?: string;
}

export interface CteOsSefazAutXMLOS {
  CNPJ?: string;
  CPF?: string;
}

export interface CteOsSefazCIBSOS {
  vBC: number;
  gIBSUF: CteOsSefazGIBSUFOS;
  gIBSMun: CteOsSefazGIBSMunOS;
  vIBS: number;
  gCBS: CteOsSefazGCBSOS;
  gTribRegular?: CteOsSefazTribRegularOS;
  gIBSCredPres?: CteOsSefazCredPresOS;
  gCBSCredPres?: CteOsSefazCredPresOS;
  gTribCompraGov?: CteOsSefazTribCompraGovOS;
}

export interface CteOsSefazCobrOS {
  fat?: CteOsSefazFatOS;
  dup?: CteOsSefazDupOS[];
}

export interface CteOsSefazCompOS {
  xNome: string;
  vComp: number;
}

export interface CteOsSefazComplOS {
  xCaracAd?: string;
  xCaracSer?: string;
  xEmi?: string;
  xObs?: string;
  ObsCont?: CteOsSefazObsContOS[];
  ObsFisco?: CteOsSefazObsFiscoOS[];
}

export interface CteOsSefazCompraGovReduzidoOS {
  tpEnteGov: number;
  pRedutor: number;
}

export interface CteOsSefazCredPresOS {
  cCredPres: string;
  pCredPres: number;
  vCredPres?: number;
  vCredPresCondSus?: number;
}

export interface CteOsSefazDevTribOS {
  vDevTrib: number;
}

export interface CteOsSefazDifOS {
  pDif: number;
  vDif: number;
}

export interface CteOsSefazDupOS {
  nDup?: string;
  dVenc?: string;
  vDup?: number;
}

export interface CteOsSefazEmitOS {
  CNPJ?: string;
  IE?: string;
  IEST?: string;
  xNome?: string;
  xFant?: string;
  enderEmit?: CteOsSefazEndeEmiOS;
  CRT?: number;
}

export interface CteOsSefazEndeEmiOS {
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

export interface CteOsSefazEnderecoOS {
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

export interface CteOsSefazFatOS {
  nFat?: string;
  vOrig?: number;
  vDesc?: number;
  vLiq?: number;
}

export interface CteOsSefazGCBSOS {
  pCBS: number;
  gDif?: CteOsSefazDifOS;
  gDevTrib?: CteOsSefazDevTribOS;
  gRed?: CteOsSefazRedOS;
  vCBS: number;
}

export interface CteOsSefazGIBSMunOS {
  pIBSMun: number;
  gDif?: CteOsSefazDifOS;
  gDevTrib?: CteOsSefazDevTribOS;
  gRed?: CteOsSefazRedOS;
  vIBSMun: number;
}

export interface CteOsSefazGIBSUFOS {
  pIBSUF: number;
  gDif?: CteOsSefazDifOS;
  gDevTrib?: CteOsSefazDevTribOS;
  gRed?: CteOsSefazRedOS;
  vIBSUF: number;
}

export interface CteOsSefazICMS00OS {
  CST: string;
  vBC: number;
  pICMS: number;
  vICMS: number;
}

export interface CteOsSefazICMS20OS {
  CST: string;
  pRedBC: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteOsSefazICMS45OS {
  CST: string;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteOsSefazICMS90OS {
  CST: string;
  pRedBC?: number;
  vBC: number;
  pICMS: number;
  vICMS: number;
  vCred?: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteOsSefazICMSOutraUFOS {
  CST: string;
  pRedBCOutraUF?: number;
  vBCOutraUF: number;
  pICMSOutraUF: number;
  vICMSOutraUF: number;
  vICMSDeson?: number;
  cBenef?: string;
}

export interface CteOsSefazICMSSNOS {
  CST: string;
  indSN: number;
}

export interface CteOsSefazICMSUFFimOS {
  vBCUFFim: number;
  pFCPUFFim: number;
  pICMSUFFim: number;
  pICMSInter: number;
  vFCPUFFim: number;
  vICMSUFFim: number;
  vICMSUFIni: number;
}

export interface CteOsSefazIdeOS {
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
  indIEToma: number;
  cMunIni?: string;
  xMunIni?: string;
  UFIni?: string;
  cMunFim?: string;
  xMunFim?: string;
  UFFim?: string;
  infPercurso?: CteOsSefazInfPercursoOS[];
  dhCont?: string;
  xJust?: string;
  gCompraGov?: CteOsSefazCompraGovReduzidoOS;
}

export interface CteOsSefazImpOS {
  ICMS00?: CteOsSefazICMS00OS;
  ICMS20?: CteOsSefazICMS20OS;
  ICMS45?: CteOsSefazICMS45OS;
  ICMS90?: CteOsSefazICMS90OS;
  ICMSOutraUF?: CteOsSefazICMSOutraUFOS;
  ICMSSN?: CteOsSefazICMSSNOS;
}

export interface CteOsSefazInfCTeNormOS {
  infServico: CteOsSefazInfServicoOS;
  infDocRef?: CteOsSefazInfDocRefOS[];
  seg?: CteOsSefazSegOS[];
  infModal?: CteOsSefazInfModalOS;
  infCteSub?: CteOsSefazInfCteSubOS;
  refCTeCanc?: string;
  cobr?: CteOsSefazCobrOS;
  infGTVe?: CteOsSefazInfGTVeOS[];
}

export interface CteOsSefazInfCTeSuplOS {
  qrCodCTe?: string;
}

export interface CteOsSefazInfCteCompOS {
  chCTe: string;
}

export interface CteOsSefazInfCteOS {
  versao: string;
  Id?: string;
  ide: CteOsSefazIdeOS;
  compl?: CteOsSefazComplOS;
  emit: CteOsSefazEmitOS;
  toma?: CteOsSefazTomaOS;
  vPrest: CteOsSefazVPrestOS;
  imp: CteOsSefazInfCte_ImpOS;
  infCTeNorm?: CteOsSefazInfCTeNormOS;
  infCteComp?: CteOsSefazInfCteCompOS[];
  autXML?: CteOsSefazAutXMLOS[];
  infRespTec?: CteOsSefazRespTecOS;
}

export interface CteOsSefazInfCteSubOS {
  chCte: string;
}

export interface CteOsSefazInfCte_ImpOS {
  ICMS: CteOsSefazImpOS;
  vTotTrib?: number;
  infAdFisco?: string;
  ICMSUFFim?: CteOsSefazICMSUFFimOS;
  infTribFed?: CteOsSefazInfTribFedOS;
  IBSCBS?: CteOsSefazTribCTeOS;
  vTotDFe?: number;
}

export interface CteOsSefazInfDocRefOS {
  nDoc?: string;
  serie?: string;
  subserie?: string;
  dEmi?: string;
  vDoc?: number;
  chBPe?: string;
}

export interface CteOsSefazInfFretamentoOS {
  tpFretamento: number;
  dhViagem?: string;
}

export interface CteOsSefazInfGTVeOS {
  chCTe: string;
  Comp: CteOsSefazInfGTVe_CompOS[];
}

export interface CteOsSefazInfGTVe_CompOS {
  tpComp: number;
  vComp: number;
  xComp?: string;
}

export interface CteOsSefazInfModalOS {
  versaoModal: string;
  rodoOS?: CteOsSefazRodoOS;
}

export interface CteOsSefazInfPercursoOS {
  UFPer: string;
}

export interface CteOsSefazInfQOS {
  qCarga: number;
}

export interface CteOsSefazInfServicoOS {
  xDescServ: string;
  infQ?: CteOsSefazInfQOS;
}

export interface CteOsSefazInfTribFedOS {
  vPIS?: number;
  vCOFINS?: number;
  vIR?: number;
  vINSS?: number;
  vCSLL?: number;
}

export interface CteOsSefazObsContOS {
  xCampo: string;
  xTexto: string;
}

export interface CteOsSefazObsFiscoOS {
  xCampo: string;
  xTexto: string;
}

export interface CteOsSefazPropOS {
  CPF?: string;
  CNPJ?: string;
  TAF?: string;
  NroRegEstadual?: string;
  xNome: string;
  IE?: string;
  UF?: string;
  tpProp: number;
}

export interface CteOsSefazRedOS {
  pRedAliq: number;
  pAliqEfet: number;
}

export interface CteOsSefazRespTecOS {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: number;
  CSRT?: string;
  hashCSRT?: string;
}

export interface CteOsSefazRodoOS {
  TAF?: string;
  NroRegEstadual?: string;
  veic?: CteOsSefazVeicOS;
  infFretamento?: CteOsSefazInfFretamentoOS;
}

export interface CteOsSefazSegOS {
  respSeg: number;
  xSeg?: string;
  nApol?: string;
}

export interface CteOsSefazTomaOS {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome: string;
  xFant?: string;
  fone?: string;
  enderToma: CteOsSefazEnderecoOS;
  email?: string;
}

export interface CteOsSefazTribCTeOS {
  CST: string;
  cClassTrib?: string;
  gIBSCBS?: CteOsSefazCIBSOS;
}

export interface CteOsSefazTribCompraGovOS {
  pAliqIBSUF?: number;
  vTribIBSUF: number;
  pAliqIBSMun?: number;
  vTribIBSMun: number;
  pAliqCBS?: number;
  vTribCBS: number;
}

export interface CteOsSefazTribRegularOS {
  CSTReg: string;
  cClassTribReg: string;
  pAliqEfetRegIBSUF: number;
  vTribRegIBSUF: number;
  pAliqEfetRegIBSMun: number;
  vTribRegIBSMun: number;
  pAliqEfetRegCBS: number;
  vTribRegCBS: number;
}

export interface CteOsSefazVPrestOS {
  vTPrest: number;
  vRec: number;
  Comp?: CteOsSefazCompOS[];
}

export interface CteOsSefazVeicOS {
  placa: string;
  RENAVAM?: string;
  prop?: CteOsSefazPropOS;
  UF?: string;
}