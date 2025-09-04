import { Ambiente } from './common';
import { DfeAutorEvento, StatusEventoDfe } from './dfe';

export interface MdfeConsultaNaoEncerradosQuery {
  cpfCnpj: string;
}

export interface MdfeNaoEncerrado {
  chMDFe: string;
  nProt: string;
}

export interface MdfeNaoEncerrados {
  tpAmb?: number;
  verAplic?: string;
  cStat: number;
  xMotivo?: string;
  cUF?: number;
  infMDFe?: MdfeNaoEncerrado[];
}

export interface MdfePedidoInclusaoCondutor {
  nome_condutor: string;
  cpf_condutor: string;
}

export interface MdfeInclusaoCondutor {
  nome_condutor?: string;
  cpf_condutor?: string;
  id?: string;
  ambiente?: 'homologacao' | 'producao';
  status?: 'pendente' | 'registrado' | 'rejeitado' | 'erro';
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

export interface MdfeDocumentoVinculado {
  codigo_municipio_descarga?: string;
  municipio_descarga?: string;
  chave_acesso_nfe?: string;
}

export interface MdfeEncerramento {
  data_encerramento?: string;
  uf?: string;
  codigo_municipio?: string;
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

export interface MdfeInclusaoCondutor {
  nome_condutor?: string;
  cpf_condutor?: string;
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

export interface MdfeInclusaoDfe {
  codigo_municipio_carrega?: string;
  municipio_carrega?: string;
  documentos?: MdfeDocumentoVinculado[];
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

export interface MdfeNaoEncerrado {
  chMDFe: string;
  nProt: string;
}

export interface MdfeNaoEncerrados {
  tpAmb?: number;
  verAplic?: string;
  cStat: number;
  xMotivo?: string;
  cUF?: number;
  infMDFe?: MdfeNaoEncerrado[];
}

export interface MdfePedidoCancelamento {
  justificativa?: string;
}

export interface MdfePedidoEmissao {
  infMDFe: MdfeSefazInfMDFe;
  infMDFeSupl?: MdfeSefazInfMDFeSupl;
  ambiente: Ambiente;
  referencia?: string;
}

export interface MdfePedidoEmissaoLote {
  documentos?: MdfePedidoEmissao[];
  ambiente: Ambiente;
  referencia?: string;
  id_lote: string;
}

export interface MdfePedidoInclusaoDfe {
  codigo_municipio_carrega?: string;
  municipio_carrega?: string;
  documentos?: MdfeDocumentoVinculado[];
  protocolo_autorizacao?: string;
}

export interface MdfePedidoEncerramento {
  data_encerramento?: string;
  uf: string;
  codigo_municipio: string;
}

export interface MdfePedidoInclusaoCondutor {
  nome_condutor: string;
  cpf_condutor: string;
}

export interface MdfePedidoInclusaoDfe {
  codigo_municipio_carrega?: string;
  municipio_carrega?: string;
  documentos?: MdfeDocumentoVinculado[];
  protocolo_autorizacao?: string;
}

export interface MdfeSefazAereo {
  nac: string;
  matr: string;
  nVoo: string;
  cAerEmb: string;
  cAerDes: string;
  dVoo: string;
}

export interface MdfeSefazAquav {
  irin: string;
  tpEmb: string;
  cEmbar: string;
  xEmbar: string;
  nViag: string;
  cPrtEmb: string;
  cPrtDest: string;
  prtTrans?: string;
  tpNav?: number;
  infTermCarreg?: MdfeSefazInfTermCarreg[];
  infTermDescarreg?: MdfeSefazInfTermDescarreg[];
  infEmbComb?: MdfeSefazInfEmbComb[];
  infUnidCargaVazia?: MdfeSefazInfUnidCargaVazia[];
  infUnidTranspVazia?: MdfeSefazInfUnidTranspVazia[];
  MMSI?: string;
}

export interface MdfeSefazAutXML {
  CNPJ?: string;
  CPF?: string;
}

export interface MdfeSefazComp {
  tpComp: string;
  vComp: number;
  xComp?: string;
}

export interface MdfeSefazCondutor {
  xNome: string;
  CPF: string;
}

export interface MdfeSefazDisp {
  CNPJForn: string;
  CNPJPg?: string;
  CPFPg?: string;
  nCompra?: string;
  vValePed: number;
  tpValePed?: string;
}

export interface MdfeSefazEmit {
  CNPJ?: string;
  CPF?: string;
  IE?: string;
  xNome?: string;
  xFant?: string;
  enderEmit?: MdfeSefazEndeEmi;
}

export interface MdfeSefazEndeEmi {
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

export interface MdfeSefazFerrov {
  trem: MdfeSefazTrem;
  vag: MdfeSefazVag[];
}

export interface MdfeSefazIde {
  cUF: number;
  tpAmb?: number;
  tpEmit: number;
  tpTransp?: number;
  mod?: number;
  serie: number;
  nMDF: number;
  cMDF?: string;
  cDV?: number;
  modal: number;
  dhEmi: string;
  tpEmis: number;
  procEmi: string;
  verProc: string;
  UFIni: string;
  UFFim: string;
  infMunCarrega: MdfeSefazInfMunCarrega[];
  infPercurso?: MdfeSefazInfPercurso[];
  dhIniViagem?: string;
  indCanalVerde?: number;
  indCarregaPosterior?: number;
}

export interface MdfeSefazInfANTT {
  RNTRC?: string;
  infCIOT?: MdfeSefazInfCIOT[];
  valePed?: MdfeSefazValePed;
  infContratante?: MdfeSefazInfContratante[];
  infPag?: MdfeSefazInfPag[];
}

export interface MdfeSefazInfAdic {
  infAdFisco?: string;
  infCpl?: string;
}

export interface MdfeSefazInfBanc {
  codBanco?: string;
  codAgencia?: string;
  CNPJIPEF?: string;
  PIX?: string;
}

export interface MdfeSefazInfCIOT {
  CIOT?: string;
  CPF?: string;
  CNPJ?: string;
}

export interface MdfeSefazInfCTe {
  chCTe: string;
  SegCodBarra?: string;
  indReentrega?: number;
  infUnidTransp?: MdfeSefazUnidadeTransp[];
  peri?: MdfeSefazPeri[];
  infEntregaParcial?: MdfeSefazInfEntregaParcial;
  indPrestacaoParcial?: number;
  infNFePrestParcial?: MdfeSefazInfNFePrestParcial[];
}

export interface MdfeSefazInfContratante {
  xNome?: string;
  CPF?: string;
  CNPJ?: string;
  idEstrangeiro?: string;
  infContrato?: MdfeSefazInfContrato;
}

export interface MdfeSefazInfContrato {
  NroContrato: string;
  vContratoGlobal: number;
}

export interface MdfeSefazInfDoc {
  infMunDescarga: MdfeSefazInfMunDescarga[];
}

export interface MdfeSefazInfEmbComb {
  cEmbComb: string;
  xBalsa: string;
}

export interface MdfeSefazInfEntregaParcial {
  qtdTotal: number;
  qtdParcial: number;
}

export interface MdfeSefazInfLocalCarrega {
  CEP?: string;
  latitude?: string;
  longitude?: string;
}

export interface MdfeSefazInfLocalDescarrega {
  CEP?: string;
  latitude?: string;
  longitude?: string;
}

export interface MdfeSefazInfLotacao {
  infLocalCarrega: MdfeSefazInfLocalCarrega;
  infLocalDescarrega: MdfeSefazInfLocalDescarrega;
}

export interface MdfeSefazInfMDFe {
  versao: string;
  Id?: string;
  ide: MdfeSefazIde;
  emit: MdfeSefazEmit;
  infModal: MdfeSefazInfModal;
  infDoc: MdfeSefazInfDoc;
  seg?: MdfeSefazSeg[];
  prodPred?: MdfeSefazProdPred;
  tot: MdfeSefazTot;
  lacres?: MdfeSefazLacres[];
  autXML?: MdfeSefazAutXML[];
  infAdic?: MdfeSefazInfAdic;
  infRespTec?: MdfeSefazRespTec;
  infSolicNFF?: MdfeSefazInfSolicNFF;
}

export interface MdfeSefazInfMDFeSupl {
  qrCodMDFe?: string;
}

export interface MdfeSefazInfMDFeTransp {
  chMDFe: string;
  indReentrega?: number;
  infUnidTransp?: MdfeSefazUnidadeTransp[];
  peri?: MdfeSefazInfMDFeTransp_Peri[];
}

export interface MdfeSefazInfMDFeTransp_Peri {
  nONU: string;
  xNomeAE?: string;
  xClaRisco?: string;
  grEmb?: string;
  qTotProd: string;
  qVolTipo?: string;
}

export interface MdfeSefazInfModal {
  versaoModal: string;
  aereo?: MdfeSefazAereo;
  rodo?: MdfeSefazRodo;
  aquav?: MdfeSefazAquav;
  ferrov?: MdfeSefazFerrov;
}

export interface MdfeSefazInfMunCarrega {
  cMunCarrega: string;
  xMunCarrega: string;
}

export interface MdfeSefazInfMunDescarga {
  cMunDescarga: string;
  xMunDescarga: string;
  infCTe?: MdfeSefazInfCTe[];
  infNFe?: MdfeSefazInfNFe[];
  infMDFeTransp?: MdfeSefazInfMDFeTransp[];
}

export interface MdfeSefazInfNFe {
  chNFe: string;
  SegCodBarra?: string;
  indReentrega?: number;
  infUnidTransp?: MdfeSefazUnidadeTransp[];
  peri?: MdfeSefazInfNFe_Peri[];
}

export interface MdfeSefazInfNFePrestParcial {
  chNFe: string;
}

export interface MdfeSefazInfNFe_Peri {
  nONU: string;
  xNomeAE?: string;
  xClaRisco?: string;
  grEmb?: string;
  qTotProd: string;
  qVolTipo?: string;
}

export interface MdfeSefazInfPag {
  xNome?: string;
  CPF?: string;
  CNPJ?: string;
  idEstrangeiro?: string;
  Comp: MdfeSefazComp[];
  vContrato: number;
  indAltoDesemp?: number;
  indPag: number;
  vAdiant?: number;
  indAntecipaAdiant?: number;
  infPrazo?: MdfeSefazInfPrazo[];
  tpAntecip?: number;
  infBanc: MdfeSefazInfBanc;
}

export interface MdfeSefazInfPercurso {
  UFPer: string;
}

export interface MdfeSefazInfPrazo {
  nParcela: number;
  dVenc: string;
  vParcela: number;
}

export interface MdfeSefazInfResp {
  respSeg: number;
  CNPJ?: string;
  CPF?: string;
}

export interface MdfeSefazInfSeg {
  xSeg: string;
  CNPJ: string;
}

export interface MdfeSefazInfSolicNFF {
  xSolic: string;
}

export interface MdfeSefazInfTermCarreg {
  cTermCarreg: string;
  xTermCarreg: string;
}

export interface MdfeSefazInfTermDescarreg {
  cTermDescarreg: string;
  xTermDescarreg: string;
}

export interface MdfeSefazInfUnidCargaVazia {
  idUnidCargaVazia: string;
  tpUnidCargaVazia: number;
}

export interface MdfeSefazInfUnidTranspVazia {
  idUnidTranspVazia: string;
  tpUnidTranspVazia: number;
}

export interface MdfeSefazLacRodo {
  nLacre: string;
}

export interface MdfeSefazLacUnidCarga {
  nLacre: string;
}

export interface MdfeSefazLacUnidTransp {
  nLacre: string;
}

export interface MdfeSefazLacres {
  nLacre: string;
}

export interface MdfeSefazPeri {
  nONU: string;
  xNomeAE?: string;
  xClaRisco?: string;
  grEmb?: string;
  qTotProd: string;
  qVolTipo?: string;
}

export interface MdfeSefazProdPred {
  tpCarga: string;
  xProd: string;
  cEAN?: string;
  NCM?: string;
  infLotacao?: MdfeSefazInfLotacao;
}

export interface MdfeSefazProp {
  CPF?: string;
  CNPJ?: string;
  RNTRC: string;
  xNome: string;
  IE?: string;
  UF?: string;
  tpProp: number;
}

export interface MdfeSefazRespTec {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: number;
  CSRT?: string;
  hashCSRT?: string;
}

export interface MdfeSefazRodo {
  infANTT?: MdfeSefazInfANTT;
  veicTracao: MdfeSefazVeicTracao;
  veicReboque?: MdfeSefazVeicReboque[];
  codAgPorto?: string;
  lacRodo?: MdfeSefazLacRodo[];
}

export interface MdfeSefazSeg {
  infResp: MdfeSefazInfResp;
  infSeg?: MdfeSefazInfSeg;
  nApol?: string;
  nAver?: string[];
}

export interface MdfeSefazTot {
  qCTe?: number;
  qNFe?: number;
  qMDFe?: number;
  vCarga: number;
  cUnid: string;
  qCarga: number;
}

export interface MdfeSefazTrem {
  xPref: string;
  dhTrem?: string;
  xOri: string;
  xDest: string;
  qVag: number;
}

export interface MdfeSefazUnidCarga {
  tpUnidCarga: number;
  idUnidCarga: string;
  lacUnidCarga?: MdfeSefazLacUnidCarga[];
  qtdRat?: number;
}

export interface MdfeSefazUnidadeTransp {
  tpUnidTransp: number;
  idUnidTransp: string;
  lacUnidTransp?: MdfeSefazLacUnidTransp[];
  infUnidCarga?: MdfeSefazUnidCarga[];
  qtdRat?: number;
}

export interface MdfeSefazVag {
  pesoBC: number;
  pesoR: number;
  tpVag?: string;
  serie: string;
  nVag: number;
  nSeq?: number;
  TU: number;
}

export interface MdfeSefazValePed {
  disp: MdfeSefazDisp[];
  categCombVeic?: string;
}

export interface MdfeSefazVeicReboque {
  cInt?: string;
  placa: string;
  RENAVAM?: string;
  tara: number;
  capKG: number;
  capM3?: number;
  prop?: MdfeSefazVeicReboque_Prop;
  tpCar: string;
  UF?: string;
}

export interface MdfeSefazVeicReboque_Prop {
  CPF?: string;
  CNPJ?: string;
  RNTRC: string;
  xNome: string;
  IE?: string;
  UF?: string;
  tpProp: number;
}

export interface MdfeSefazVeicTracao {
  cInt?: string;
  placa: string;
  RENAVAM?: string;
  tara: number;
  capKG?: number;
  capM3?: number;
  prop?: MdfeSefazProp;
  condutor: MdfeSefazCondutor[];
  tpRod: string;
  tpCar: string;
  UF?: string;
}