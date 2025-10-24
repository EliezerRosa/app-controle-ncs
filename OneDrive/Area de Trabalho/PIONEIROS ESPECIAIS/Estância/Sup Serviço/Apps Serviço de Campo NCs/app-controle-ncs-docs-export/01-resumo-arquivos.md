# Resumo Técnico por Arquivo

## Estrutura Principal (src/)
- **App.tsx**: Exporta o componente raiz (`AppControleNcs`).
- **AppControleNcs.tsx**: Núcleo da aplicação React; contém estados, efeitos e todos os fluxos para carregamento de dados, modais, notificações e mutações que refletem nos YAMLs no GitHub.
- **main.tsx**: Ponto de entrada da aplicação Vite/React, monta o ReactDOM no `#root`.
- **index.css**: Responsável por importar as diretivas Tailwind (`@tailwind base/components/utilities`) e definir a tipografia global.
- **types/js-yaml.d.ts**: Declaração complementar para o pacote `js-yaml` dentro do contexto TypeScript.

## Dados e Configuração
- **data/db.yml**: Banco de dados principal em YAML. Define `appConfig` (super admin + papéis) e todos os territórios, quadras e casas. Este arquivo é versionado no GitHub e serve como single source of truth.
- **public/token.json** e **docs/token.json**: Artefatos publicados com o PAT ofuscado. A estrutura inclui `payload` fragmentado, `fragmentSize`, `charSet` e `checksum` para validação antes do uso.

## Build e Deploy
- **vite.config.ts**: Configuração do bundler Vite, inclusive base path para servir via GitHub Pages.
- **postcss.config.cjs** / **tailwind.config.cjs**: Ajustes do Tailwind e PostCSS.
- **package.json**: Scripts (`dev`, `build`, `preview`), dependências front-end e de testes (`@playwright/test`, `@types/node`).
- **package-lock.json**: Resolução de versões.

## Scripts Utilitários (scripts/)
- **publish-token.mjs**: Lê `public/token.json`, converte para Base64 e usa a API GitHub para inserir/atualizar o token ofuscado no repositório (commit com mensagem “Token distribuído para GitHub Pages”).
- **validate-token-flow.mjs** (se existente): Script auxiliar para verificar integridade do artefato (não modificado nesta etapa, mas parte da base).

## Workflows (GitHub Actions)
- **.github/workflows/pages.yml**: Pipeline que roda `npm install`, `npm run build`, configura GitHub Pages e publica o conteúdo de `docs/`.
- **(Removido) static.yml**: Workflow antigo que conflitou com Pages e foi retirado para evitar duplicidade.

## Documentação Exportada (docs_export/)
- Os arquivos gerados nesta rodada (guias, timeline, etc.) estão descritos nos tópicos subsequentes e organizados neste diretório para facilitar a exportação.
