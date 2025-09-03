export interface Endereco {
  endNac?: EnderNac;
  endExt?: EnderExt;
  xLgr?: string;
  tpLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
}

export interface EnderNac {
  cMun?: string;
  CEP?: string;
}

export interface EnderExt {
  cPais: string;
  cEndPost: string;
  xCidade: string;
  xEstProvReg: string;
}

export interface EnderecoSimples {
  CEP?: string;
  endExt?: EnderExtSimples;
  xLgr: string;
  tpLgr?: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
}

export interface EnderExtSimples {
  cEndPost: string;
  xCidade: string;
  xEstProvReg: string;
}