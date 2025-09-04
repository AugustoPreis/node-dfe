import { Ambiente } from './common';

export interface DcePedidoCancelamento {
  justificativa?: string;
}

export interface DcePedidoEmissao {
  infDCe: DceSefazInfDCe;
  infSolicDCe: DceSefazInfSolicDCe;
  ambiente: Ambiente;
  referencia?: string;
}

export interface DceSefazAutXML {
  CNPJ?: string;
  CPF?: string;
}

export interface DceSefazDest {
  CNPJ?: string;
  CPF?: string;
  idOutros?: string;
  xNome: string;
  enderDest: DceSefazEndeDest;
}

export interface DceSefazDet {
  nItem: number;
  prod: DceSefazProd;
  infAdProd?: string;
}

export interface DceSefazECT {
  CNPJ: string;
  xNome: string;
}

export interface DceSefazEmit {
  CNPJ?: string;
  CPF?: string;
  xNome?: string;
  enderEmit?: DceSefazEndeEmi;
}

export interface DceSefazEndeDest {
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  UF: string;
  CEP: string;
  cPais: string;
  xPais: string;
  fone?: string;
  email?: string;
}

export interface DceSefazEndeEmi {
  xLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  cMun?: string;
  xMun?: string;
  UF?: string;
  CEP?: string;
  cPais: string;
  xPais: string;
  fone?: string;
}

export interface DceSefazFisco {
  CNPJ: string;
  xOrgao: string;
  UF: string;
}

export interface DceSefazIde {
  cUF: number;
  cDC?: string;
  mod?: number;
  serie: number;
  nDC: number;
  dhEmi: string;
  tpEmis: number;
  tpEmit: number;
  nSiteAutoriz: number;
  cDV?: number;
  tpAmb?: number;
  verProc: string;
}

export interface DceSefazInfAdic {
  infAdFisco?: string;
  infCpl?: string;
  infAdMarketplace?: string;
  infAdECT?: string;
  obsEmit?: DceSefazObsEmit[];
  obsFisco?: DceSefazObsFisco[];
  obsMarketplace?: DceSefazObsMarketplace[];
  obsECT?: DceSefazObsECT[];
}

export interface DceSefazInfDCe {
  versao: string;
  Id?: string;
  ide: DceSefazIde;
  emit: DceSefazEmit;
  Fisco?: DceSefazFisco;
  Marketplace?: DceSefazMarketplace;
  Transportadora?: DceSefazTransportadora;
  ECT?: DceSefazECT;
  dest: DceSefazDest;
  autXML?: DceSefazAutXML[];
  det: DceSefazDet[];
  total: DceSefazTotal;
  transp: DceSefazTransp;
  infAdic?: DceSefazInfAdic;
  infDec?: DceSefazInfDec;
}

export interface DceSefazInfDec {
  xObs1?: string;
  xObs2?: string;
}

export interface DceSefazInfSolicDCe {
  xSolic: string;
}

export interface DceSefazMarketplace {
  CNPJ: string;
  xNome: string;
  Site: string;
}

export interface DceSefazObsECT {
  xCampo?: string;
  xTexto: string;
}

export interface DceSefazObsEmit {
  xCampo?: string;
  xTexto: string;
}

export interface DceSefazObsFisco {
  xCampo?: string;
  xTexto: string;
}

export interface DceSefazObsMarketplace {
  xCampo?: string;
  xTexto: string;
}

export interface DceSefazProd {
  xProd: string;
  NCM: string;
  qCom: number;
  vUnCom: number;
  vProd: number;
}

export interface DceSefazTotal {
  vDC: number;
}

export interface DceSefazTransp {
  modTrans: number;
  CNPJTransp: string;
}

export interface DceSefazTransportadora {
  CNPJ: string;
  xNome: string;
}