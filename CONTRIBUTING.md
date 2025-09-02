# Guia de Contribuição para o Node DF-e

Olá! Ficamos muito felizes pelo seu interesse em contribuir com o projeto. Toda ajuda é bem-vinda, seja na forma de código, documentação, sugestões ou reportando bugs.

Para garantir que o processo seja tranquilo para todos, por favor, siga as diretrizes abaixo.

## 🗣️ Código de Conduta

Este projeto e todos que participam dele são regidos pelo nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em seguir seus termos.

## 🚀 Como Contribuir

### 🐛 Reportando Bugs
Se você encontrou um bug, por favor, abra uma [Issue](https://github.com/AugustoPreis/node-dfe/issues) e descreva o problema com o máximo de detalhes possível, incluindo:
- Versão do SDK e do Node.js.
- Um trecho de código que reproduza o erro.
- O comportamento esperado vs. o que aconteceu.
- Logs de erro ou stack traces.

### ✨ Sugerindo Melhorias
Se você tem uma ideia para uma nova funcionalidade ou melhoria, abra uma [Issue](https://github.com/AugustoPreis/node-dfe/issues) para que possamos discutir.

### 💻 Sua Primeira Contribuição de Código

1.  **Fork o Repositório**: Faça um fork do projeto para a sua conta do GitHub.
2.  **Clone o Fork**: `git clone https://github.com/seu-usuario-github/node-dfe.git`
3.  **Instale as Dependências**: `npm install`
4.  **Crie uma Branch**: Crie uma branch descritiva para a sua alteração.
    ```bash
    git checkout -b feature/adicionar-endpoint-de-inutilizacao
    ```
5.  **Mão na Massa**: Faça suas alterações e **escreva testes** para elas!
6.  **Submeta um Pull Request (PR)**: Envie um PR para a branch `main` do repositório original.

## 🏛️ Arquitetura e Padrões

Para manter o código organizado e consistente, seguimos alguns padrões.

### Estrutura de Pastas
- `src/`: Contém todo o código-fonte em TypeScript.
  - `core/`: A lógica central do SDK (cliente HTTP, autenticação). **Raramente você precisará mexer aqui**.
  - `services/`: Cada arquivo aqui representa um serviço/tipo de documento (`nfe.ts`, `nfse.ts`). **É aqui que a maior parte da lógica de negócio reside.**
  - `types/`: Definições de interfaces do TypeScript para as entradas e saídas da API.
- `tests/`: Contém os testes unitários e de integração.

### Passo a Passo: Adicionando uma Nova Funcionalidade

Vamos supor que você queira adicionar o método `inutilizarNumeracao` ao serviço de NF-e.

1.  **Defina os Tipos (`src/types/nfe.ts`)**
    Primeiro, vá ao arquivo de tipos e crie as interfaces para os dados de entrada (`ParametrosInutilizacao`) e de saída (`InutilizacaoResposta`), conforme a documentação da API.

    ```typescript
    export interface ParametrosInutilizacao {
        justificativa: string;
        // ... outros parâmetros
    }

    export interface InutilizacaoResposta {
        status: string;
        // ... outros campos da resposta
    }
    ```

2.  **Implemente o Método no Serviço (`src/services/nfe.ts`)**
    Abra o arquivo do serviço correspondente e adicione o novo método. Use o `httpClient` para fazer a chamada à API.

    ```typescript
    // Dentro da classe NFeService
    import { ParametrosInutilizacao, InutilizacaoResposta } from '../types/nfeTypes';

    // ...

    async inutilizarNumeracao(dados: ParametrosInutilizacao): Promise<InutilizacaoResposta> {
        return this.httpClient.post<InutilizacaoResposta>(`${BASE}/inutilizacao`, dados);
    }
    ```

3.  **Escreva os Testes (`tests/nfe.service.test.ts`)**
    A parte mais importante! Crie um novo teste para garantir que seu método funciona como esperado. Você pode "mockar" o `httpClient` para não fazer chamadas reais à API durante os testes.

    ```typescript
    // Exemplo de teste com Jest
    it('deve chamar o endpoint de inutilização com os dados corretos', async () => {
        const mockHttpClient = {
            post: jest.fn().mockResolvedValue({ status: 'sucesso' }),
        };
        const nfeService = new NFeService(mockHttpClient as any);

        const dadosInutilizacao = { /* ... */ };
        await nfeService.inutilizarNumeracao(dadosInutilizacao);

        expect(mockHttpClient.post).toHaveBeenCalledWith(
            '/nfe/inutilizacao',
            dadosInutilizacao
        );
    });
    ```

## 🎨 Padrões de Código

- **Linting e Formatação**: Usamos ESLint para manter o código limpo e padronizado. Antes de commitar, rode:
  ```bash
  npm run lint:fix
  ```
- **Comentários**: Documente todas as funcionalidades, explicando o que fazem, seus parâmetros e o que retornam.

Obrigado por ajudar a tornar o `node-dfe` ainda melhor!