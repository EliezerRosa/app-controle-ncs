# Guia de Instalação e Configuração

## Pré-Requisitos
- Node.js 18 LTS ou superior (recomendado usar `nvm` ou instalador oficial).
- Git configurado com acesso ao repositório.
- PAT (Personal Access Token) com escopos `repo` (para leitura/escrita de conteúdo) e opcionalmente `workflow` se desejar publicar via script.
- Navegador compatível para desenvolvimento (Chrome, Edge ou Firefox).

## Passos Locais
1. **Clonar o repositório**
   ```powershell
   git clone <URL-do-repo>
   cd app-controle-ncs
   ```
2. **Instalar dependências**
   ```powershell
   npm install
   ```
3. **Executar em modo desenvolvimento**
   ```powershell
   npm run dev
   ```
   O Vite abrirá em `http://localhost:5173` (ou porta livre). Se desejar preview de produção:
   ```powershell
   npm run build
   npm run preview
   ```
4. **Executar testes Playwright**
   ```powershell
   npm run test:e2e
   ```
   (Certifique-se de ter rodado `npx playwright install` uma vez para baixar browsers.)

## Configurações Essenciais
- **Token JSON** (`public/token.json`): contém fragmentos codificados do PAT. Use o script `scripts/publish-token.mjs` para atualizar o token publicado.
- **db.yml** (`data/db.yml`): fonte única dos territórios. Qualquer edição deve respeitar a estrutura existente (`appConfig`, `territories`, `blocks`, `houses`).
- **Variáveis de Ambiente**: não são necessárias para o front-end, mas o script de publicação lê `GITHUB_TOKEN` do ambiente se fornecido.

## Deploy (GitHub Pages)
1. Confirme que `docs/index.html` foi atualizado via `npm run build`.
2. Faça commit/push das mudanças.
3. O workflow `pages.yml` será disparado automaticamente; monitorar via aba Actions.
4. A publicação usa a branch `gh-pages` e serve o conteúdo de `docs/`.

## Dicas de Troubleshooting
- **Erro 404 em produção**: verifique se o `base` em `vite.config.ts` corresponde ao nome do repositório GitHub Pages.
- **Token inválido**: rode `node scripts/publish-token.mjs` para recompilar o JSON a partir de um PAT válido e commit/push o resultado.
- **Falha no Playwright**: execute `npx playwright install --with-deps` (em Windows apenas `npx playwright install`) para garantir browsers disponíveis.
