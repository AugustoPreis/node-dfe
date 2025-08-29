# Node DF-e - SDK para Nuvem Fiscal

[![NPM Version](https://img.shields.io/npm/v/node-dfe.svg)](https://www.npmjs.com/package/node-dfe)
[![Build Status](https://img.shields.io/travis/com/seu-usuario/node-dfe.svg)](https://travis-ci.com/seu-usuario/node-dfe)
[![Test Coverage](https://img.shields.io/coveralls/github/seu-usuario/node-dfe.svg)](https://coveralls.io/github/seu-usuario/node-dfe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**`node-dfe`** é um SDK para Node.js, escrito em TypeScript, projetado para simplificar e agilizar a integração com a [API do Nuvem Fiscal](https://nuvemfiscal.com.br/). Abstraia toda a complexidade de autenticação, requisições HTTP e tratamento de erros, e foque no que realmente importa: a regra de negócio da sua aplicação.

## ✨ Features

* **Tipagem Forte**: Desenvolvido 100% em TypeScript para segurança e autocompletar.
* **Moderno**: Baseado em Promises e `async/await`.
* **Modular**: Funções separadas por tipo de documento (`nfe`, `nfse`, `cte`, etc.).
* **Tratamento de Erros**: Erros da API são encapsulados em classes customizadas para fácil depuração.
* **Configuração Simples**: Configure o ambiente (produção/homologação) e timeouts com facilidade.
* **Leve e com poucas dependências**: Usa apenas o `axios` para as requisições HTTP.

## 💾 Instalação

```bash
npm install node-dfe
```
ou
```bash
yarn add node-dfe
```

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

### Emitindo uma NF-e

Veja como emitir uma Nota Fiscal Eletrônica. O SDK cuida de toda a comunicação com a API.

```typescript
async function emitirNotaFiscal() {
    try {
        const dadosDaNfe = {
            // ...
            // Preencha aqui o objeto completo com os dados da NF-e
            // conforme a documentação da Nuvem Fiscal.
            // Exemplo:
            natureza_operacao: 'VENDA DE MERCADORIA',
            destinatario: {
                nome: "CLIENTE DE TESTE",
                cpf_cnpj: "01234567891",
                // ...
            },
            produtos: [
                {
                    descricao: "PRODUTO DE TESTE",
                    ncm: "39269090",
                    cfop: "5102",
                    valor_unitario: 10.50,
                    quantidade: 2,
                    // ...
                }
            ]
            // ...
        };

        console.log('Enviando para emissão...');
        const resposta = await api.nfe.emitir(dadosDaNfe);

        console.log('Emissão solicitada com sucesso!');
        console.log('ID da NF-e:', resposta.id);
        console.log('Status:', resposta.status);

    } catch (error) {
        console.error('Ocorreu um erro ao emitir a NF-e:');
        
        // O erro é uma instância de NuvemFiscalApiError
        console.error('Status Code:', error.status);
        console.error('Mensagem:', error.message);
        console.error('Código do Erro:', error.code);
        
        // Detalhes, como erros de validação
        if (error.errors) {
            console.error('Detalhes:', JSON.stringify(error.details, null, 2));
        }
    }
}

emitirNotaFiscal();
```

### Consultando o status de uma NF-e

Após a emissão, você pode consultar o status usando o `id` retornado.

```typescript
async function consultarNotaFiscal(idDaNfe: string) {
    try {
        console.log(`Consultando NF-e com ID: ${idDaNfe}...`);
        const nfe = await api.nfe.consultar(idDaNfe);

        console.log('Consulta realizada com sucesso!');
        console.log('Status:', nfe.status);
        console.log('Motivo:', nfe.motivo);
        
        if (nfe.status === 'autorizado') {
            console.log('XML:', nfe.xml);
            console.log('PDF:', nfe.pdf);
        }

    } catch (error) {
        console.error('Erro ao consultar a NF-e:', error.message);
    }
}

// Exemplo de uso:
// consultarNotaFiscal('uuid-da-nfe-retornado-na-emissao');
```

## 📖 API

A API é dividida por serviços:

* **`api.nfe`**: Métodos relacionados à Nota Fiscal Eletrônica (NF-e).
* **`api.nfse`**: Métodos relacionados à Nota Fiscal de Serviço Eletrônica (NFS-e).
* **`api.cte`**: Métodos relacionados ao Conhecimento de Transporte Eletrônico (CT-e).
* **`api.dfe`**: Métodos para distribuição de DF-e.

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