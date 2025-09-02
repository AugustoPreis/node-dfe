# Node DF-e - SDK para Nuvem Fiscal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**`node-dfe`** é um SDK para Node.js, escrito em TypeScript, projetado para simplificar e agilizar a integração com a [API do Nuvem Fiscal](https://nuvemfiscal.com.br/). Abstraia toda a complexidade de autenticação, requisições HTTP e tratamento de erros, e foque no que realmente importa: a regra de negócio da sua aplicação.

## 💾 Instalação
O projeto ainda não possui um repositório NPM

## 🚀 Guia Rápido (Quick Start)

Começar a usar é muito simples. Primeiro, importe a classe principal e a instancie com seu token de acesso.

```typescript
import { NuvemFiscalApi } from 'node-dfe';
// Se estiver usando CommonJS (require)
// const { NuvemFiscalApi } = require('node-dfe');

// 1. Configure o SDK
const api = new NuvemFiscalApi({
    environment: 'homologacao', // ou 'producao'
    timeout: 30000 // Opcional: timeout em milissegundos para as requisições
});
```

### Emitindo uma NFS-e

Veja como emitir uma Nota Fiscal de Serviço. O SDK cuida de toda a comunicação com a API.

```typescript
async function emitirNotaFiscal() {
    try {
        const dadosDaNfse = {
            // ...
            // Preencha aqui o objeto completo com os dados da NF-e
            // conforme a documentação da Nuvem Fiscal.
        };

        console.log('Enviando para emissão...');
        const resposta = await api.nfse.emitir(dadosDaNfse);

        console.log('Emissão solicitada com sucesso!');
        console.log('ID da NF-e:', resposta.id);
        console.log('Status:', resposta.status);

    } catch (error) {
        console.error('Ocorreu um erro ao emitir a NFS-e:');
        
        // O erro é uma instância de NuvemFiscalApiError
        console.error('Status Code:', error.status);
        console.error('Mensagem:', error.message);
        console.error('Código do Erro:', error.code);
        
        // Detalhes, como erros de validação
        if (error.details) {
            console.error('Detalhes:', JSON.stringify(error.details, null, 2));
        }
    }
}

emitirNotaFiscal();
```

### Consultando o status de uma NFS-e

Após a emissão, você pode consultar o status usando o `id` retornado.

```typescript
async function consultarNotaFiscal(idDaNfse: string) {
    try {
        console.log(`Consultando NF-e com ID: ${idDaNfse}...`);
        const nfse = await api.nfse.consultar(idDaNfse);

        console.log('Consulta realizada com sucesso!');
        console.log('Status:', nfse.status);
        console.log('Motivo:', nfse.motivo);

    } catch (error) {
        console.error('Erro ao consultar a NFS-e:', error.message);
    }
}

// Exemplo de uso:
// consultarNotaFiscal('id-da-nfse-retornado-na-emissao');
```

## 📖 API

A API é dividida por serviços:

* **`api.nfse`**: Métodos relacionados à Nota Fiscal de Serviço Eletrônica (NFS-e).

Consulte a documentação oficial do [Nuvem Fiscal](https://dev.nuvemfiscal.com.br/docs/api/) para ver os formatos de dados exatos para cada método.

## ⚠️ Tratamento de Erros

Quando uma chamada à API falha, o SDK lança um erro do tipo `NuvemFiscalApiError`. Este objeto contém informações valiosas para depuração:

* `message`: A mensagem de erro principal.
* `status`: O status code HTTP da resposta (ex: `400`, `401`, `500`).
* `code`: Um código de erro interno fornecido pela API do Nuvem Fiscal.
* `details`: Um objeto ou array contendo detalhes específicos do erro, como falhas de validação de campos.

## 🤝 Contribuições

Contribuições são muito bem-vindas! Se você quer adicionar uma funcionalidade, corrigir um bug ou melhorar a documentação, por favor leia nosso [Guia de Contribuição](CONTRIBUTING.md).

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).