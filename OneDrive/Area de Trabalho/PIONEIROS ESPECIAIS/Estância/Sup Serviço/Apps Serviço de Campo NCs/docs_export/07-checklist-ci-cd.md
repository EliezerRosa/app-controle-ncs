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
