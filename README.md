# app-controle-ncs

Aplicativo de controle territorial com reconstrução segura do token via GitHub Pages.

## Build e publicação

1. Instale dependências: `npm install`
2. Gere artefatos para o GitHub Pages: `npm run build` (gera a pasta `docs/` com base `/app-controle-ncs/`)
3. Faça o push para `main` e aguarde o workflow `Deploy GitHub Pages` completar.
4. Caso necessário, reexecute manualmente o workflow pelo GitHub Actions para forçar um deploy.

## Validação do token distribuído

- Verifique localmente o fluxo headless: `npm run validate:token`
- Inspecione o artefato publicado em produção: `https://<seu-usuario>.github.io/app-controle-ncs/token.json`

## Rotação do PAT

1. Gere ou revogue o PAT em `github.com/settings/tokens`
2. Atualize `public/token.json` com o artefato desejado (payload preenchido ou vazio)
3. Publique no repositório executando `node scripts/publish-token.mjs`
4. Dispare um novo build `npm run build` e faça o deploy via GitHub Pages
