export interface ContaCota {
  nome?: string;
  consumo?: number;
  limite?: number;
}

export interface ContaCotaListagem {
  '@count'?: number;
  data?: ContaCota[];
}