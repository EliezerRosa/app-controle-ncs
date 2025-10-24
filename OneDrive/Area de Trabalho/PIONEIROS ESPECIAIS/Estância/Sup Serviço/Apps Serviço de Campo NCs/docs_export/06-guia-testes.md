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
