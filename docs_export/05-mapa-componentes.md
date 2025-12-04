# Mapa de Componentes e Fluxos

## Camada de UI (React)
- **AppControleNcs**
  - Renderiza cabeçalho com status do token e botões de ação.
  - Lista territórios (cards) usando dados carregados do YAML.
  - Gerencia modais para editar casas, atribuir servos e atualizar status.
  - Articula estados derivados (`loading`, `error`, `selectedTerritory`, `selectedHouse`).
- **Componentes utilitários internos** (inline ou funções auxiliares)
  - `renderHouseCard`: encapsula exibição de cada casa, incluindo badges de status.
  - `handleUpdateYaml`: função que prepara payload e chama GitHub API para gravar mudanças.

## Fluxo de Dados
1. **Inicialização**: ao montar, o app tenta carregar `public/token.json` para verificar se existe token pré-ofuscado.
2. **Autenticação**: usuário informa PAT. O token é armazenado em memória e usado para chamadas fetch com `Authorization: token <PAT>`.
3. **Carregamento do YAML**: fetch para a API GitHub (`repos/:owner/:repo/contents/data/db.yml`), seguido de `js-yaml` para parser.
4. **Mutação**: ao salvar alterações, o app envia PUT com conteúdo atualizado em Base64 e sha do arquivo.
5. **Feedback**: estados locais exibem toasts/modais de sucesso ou erro.

## Integração com Playwright
- Teste principal (`tests/pat-flow.spec.ts`): simula inserção de token, espera carregamento e verifica se cards de territórios aparecem.
- Usa `page.route` para mock de respostas onde necessário, mantendo o fluxo determinístico.

## Scripts Complementares
- **publish-token.mjs**: transforma um PAT real em fragmentos codificados e atualiza `public/token.json`.
- **validate-token-flow.mjs**: garante que token publicado pode ser remontado antes de uso (manual, se executado).

## Pontos de Extensão
- Possível extração de subcomponentes do `AppControleNcs` para melhorar legibilidade (ex.: `TokenBanner`, `TerritoryCard`, `HouseModal`).
- Inserção futura de cache local ou IndexedDB para permitir modo offline.
- Integração com GraphQL em vez de REST para otimizar fetch de arquivos no GitHub.
