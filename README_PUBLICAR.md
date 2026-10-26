# ASDNA Horde — site multipáginas claro

O site foi criado em HTML, CSS e JavaScript puro, sem frameworks e sem precisar de compilação.

## Páginas
- `index.html` — página inicial com prévia de terminal animada
- `recursos.html` — funcionalidades e visão geral do aplicativo
- `provedores.html` — perfis de IA disponíveis
- `comandos.html` — 51 entradas de comandos com pesquisa, filtros e cópia
- `mcp.html` — integrações de ferramentas MCP
- `downloads.html` — links para EXE, fontes e pacote completo
- `desenvolvedores.html` — build em Go, estrutura e perguntas frequentes
- `style.css` — todo o estilo visual centralizado
- `script.js` — menu mobile, busca, filtros e copiar
- `downloads/` — todos os três arquivos de distribuição já incluídos

## Como visualizar
Abra `index.html` no navegador, ou execute `python -m http.server 8000` na pasta e abra `http://localhost:8000`.

## Publicar
Envie os arquivos para a raiz do repositório e habilite GitHub Pages (branch `main`, pasta `/root`), ou envie para um host estático como Netlify ou Cloudflare Pages. Garanta que `downloads/` seja publicado.

## Personalização
Peça ao seu agente para mexer apenas em `style.css` se quiser mudar cores, fontes, espaçamento ou animações. Os links e comandos estão em HTML. A lógica da pesquisa está em `script.js`.

## Dependências e fontes
Usa fontes do Google Fonts como melhoria visual opcional; com internet desligada aparecem fontes do sistema. Não usa bibliotecas JS, cookies nem rastreadores.

## Licença do aplicativo
Escolha e adicione uma licença open source apropriada antes de atribuir essa condição formal ao repositório. Verifique também os direitos de redistribuição das dependências e do executável.
