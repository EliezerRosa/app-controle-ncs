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
