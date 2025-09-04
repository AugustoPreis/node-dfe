import { HttpClient } from '../core/httpClient';
import { ContaCota, ContaCotaListagem } from '../types/conta';

const BASE = '/conta';

export class ContaService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async listarCotas(): Promise<ContaCotaListagem> {
    return this.httpClient.get<ContaCotaListagem>(`${BASE}/cotas`);
  }

  async consultarCota(nome: string): Promise<ContaCota> {
    return this.httpClient.get<ContaCota>(`${BASE}/cotas/${nome}`);
  }
}