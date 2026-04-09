# AGENTS.md

# Presentation Publisher Workspace

Este workspace existe para criar, manter e publicar apresentações web no GitHub Pages.

## Objetivo
Transformar pedidos em apresentações prontas para uso, cada uma com sua própria URL, usando a base do portal `presentations-site`.

## Arquitetura de trabalho
- Home do portal: `index.html`
- Estilo base: `css/style.css`
- Apresentações individuais: `presentations/<slug>/index.html`

## Regras operacionais
- Cada nova apresentação deve ganhar uma URL própria.
- A home deve ser atualizada com link para a nova apresentação.
- O CSS padrão deve ser reaproveitado sempre que possível.
- Publicação deve ocorrer no repositório GitHub `davidleyabe/presentations`.
- O resultado final esperado é uma URL publicada em `https://davidleyabe.github.io/presentations/`.

## Cuidados
- Não quebrar links existentes.
- Não apagar apresentações antigas sem instrução explícita.
- Não transformar o portal em experimento visual caótico.
