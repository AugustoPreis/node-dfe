import { AxiosError, HttpStatusCode } from 'axios';
import { ErrorDetailsResult } from '../types/common';
import { isLiteralObject, isValidErrorArray, isValidString } from './validators';

const ERROR_MESSAGE_KEYS = ['message', 'error_description', 'error', 'code'];

export class NuvemFiscalApiError extends Error {
  public status: number;
  public code: string;
  public details: string[];

  constructor(message: string, status?: number, code?: string, details?: string[]) {
    super(message || 'Ocorreu um erro na API do Nuvem Fiscal.');

    this.name = 'NuvemFiscalApiError';
    this.status = status || HttpStatusCode.InternalServerError;
    this.code = code || 'ERRO_DESCONHECIDO';
    this.details = Array.isArray(details) ? details : [];
  }
}

// Função que converte um AxiosError em nosso erro customizado
export function handleApiError(error: AxiosError): NuvemFiscalApiError {
  if (error.response) { //Resposta foi recebida (com status >= 400)
    const data = error.response.data || {};
    const { message, code, errors } = extractErrorDetails(data);

    return new NuvemFiscalApiError(message, error.response.status, code, errors);
  }

  if (error.request) { //Request foi enviado, mas nenhuma resposta foi recebida antes do timeout
    return new NuvemFiscalApiError('Não foi possível se conectar à API do Nuvem Fiscal.', HttpStatusCode.ServiceUnavailable, 'SEM_RESPOSTA');
  }

  // Erro na configuração do axios (request não foi enviado)
  return new NuvemFiscalApiError(error.message, HttpStatusCode.InternalServerError, 'ERRO_CONFIGURACAO_SDK');
}

/**
 * Percorre recursivamente uma estrutura de dados em busca das informações do erro
 * @param currentData - O nó atual (objeto ou array) a ser inspecionado.
 * @param result - Objeto que acumula os resultados encontrados. É modificado por referência.
 */
function recursiveSearch(
  currentData: unknown,
  result: ErrorDetailsResult,
): void {
  // Otimização: Se já foram encontradas as informações, podemos parar a busca.
  if (isValidString(result.message) && result.errors.length > 0 && result.code) {
    return;
  }

  if (Array.isArray(currentData)) { // Se for um array, busca em cada item.
    for (const item of currentData) {
      recursiveSearch(item, result);
    }
  } else if (isLiteralObject(currentData)) { // Se for um objeto, inspeciona suas chaves.

    // 1. Procura pelo ARRAY DE ERROS
    if (!result.errors.length) {
      const potentialErrors = currentData.errors;

      if (isValidErrorArray(potentialErrors)) {
        result.errors = potentialErrors.map((error) => String(error.message));
      }
    }

    // 2. Procura pela MENSAGEM PRIMITIVA e CÓDIGO DE ERRO
    if (!result.message || !result.code) {
      for (const key of ERROR_MESSAGE_KEYS) {
        const potentialMessage = currentData[key];

        if (potentialMessage && !isLiteralObject(potentialMessage) && !Array.isArray(potentialMessage)) {
          if (!result.message) {
            result.message = String(potentialMessage);
          }

          if (!result.code && key === 'code') {
            result.code = String(potentialMessage);
          }

          if (result.message && result.code) {
            break; // Encontrou a mensagem de maior prioridade.
          }
        }
      }
    }

    // 3. Continua a busca recursiva em todos os valores do objeto
    for (const key in currentData) {
      if (key === 'errors') { // Evita entrar novamente no array de erros que acabamos de encontrar
        continue;
      }

      recursiveSearch(currentData[key], result);
    }
  }
}

/**
 * Extrai a mensagem principal e um array de erros detalhados de um objeto de resposta de erro.
 * A busca por ambos os itens é recursiva e otimizada para uma única varredura.
 * @param data - O payload de erro da resposta da API.
 * @returns Um objeto contendo a `message` e um array opcional de `errors`.
 */
export function extractErrorDetails(data: unknown): ErrorDetailsResult {
  const searchResult: ErrorDetailsResult = { message: '', errors: [] };

  recursiveSearch(data, searchResult);

  //Caso não tenha mensagem válida, utiliza a primeira do array de erros
  if (!isValidString(searchResult.message) && Array.isArray(searchResult.errors) && searchResult.errors.length > 0) {
    searchResult.message = searchResult.errors[0];
  }

  return searchResult;
}