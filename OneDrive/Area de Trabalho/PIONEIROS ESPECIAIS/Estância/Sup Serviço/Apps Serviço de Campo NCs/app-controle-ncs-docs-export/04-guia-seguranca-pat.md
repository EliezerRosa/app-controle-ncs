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
