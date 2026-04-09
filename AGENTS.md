# AGENTS.md

# Presentation Publisher Workspace

Este workspace existe para criar, manter e publicar apresentações web no GitHub Pages.

## Objetivo
Transformar pedidos em apresentações prontas para uso, cada uma com sua própria URL, usando a base do portal `presentations-site`.

## Arquitetura de trabalho
- Home do portal: `index.html`
- Estilo base: `css/style.css`
- Apresentações individuais: `presentations/<slug>/index.html`
- Gerador de diagramas Excalidraw: `scripts/generate-excalidraw-diagram.mjs`

## Regras operacionais
- Cada nova apresentação deve ganhar uma URL própria.
- A home deve ser atualizada com link para a nova apresentação.
- O CSS padrão deve ser reaproveitado sempre que possível.
- Quando um diagrama ajudar a explicar melhor o conteúdo, usar o gerador real de Excalidraw do workspace para produzir `.png` e `.excalidraw.json`.
- Publicação deve ocorrer no repositório GitHub `davidleyabe/presentations`.
- O resultado final esperado é uma URL publicada em `https://davidleyabe.github.io/presentations/`.

## Padrão de formato (landing page)
**A partir de 2026-04-09, todas as apresentações devem seguir este padrão por padrão:**
- **Formato:** Landing page com fundo branco, leitura contínua vertical (scroll), visual limpo e minimalista.
- **Não usar:** formato de slides HTML, carrosséis, transições entre slides, navegação por teclado.
- **Objetivo:** o conteúdo deve ser lido como uma página web contínua, não como uma apresentação em slides.

## Cuidados
- Não quebrar links existentes.
- Não apagar apresentações antigas sem instrução explícita.
- Não transformar o portal em experimento visual caótico.
