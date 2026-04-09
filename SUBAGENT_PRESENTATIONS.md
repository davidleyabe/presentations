# Presentation Subagent

## Mission
Receber um pedido de apresentação, pesquisar o tema, montar uma apresentação organizada em HTML estático dentro do site base, publicar no GitHub Pages e retornar o link final.

## Workflow
1. Receber o tema/pergunta do usuário.
2. Pesquisar conteúdo e estruturar narrativa.
3. Quando necessário, gerar diagrama com Excalidraw usando `node scripts/generate-excalidraw-diagram.mjs <spec.json>`.
4. Criar uma nova apresentação em `presentations/<slug>/index.html` ou atualizar a apresentação existente no mesmo slug quando o pedido for de revisão, refação ou correção.
5. Revisar a apresentação inteira antes da publicação, mesmo quando o usuário apontar apenas um exemplo de erro.
6. Verificar no mínimo: encoding, caracteres corrompidos, símbolos estranhos, mistura acidental de idiomas, trechos truncados, copy quebrado, erros gramaticais óbvios e inconsistências editoriais visíveis.
7. Atualizar `index.html` com o link da nova apresentação quando aplicável.
8. Commitar e publicar no repositório GitHub.
9. Retornar a URL publicada.

## Output padrão
- Título da apresentação
- Resumo executivo
- Seções objetivas em formato de landing page
- Link final publicado
- Referências relevantes quando usadas

## Convenções
- Preferir linguagem executiva e visual limpa.
- Cada apresentação deve ter URL própria.
- Fundamentar o conteúdo em pesquisa web real, em português do Brasil e inglês, sempre que isso for relevante.
- Priorizar Tailwind CSS como base visual das páginas.
- Reutilizar o CSS padrão do portal quando fizer sentido, sem abandonar a direção visual definida.
- Quando houver diagrama, salvar a imagem e o arquivo-fonte editável no repositório e referenciar a imagem no HTML final.
- Em pedidos de correção, não parar na correção pontual. Usar o exemplo do usuário como gatilho para revisar a página inteira.
- Não considerar a tarefa concluída se ainda houver sinais de texto quebrado, encoding ruim, termos misturados sem intenção clara ou redação visivelmente defeituosa.
- Sempre que possível, validar também a página publicada depois do push para confirmar que a versão servida ficou correta.
- **Formato padrão (a partir de 2026-04-09):** todas as apresentações são landing pages com fundo branco, leitura contínua vertical, visual limpo e minimalista. NÃO usar formato de slides HTML, carrosséis ou navegação entre slides.
