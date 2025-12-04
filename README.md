# Controle NCs — Guia de Operação e Documentação# app-controle-ncs



## Visão RápidaAplicativo de controle territorial com reconstrução segura do token via GitHub Pages.

- **Stack:** React + Vite, Tailwind CSS, Playwright, GitHub Pages, GitHub REST API.

- **Dados:** Fonte única em `data/db.yml`, versionada no repositório.## Build e publicação

- **Autenticação:** PAT fragmentado em `public/token.json`, reconstruído no cliente.

- **Deploy:** Workflow `pages.yml` compila `docs/` e publica em `gh-pages`.1. Instale dependências: `npm install`

2. Gere artefatos para o GitHub Pages: `npm run build` (gera a pasta `docs/` com base `/app-controle-ncs/`)

Toda documentação aprofundada está centralizada em `docs_export/`.3. Faça o push para `main` e aguarde o workflow `Deploy GitHub Pages` completar.

4. Caso necessário, reexecute manualmente o workflow pelo GitHub Actions para forçar um deploy.

---

## Validação do token distribuído

## Índice de Documentação

- Verifique localmente o fluxo headless: `npm run validate:token`

| Tema | Arquivo |- Inspecione o artefato publicado em produção: `https://<seu-usuario>.github.io/app-controle-ncs/token.json`

| ---- | ------- |

| Resumo técnico por arquivo | `docs_export/01-resumo-arquivos.md` |## Rotação do PAT

| Linha do tempo detalhada | `docs_export/02-linha-do-tempo.md` |

| Instalação e configuração | `docs_export/03-guia-instalacao-config.md` |1. Gere ou revogue o PAT em `github.com/settings/tokens`

| Segurança e governança do PAT | `docs_export/04-guia-seguranca-pat.md` |2. Atualize `public/token.json` com o artefato desejado (payload preenchido ou vazio)

| Mapa de componentes e fluxos | `docs_export/05-mapa-componentes.md` |3. Publique no repositório executando `node scripts/publish-token.mjs`

| Guia de testes automatizados | `docs_export/06-guia-testes.md` |4. Dispare um novo build `npm run build` e faça o deploy via GitHub Pages

| Checklist CI/CD | `docs_export/07-checklist-ci-cd.md` |
| FAQ | `docs_export/08-faq.md` |
| Documentação expositiva completa | `docs_export/documentacao-expositiva-completa.md` |
| Diagrama UML (PlantUML) | `docs_export/controle-ncs-diagrama.puml` |
| Diagrama renderizado (PNG) | `docs_export/Controle_NCs_Classes.png` |
| Outras renderizações (PDF/JPG) | `docs_export/media/` |
| Prompts utilizados na colaboração | `docs_export/prompts/` |
| Artigo proposta DIO | `docs_export/09-artigo-dio.md` |
| Crônica detalhada da parceria human+IA | `construindo-app-com-agente/construindo-app-com-agente.md` |

> Consulte os arquivos numerados (01–08) para guias rápidos. A crônica completa e os anexos ficam em `documentacao-expositiva-completa.md` para quem prefere um único documento.

---

## Fluxo de Trabalho Essencial

### Requisitos
- Node.js 18+
- Git com acesso ao repositório
- PAT (Personal Access Token) com escopo `repo` (Fine-grained recomendado)

### Comandos Principais
```powershell
# Instalação de dependências
npm install

# Desenvolvimento local
npm run dev

# Build e preview de produção
npm run build
npm run preview

# Validação do token ofuscado
npm run validate:token

# Testes Playwright (execute `npx playwright install` na primeira vez)
npx playwright test
```

---

## Governança do PAT
1. Gere um PAT com escopo mínimo (`repo`) e expiração curta.
2. Rode `node scripts/publish-token.mjs` para ofuscar e publicar `public/token.json`.
3. Faça commit/push. O workflow `pages.yml` cuidará do deploy.
4. Se houver vazamento, revogue o PAT no GitHub, remova o JSON comprometido, gere um novo e atualize a documentação.

Detalhes adicionais: `docs_export/04-guia-seguranca-pat.md`.

---

## Deploy GitHub Pages
- Workflow único: `.github/workflows/pages.yml`.
- Etapas: instalar dependências → `npm run build` → publicar `docs/`.
- Use o checklist `docs_export/07-checklist-ci-cd.md` antes e depois de cada deploy.

---

## Mídia e Diagramas
- **UML fonte:** `docs_export/controle-ncs-diagrama.puml`.
- **Renderizações:** `docs_export/Controle_NCs_Classes.png` (PNG principal), `docs_export/media/app-controle-ncs-uml.pdf`, `docs_export/media/app-controle-ncs-uml-preview.jpg`.
- **Vídeo demo:** disponível via Releases, arquivo `app-com-ia-para-a-dio.mp4`. Link direto: `https://github.com/EliezerRosa/app-controle-ncs/releases/latest/download/app-com-ia-para-a-dio.mp4`. Mantenha o mesmo nome do arquivo em atualizações.

---

## Histórico da Parceria Humano + IA
- O relato completo da colaboração com o agente GPT-5 Codex está em `construindo-app-com-agente/construindo-app-com-agente.md`.
- Prompts e roteiros complementares: `docs_export/prompts/`.

---

## Próximos Passos Recomendados
1. Expandir testes Playwright para cobrir mutações do YAML e rollback.
2. Modularizar `AppControleNcs.tsx` em subcomponentes para manutenção futura.
3. Automatizar validação do payload do token na CI.
4. Avaliar GitHub Environments e secrets rotacionados para diminuir contato direto com PATs.

> Atualize este README sempre que novos guias ou ferramentas forem adicionados.
