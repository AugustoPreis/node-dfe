import { AxiosError, HttpStatusCode } from 'axios';
import { NuvemFiscalApiError, handleApiError, extractErrorDetails } from '../errorHandler';

describe('NuvemFiscalApiError', () => {
  it('deve criar uma instância com valores padrão quando não especificados', () => {
    const error = new NuvemFiscalApiError('Mensagem de teste');

    expect(error).toBeInstanceOf(NuvemFiscalApiError);
    expect(error.message).toBe('Mensagem de teste');
    expect(error.status).toBe(HttpStatusCode.InternalServerError);
    expect(error.code).toBe('ERRO_DESCONHECIDO');
    expect(error.details).toEqual([]);
  });

  it('deve criar uma instância com todos os valores fornecidos', () => {
    const error = new NuvemFiscalApiError(
      'Erro de validação',
      HttpStatusCode.BadRequest,
      'VALIDACAO_FALHOU',
      ['O campo X é obrigatório.'],
    );

    expect(error.message).toBe('Erro de validação');
    expect(error.status).toBe(400);
    expect(error.code).toBe('VALIDACAO_FALHOU');
    expect(error.details).toEqual(['O campo X é obrigatório.']);
  });
});

describe('extractErrorDetails', () => {
  it('deve extrair mensagem e código de um objeto simples', () => {
    const data = { message: 'Acesso negado.', code: 'ACESSO_NEGADO' };
    const result = extractErrorDetails(data);

    expect(result.message).toBe('Acesso negado.');
    expect(result.code).toBe('ACESSO_NEGADO');
    expect(result.errors).toEqual([]);
  });

  it('deve extrair a mensagem da chave "error_description" se "message" não existir', () => {
    const data = { error_description: 'Token inválido.' };
    const result = extractErrorDetails(data);

    expect(result.message).toBe('Token inválido.');
  });

  it('deve extrair um array de erros detalhados', () => {
    const data = {
      message: 'Erro de validação.',
      errors: [
        { message: 'CPF inválido.' },
        { message: 'Email já cadastrado.' }
      ],
    };
    const result = extractErrorDetails(data);

    expect(result.message).toBe('Erro de validação.');
    expect(result.errors).toEqual(['CPF inválido.', 'Email já cadastrado.']);
  });

  it('deve encontrar detalhes de erro em um objeto profundamente aninhado', () => {
    const data = {
      request_id: 'xyz-123',
      error_info: {
        details: {
          code: 'ERRO_PROCESSAMENTO',
          message: 'Falha no processamento do lote.',
          validation_errors: {
            errors: [{ message: 'Nota fiscal 123 com erro.' }],
          },
        },
      },
    };
    const result = extractErrorDetails(data);

    expect(result.message).toBe('Falha no processamento do lote.');
    expect(result.code).toBe('ERRO_PROCESSAMENTO');
    expect(result.errors).toEqual(['Nota fiscal 123 com erro.']);
  });

  it('deve usar a primeira mensagem de "errors" como mensagem principal se nenhuma outra for encontrada', () => {
    const data = {
      errors: [
        { message: 'Ocorreu um erro no campo X.' },
        { message: 'O campo Y é inválido.' }
      ],
    };
    const result = extractErrorDetails(data);

    expect(result.message).toBe('Ocorreu um erro no campo X.');
  });
});

describe('handleApiError', () => {
  it('deve lidar com um erro de resposta da API (error.response)', () => {
    const errorData = { message: 'Recurso não encontrado.', code: 'NAO_ENCONTRADO' };
    const axiosError = {
      isAxiosError: true,
      response: {
        data: errorData,
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
        headers: {},
        config: {},
      },
    } as AxiosError;

    const apiError = handleApiError(axiosError);

    expect(apiError).toBeInstanceOf(NuvemFiscalApiError);
    expect(apiError.status).toBe(404);
    expect(apiError.message).toBe('Recurso não encontrado.');
    expect(apiError.code).toBe('NAO_ENCONTRADO');
  });

  it('deve lidar com um erro de resposta da API que retorna um Buffer', () => {
    const errorData = { message: 'Erro interno no servidor.' };
    const bufferData = Buffer.from(JSON.stringify(errorData));
    const axiosError = {
      isAxiosError: true,
      response: {
        data: bufferData,
        status: HttpStatusCode.InternalServerError,
      },
    } as AxiosError;

    const apiError = handleApiError(axiosError);

    expect(apiError.status).toBe(500);
    expect(apiError.message).toBe('Erro interno no servidor.');
  });

  it('deve lidar com um erro de timeout (error.request sem response)', () => {
    const axiosError = {
      isAxiosError: true,
      request: {},
      message: 'Timeout de 10000ms excedido',
    } as AxiosError;

    const apiError = handleApiError(axiosError);

    expect(apiError.status).toBe(HttpStatusCode.ServiceUnavailable);
    expect(apiError.message).toBe('Não foi possível se conectar à API do Nuvem Fiscal.');
    expect(apiError.code).toBe('SEM_RESPOSTA');
  });

  it('deve lidar com um erro de configuração do request', () => {
    const axiosError = {
      isAxiosError: true,
      message: 'Erro ao configurar o request',
    } as AxiosError;

    const apiError = handleApiError(axiosError);

    expect(apiError.status).toBe(HttpStatusCode.InternalServerError);
    expect(apiError.message).toBe('Erro ao configurar o request');
    expect(apiError.code).toBe('ERRO_CONFIGURACAO_SDK');
  });
});