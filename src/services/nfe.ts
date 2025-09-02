import { HttpClient } from '../core/httpClient';

const BASE = '/nfe';

export class NFeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
}