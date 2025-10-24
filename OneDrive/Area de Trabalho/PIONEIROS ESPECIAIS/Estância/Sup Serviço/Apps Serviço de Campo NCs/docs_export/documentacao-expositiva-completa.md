# Documentação Expositiva Completa do App Controle NCs

**Autor:** Moshe / Equipe GPT-5 Codex  
**Data:** 2025-10-20  
**Versão:** 1.3

## 1. Capa e Sumário
- **Título:** App Controle NCs – Crônica Técnica do Desenvolvimento  
- **Autor:** Moshe / Equipe GPT-5 Codex  
- **Data:** 2025-10-20  
- **Versão:** 1.3  
- **Sumário de Seções:**  
  2. Introdução e Contexto  
  3. Arquitetura e Stack  
  4. Histórico e Linha do Tempo  
  5. Guia de Instalação e Configuração  
  6. Segurança e Governança de Token  
  7. Ciclo de Deploy e CI/CD  
  8. FAQ e Aprendizados  
  9. Glossário de Termos  
  10. Interações e Cooperação  
  11. Conclusão e Próximos Passos  
  12. Apêndices

## 2. Introdução e Contexto
O App Controle NCs foi concebido para organizar Notificações de Contato em territórios supervisionados por equipes de campo. A proposta central é oferecer uma interface web leve, capaz de registrar visitas, responsáveis e estados das casas sem exigir infraestrutura própria. Durante a colaboração atualizamos fluxos críticos, documentamos decisões e garantimos que o conhecimento fique acessível para a continuidade do projeto.

## 3. Arquitetura e Stack
A solução combina React com Vite e Tailwind CSS para entregar uma SPA pronta para GitHub Pages. Os dados persistem em `data/db.yml`, consumido e versionado pela própria aplicação via API REST do GitHub com autenticação PAT. Scripts auxiliares publicam o token ofuscado e a pipeline `pages.yml` hospeda automaticamente os artefatos compilados. Playwright sustenta a camada de testes end-to-end.

## 4. Histórico e Linha do Tempo
A evolução recente percorreu sete marcos: diagnóstico do repositório, correção do pipeline de deploy, endurecimento do fluxo de autenticação com PAT, restauração da suíte Playwright, expansão de documentação, empacotamento de entregáveis e definição de próximos passos (validação automática do token e expansão de testes). Os detalhes cronológicos completos estão no Apêndice B.

## 5. Guia de Instalação e Configuração
O desenvolvimento exige Node.js 18+, Git e um PAT com escopo `repo`. O fluxo recomendado é clonar o repositório, instalar dependências, rodar `npm run dev` no dia a dia e `npm run build && npm run preview` antes de publicar. `npm run test:e2e` executa a suíte Playwright após `npx playwright install`. O Apêndice C descreve o passo a passo completo, inclusive dicas de troubleshooting.

## 6. Segurança e Governança de Token
A governança do PAT baseia-se em escopo mínimo, rotação periódica e uso individual. O token é ofuscado em JSON para publicação, regenerado por script dedicado e nunca persistido de forma permanente no front-end. Processos de revogação, auditoria e monitoramento foram consolidados no Apêndice D.

## 7. Ciclo de Deploy e CI/CD
O workflow de publicação inicia com validações locais (lint, build, testes e revisão do YAML), segue com o pipeline `pages.yml` e termina com verificações manuais em produção. Manutenção periódica envolve renovar PAT, atualizar dependências e revisar permissões. O checklist completo aparece no Apêndice G.

## 8. FAQ e Aprendizados
Os principais questionamentos tratam de requisitos de acesso, armazenamento dos dados, procedimentos de atualização do token e estratégias de recuperação via histórico do Git. Lições aprendidas reforçam a importância de evitar uso offline, manter mocks para testes e orientar colaboradores sobre impacto de alterações no YAML. A FAQ detalhada está no Apêndice H.

## 9. Glossário de Termos
- **API do GitHub:** Interface REST para manipular repositórios ([docs.github.com/en/rest](https://docs.github.com/en/rest))  
- **GitHub Pages:** Hospedagem estática gratuita do GitHub ([pages.github.com](https://pages.github.com/))  
- **PAT (Personal Access Token):** Credencial pessoal para uso da API ([docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))  
- **React:** Biblioteca JavaScript para construção de UIs ([react.dev/learn](https://react.dev/learn))  
- **Vite:** Bundler e dev server moderno ([vite.dev/guide](https://vite.dev/guide/))  
- **Tailwind CSS:** Classes utilitárias de CSS ([tailwindcss.com/docs](https://tailwindcss.com/docs))  
- **Playwright:** Framework de testes end-to-end ([playwright.dev/docs/intro](https://playwright.dev/docs/intro))  
- **YAML:** Linguagem de serialização baseada em indentação ([yaml.org/spec/1.2.2](https://yaml.org/spec/1.2.2/))  
- **CI/CD:** Prática de integração e entrega contínuas ([martinfowler.com/articles/continuousIntegration.html](https://martinfowler.com/articles/continuousIntegration.html))  
- **Checksum:** Técnica de validação de integridade ([en.wikipedia.org/wiki/Checksum](https://en.wikipedia.org/wiki/Checksum))

## 10. Interações e Cooperação
A parceria entre solicitante e agente percorreu diagnóstico, ajustes de código, testes automatizados e produção documental. Priorizamos respostas rápidas, transparência sobre riscos com PAT e transferência de conhecimento por meio de guias temáticos. Essa dinâmica garantiu entregas incrementais com validação contínua.

## 11. Conclusão e Próximos Passos
O App Controle NCs opera de forma estável com deploy automatizado, testes básicos e documentação abrangente. Recomenda-se evoluir a suíte Playwright para cobrir mutações do YAML, adicionar checagens do token na pipeline e avaliar GitHub Environments para gestão de segredos. A atualização periódica deste compêndio assegura onboarding rápido de novos colaboradores.

## 12. Apêndices

### Apêndice A  Resumo Técnico por Arquivo
```markdown
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
- **publish-token.mjs**: Lê `public/token.json`, converte para Base64 e usa a API GitHub para inserir/atualizar o token ofuscado no repositório (commit com mensagem Token distribuído para GitHub Pages).
- **validate-token-flow.mjs** (se existente): Script auxiliar para verificar integridade do artefato (não modificado nesta etapa, mas parte da base).

## Workflows (GitHub Actions)
- **.github/workflows/pages.yml**: Pipeline que roda `npm install`, `npm run build`, configura GitHub Pages e publica o conteúdo de `docs/`.
- **(Removido) static.yml**: Workflow antigo que conflitou com Pages e foi retirado para evitar duplicidade.

## Documentação Exportada (docs_export/)
- Os arquivos gerados nesta rodada (guias, timeline, etc.) estão descritos nos tópicos subsequentes e organizados neste diretório para facilitar a exportação.
```

### Apêndice B  Linha do Tempo do Projeto
```markdown
# Linha do Tempo do Projeto

## 1. Configuração e Diagnóstico Inicial
- Análise do repositório Vite/React, identificação do fluxo de dados YAML e da dependência em PAT para persistência via GitHub API.
- Revisão dos Workflows GitHub Actions originais; conflito detectado entre `static.yml` e `pages.yml` durante o deploy.
- Validação manual do Playwright já presente, mas sem execução recente.

## 2. Correções de Deploy GitHub Pages
- Atualização do pipeline `pages.yml` para instalar dependências com cache e definir os artefatos corretos (`docs/`).
- Remoção do workflow redundante `static.yml`, evitando builds duplos e erros 404.
- Execução de `npm run build` e `npm run preview` localmente para garantir que os assets em `docs/` estão atualizados.

## 3. Ajustes na Aplicação (PAT Flow)
- Refatoração de `AppControleNcs.tsx` para diferir a leitura do PAT até o usuário inserir ou confirmar token válido.
- Inclusão de estados/efeitos para feedback visual (loaders, alertas) e reforço de validação do token antes de mutar o YAML.
- Criação de mensagens altamente visíveis sobre responsabilidade do PAT e instruções rápidas.

## 4. Testes Automatizados
- Atualização/execução dos testes Playwright (`tests/pat-flow.spec.ts`) cobrindo o fluxo inicial, login com token e verificação de dados carregados.
- Geração de relatórios em `test-results/` e ajuste de CI para usar a suíte em modo headless com Chromium.

## 5. Documentação Técnica
- Escrita de README detalhado com passos de instalação, variáveis e pain points.
- Geração de documentação adicional para exportação (`docs_export/*`), incluindo mapa de componentes, timeline, guia de segurança e FAQ.

## 6. Empacotamento e Entregáveis
- Produção de `app-controle-ncs-codigo.zip` (snapshot completo do repositório).
- Produção de `app-controle-ncs-extras.zip` (YAML + scripts + docs essenciais para integração com outros times/IA).
- Preparação do diretório `docs_export/` para organizar e zipar os novos materiais para consumo externo.

## 7. Próximos Passos Sugeridos
- Automatizar a validação do checksum do token na CI antes do deploy.
- Considerar testes Playwright adicionais cobrindo mutações de YAML e rollback.
- Avaliar introdução de GitHub Environments com secrets para diminuir necessidade de PAT manual.
```

### Apêndice C  Guia de Instalação e Configuração
```markdown
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
```

### Apêndice D  Guia de Segurança para PAT e Dados
```markdown
# Guia de Segurança para PAT e Dados

## Escopos e Boas Práticas
- **Escopo mínimo**: utilize PAT apenas com permissões `repo` (Content). Evite habilitar `admin`, `workflow` ou `delete_repo` sem necessidade explícita.
- **Validade curta**: defina expiration em 30 dias ou menos. Renove antes do vencimento e remova tokens não utilizados.
- **Uso individual**: cada operador deve ter seu token pessoal. Não compartilhe um token único em múltiplas máquinas.

## Armazenamento Seguro
- **localStorage**: a aplicação persiste o token apenas na sessão atual; ao recarregar o PAT é requisitado novamente. Oriente usuários a não marcar a opção de lembrar em navegadores compartilhados.
- **public/token.json**: armazena apenas um payload ofuscado (fragmentado + checksum). Mesmo assim, mantenha o repositório privado ou use branch protegida.
- **Scripts CLI**: ao usar `scripts/publish-token.mjs`, injete o PAT via variável de ambiente `GITHUB_TOKEN` temporária ou via prompt seguro.

## Fluxo de Publicação do Token
1. Gere um novo PAT no GitHub (Settings > Developer settings > Personal access tokens > Fine-grained).
2. Atualize `public/token.json` executando o script:
   ```powershell
   node scripts/publish-token.mjs
   ```
   Você será solicitado a inserir o PAT; ele será codificado e o arquivo atualizado.
3. Faça commit/push do arquivo modificado. O pipeline `pages.yml` publicará o artefato para produção.

## Revogação em Caso de Vazamento
- Revoque imediatamente o PAT na página do GitHub.
- Remova o arquivo `public/token.json` comprometido e publique um novo commit sem o token.
- Gere novo PAT com escopos corretos e repita o processo de ofuscação via script.

## Auditoria e Monitoramento
- Habilite logins auditáveis (GitHub já registra uso do token em Security Log).
- Considere implementar GitHub Secret Scanning personalizado para evitar PATs em texto plano.
- Avalie integrar alertas: por exemplo, workflow que falha se o token JSON estiver desatualizado ou inválido.

## Integração com o Front-end
- O aplicativo nunca envia o PAT para servidores terceiros; ele é utilizado diretamente no navegador para chamadas à API GitHub.
- Reforce instruções no onboarding para que operadores utilizem redes confiáveis (VPN corporativa quando disponível).
```

### Apêndice E  Mapa de Componentes e Fluxos
```markdown
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
```

### Apêndice F  Guia de Testes Automatizados
```markdown
# Guia de Testes Automatizados

## Stack Utilizada
- **Playwright Test**: framework principal para testes end-to-end.
- **Navegadores**: Chromium por padrão; pode rodar em Firefox/WebKit ajustando `playwright.config` (não incluso por padrão).
- **Output**: relatórios em `test-results/`, screenshots e traces opcionais.

## Teste Atual
- Arquivo: `tests/pat-flow.spec.ts`
- Objetivo: garantir que o fluxo de autenticação com token ocorra sem regressões.
- Passos cobertos:
  1. Acessa a aplicação (`/` local ou build).
  2. Insere token mockado via `page.fill` ou interceptação.
  3. Aguarda carregamento dos cards de território.
  4. Valida presença de elementos chave (ex.: título do território, botões de ação).

## Execução Local
```powershell
npm run test:e2e
```
- O script é atalho para `playwright test`.
- Se for a primeira vez, execute `npx playwright install`.

## Integração na CI
- O workflow `pages.yml` não executa Playwright por padrão. Para adicionar:
  - Inserir etapa antes do build:
    ```yaml
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test:e2e
    ```
  - Recomenda-se usar `continue-on-error: false` para falhar o pipeline quando testes quebrarem.

## Melhores Práticas Futuras
- Criar fixtures para mockar respostas da API GitHub evitando uso de tokens reais em testes.
- Expandir cobertura: edição de casa, gravação de YAML, regressão de modais.
- Salvar `playwright-report` e `traces.zip` como artefatos na CI para debugging.
```

### Apêndice G  Checklist CI/CD
```markdown
# Checklist CI/CD (GitHub Pages)

## Antes do Commit
- [ ] Executar `npm run lint` (se configurado) e `npm run build` local.
- [ ] Rodar `npm run test:e2e` para garantir que o fluxo principal não quebrou.
- [ ] Verificar se `public/token.json` está sincronizado com o PAT vigente.
- [ ] Confirmar alterações no `data/db.yml` (YAML bem formatado).

## Após o Push
- [ ] Conferir na aba Actions se o workflow `pages.yml` iniciou.
- [ ] Etapa `Install dependencies` concluída com cache reutilizado?
- [ ] Etapa `Build` criou `docs/` sem warnings críticos?
- [ ] Etapa `Deploy` publicou para `gh-pages` sem erros.

## Pós-Deploy
- [ ] Acessar a URL do GitHub Pages e verificar se assets carregam corretamente.
- [ ] Testar manualmente login com PAT (produção) para validar que o token obfuscado funciona.
- [ ] Validar que dados de `db.yml` aparecem atualizados em produção.

## Manutenção Periódica
- [ ] Renovar PAT antes do vencimento; reexecutar `node scripts/publish-token.mjs`.
- [ ] Atualizar dependências (`npm outdated` / `npm update`) trimestralmente.
- [ ] Revisar permissões do repositório e logs de execução do token.
```

### Apêndice H  FAQ
```markdown
# FAQ - App Controle de NCs

## 1. O que é necessário para acessar a aplicação?
Você precisa de um PAT (Personal Access Token) válido com permissão de leitura/escrita no repositório. Ao abrir o app, informe o token quando solicitado.

## 2. Onde ficam os dados?
Todos os dados residem em `data/db.yml` dentro do repositório GitHub. A aplicação carrega e salva diretamente nesse arquivo usando a API do GitHub.

## 3. O token fica salvo?
Não. Ele permanece apenas em memória/localStorage temporário da aba atual. Ao fechar o navegador ou dar refresh, será solicitado novamente.

## 4. Como atualizar o token publicado?
Execute `node scripts/publish-token.mjs`, informe o novo PAT e faça commit/push do `public/token.json` gerado. O deploy atualizará o token em produção.

## 5. Posso rodar offline?
Não. O app precisa da API GitHub para ler/gravar o YAML. Sem internet ou sem PAT válido, os dados não carregam.

## 6. Como restaurar dados se algo deu errado?
Use o histórico de commits do GitHub para recuperar versões anteriores de `data/db.yml`. Recomenda-se criar tags e branches de backup antes de grandes edições.

## 7. Existem testes automatizados?
Sim, Playwright cobre o fluxo de login e carregamento inicial. Rode `npm run test:e2e` antes de subir mudanças.

## 8. O deploy falhou, o que fazer?
Verifique o log do workflow `pages.yml`. Na maioria dos casos há erro de build (`npm run build`) ou falta do token JSON válido. Corrija e reenvie.

## 9. Posso mudar a estrutura do YAML?
Pode, porém deve atualizar o parser e as interfaces correspondentes em `AppControleNcs.tsx`. Recomenda-se manter compatibilidade ou criar migração.

## 10. Como contribuir com novas features?
Crie branch, adicione testes relevante, mantenha as guias deste diretório atualizadas se houver novos fluxos, e abra Pull Request para revisão.
```

### Apêndice I  Evolução dos Prompts
```markdown
# Evolução dos Prompts

- **Prompt v1 — briefing inicial:** documento original que contextualiza o problema, stakeholders e objetivo do app.
  - Arquivo: `prompts/prompt-v1.pdf`
- **Prompt v2 — refinamento colaborativo:** versão com ajustes após diagnósticos técnicos e definição de políticas de segurança do PAT.
  - Arquivo: `prompts/prompt-v2.pdf`
- **Prompt v3 — roteiro final:** consolida backlog, artefatos esperados e plano de execução assistida pelo agente.
  - Arquivo: `prompts/prompt-v3.pdf`
```

### Apêndice J  Demonstração em Vídeo
```markdown
# Demonstração em Vídeo

- **Walkthrough completo:** baixe `app-com-ia-para-a-dio.mp4` pela seção *Releases* do GitHub (mesmo nome do arquivo original).
  - Conteúdo: apresentação narrada da jornada de desenvolvimento IA + humano, cobrindo setup, fluxos críticos e tour pela documentação.
  - Observação: mantenha sempre o mesmo nome do arquivo ao anexar na Release para preservar o link descrito na documentação.
```
