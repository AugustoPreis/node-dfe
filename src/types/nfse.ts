import { Ambiente, Provedor } from './common';

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
  provedor: Provedor;
  ambientes: Ambiente[];
  credenciais: Array<'certificado' | 'login_senha' | 'token'>;
}

export interface ParametrosEmissao {
  provedor?: Provedor;
  ambiente: Ambiente;
  referencia?: string | null;
  infDPS: {
    tpAmb?: 1 | 2 | null;
    dhEmi: string | null;
    verAplic?: string | null;
    dCompet?: string | null;
    subst?: {
      chSubstda: string | null;
      cMotivo: '01' | '02' | '03' | '04' | '05' | '99' | null;
      xMotivo?: string | null;
    };
    prest: {
      CNPJ?: string | null;
      CPF?: string | null;
      regTrib?: {
        regEspTrib?: number | null;
      };
    };
    toma?: {
      orgaoPublico?: boolean | null;
      CNPJ?: string | null;
      CPF?: string | null;
      NIF?: string | null;
      cNaoNIF?: 0 | 1 | 2 | null;
      CAEPF?: string | null;
      IM?: string | null;
      IE?: string | null;
      xNome: string | null;
      end?: {
        endNac?: {
          cMun?: string | null;
          CEP?: string | null;
        };
        endExt?: {
          cPais: string | null;
          cEndPost: string | null;
          xCidade: string | null;
          xEstProvReg: string | null;
        };
        xLgr?: string | null;
        tpLgr?: string | null;
        nro?: string | null;
        xCpl?: string | null;
        xBairro?: string | null;
      };
      fone?: string | null;
      email?: string | null;
    };
    interm?: {
      CNPJ?: string | null;
      CPF?: string | null;
      NIF?: string | null;
      cNaoNIF?: 0 | 1 | 2 | null;
      CAEPF?: string | null;
      IM?: string | null;
      IE?: string | null;
      xNome: string | null;
      end?: {
        endNac?: {
          cMun?: string | null;
          CEP?: string | null;
        };
        endExt?: {
          cPais: string | null;
          cEndPost: string | null;
          xCidade: string | null;
          xEstProvReg: string | null;
        };
        xLgr?: string | null;
        tpLgr?: string | null;
        nro?: string | null;
        xCpl?: string | null;
        xBairro?: string | null;
      };
      fone?: string | null;
      email?: string | null;
    };
    serv: {
      locPrest?: {
        cLocPrestacao?: string | null;
        cPaisPrestacao?: string | null;
      };
      cServ: {
        cTribNac: string | null;
        cTribMun?: string | null;
        CNAE?: string | null;
        xDescServ: string | null;
        cNBS?: string | null;
        cNatOp?: string | null;
        cSitTrib?: string | null;
      };
      comExt?: {
        mdPrestacao: 0 | 1 | 2 | 3 | 4 | null;
        vincPrest: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
        tpMoeda: string | null;
        vServMoeda: string | null;
        mecAFComexP: string | null;
        mecAFComexT: string | null;
        movTempBens: 0 | 1 | 2 | 3 | null;
        nDI?: string | null;
        nRE?: string | null;
        mdic: 0 | 1 | null;
      };
      lsadppu?: {
        categ: number | null;
        objeto: number | null;
        extensao: string | null;
        nPostes: string | null;
      };
      obra?: {
        cObra?: string | null;
        inscImobFisc?: string | null;
        end?: {
          CEP?: string | null;
          endExt?: {
            cEndPost: string | null;
            xCidade: string | null;
            xEstProvReg: string | null;
          };
          xLgr: string | null;
          tpLgr?: string | null;
          nro: string | null;
          xCpl?: string | null;
          xBairro: string | null;
        };
      };
      atvEvento?: {
        xNome?: string | null;
        dtIni: string | null;
        dtFim: string | null;
        idAtvEvt?: string | null;
        end?: {
          CEP?: string | null;
          endExt?: {
            cEndPost: string | null;
            xCidade: string | null;
            xEstProvReg: string | null;
          };
          xLgr: string | null;
          tpLgr?: string | null;
          nro: string | null;
          xCpl?: string | null;
          xBairro: string | null;
        };
      };
      explRod?: {
        categVeic: string | null;
        nEixos: string | null;
        rodagem: number | null;
        sentido: string | null;
        placa: string | null;
        codAcessoPed: string | null;
        codContrato: string | null;
      };
      infoCompl?: {
        idDocTec?: string | null;
        docRef?: string | null;
        xInfComp?: string | null;
      };
    };
    valores: {
      vServPrest: {
        vReceb?: number | null;
        vServ: number | null;
      };
      vDescCondIncond?: {
        vDescIncond?: number | null;
        vDescCond?: number | null;
      };
      vDedRed?: {
        pDR?: number | null;
        vDR?: number | null;
        documentos?: {
          docDedRed: Array<{
            chNFSe?: string | null;
            chNFe?: string | null;
            NFSeMun?: {
              cMunNFSeMun: string | null;
              nNFSeMun: number | null;
              cVerifNFSeMun: string | null;
            };
            NFNFS?: {
              nNFS: number | null;
              modNFS: number | null;
              serieNFS: string | null;
            };
            nDocFisc?: string | null;
            nDoc?: string | null;
            tpDedRed: number | null;
            xDescOutDed?: string | null;
            dtEmiDoc: string | null;
            vDedutivelRedutivel: number | null;
            vDeducaoReducao: number | null;
            fornec: {
              CNPJ?: string | null;
              CPF?: string | null;
              NIF?: string | null;
              cNaoNIF?: 0 | 1 | 2 | null;
              CAEPF?: string | null;
              IM?: string | null;
              IE?: string | null;
              xNome: string | null;
              end?: {
                endNac?: {
                  cMun?: string | null;
                  CEP?: string | null;
                };
                endExt?: {
                  cPais: string | null;
                  cEndPost: string | null;
                  xCidade: string | null;
                  xEstProvReg: string | null;
                };
                xLgr?: string | null;
                tpLgr?: string | null;
                nro?: string | null;
                xCpl?: string | null;
                xBairro?: string | null;
              };
              fone?: string | null;
              email?: string | null;
            };
          }>;
        };
      };
      trib: {
        tribMun: {
          tribISSQN: 1 | 2 | 3 | 4 | null;
          cLocIncid?: string | null;
          cPaisResult?: string | null;
          BM?: {
            tpBM: number | null;
            nBM: string | null;
            vRedBCBM?: number | null;
            pRedBCBM?: number | null;
          };
          exigSusp?: {
            tpSusp: number | null;
            nProcesso: string | null;
          };
          tpImunidade?: number | null;
          vBC?: number | null;
          pAliq?: number | null;
          vISSQN?: number | null;
          tpRetISSQN?: number | null;
          vLiq?: number | null;
        };
        tribFed?: {
          piscofins: {
            CST: string | null;
            vBCPisCofins?: number | null;
            pAliqPis?: number | null;
            pAliqCofins?: number | null;
            vPis?: number | null;
            vCofins?: number | null;
            tpRetPisCofins?: 1 | 2;
          };
          vRetCP?: number | null;
          vRetIRRF?: number | null;
          vRetCSLL?: number | null;
        };
        totTrib?: {
          vTotTrib: {
            vTotTribFed: number | null;
            vTotTribEst: number | null;
            vTotTribMun: number | null;
          };
          pTotTrib: {
            pTotTribFed: number | null;
            pTotTribEst: number | null;
            pTotTribMun: number | null;
          };
          indTotTrib?: number | null;
          pTotTribSN?: number | null;
        };
      };
    };
  };
}

export interface ParametrosEmissaoLote {
  provedor?: Provedor;
  ambiente: Ambiente;
  referencia?: string | null;
  documentos: ParametrosEmissao[];
}