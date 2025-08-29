import { HttpClient } from '../core/httpClient';

const BASE = '/nfse';

export class NFSeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async teste() {
    await this.httpClient.get(BASE);
  }
}