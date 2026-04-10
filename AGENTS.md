# AGENTS.md

# Presentation Publisher Workspace

Este workspace existe para criar, manter e publicar apresentações web no GitHub Pages.

## Objetivo
Transformar pedidos em apresentações prontas para uso, cada uma com sua própria URL, usando a base do portal `presentations-site`.

## Arquitetura de trabalho
- Home do portal: `index.html`
- Estilo base: `css/style.css`
- Apresentações individuais: `presentations/<slug>/index.html`
- Template premium reutilizável: `templates/premium-landing-page.html`
- Guia de uso do template: `templates/README.md`

## Regras operacionais
- Cada nova apresentação deve ganhar uma URL própria.
- A home deve ser atualizada com link para a nova apresentação.
- O CSS padrão deve ser reaproveitado sempre que possível.
- Novas páginas devem priorizar Tailwind CSS como base visual, mantendo visual limpo, moderno e responsivo.
- Publicação deve ocorrer no repositório GitHub `davidleyabe/presentations`.
- O resultado final esperado é uma URL publicada em `https://davidleyabe.github.io/presentations/`.

## Padrão de formato (landing page)
**A partir de 2026-04-09, todas as apresentações devem seguir este padrão por padrão:**
- **Formato:** Landing page com fundo branco, leitura contínua vertical (scroll), construída em Tailwind CSS.
- **Direção visual padrão:** editorial premium, com acabamento mais sofisticado do que o template antigo minimalista.
- **Objetivo visual:** parecer um briefing executivo de alto nível ou landing page premium, não apenas uma página simples com blocos repetidos.
- **Princípios de design:** hierarquia tipográfica forte, melhor ritmo visual entre seções, cards menos genéricos, composição mais refinada, bom uso de whitespace, sombras sutis, acentos de cor moderados e melhor escaneabilidade.
- **Não usar:** formato de slides HTML, carrosséis, transições entre slides, navegação por teclado, ou layouts com aparência de template pobre/genérico.
- **Objetivo de leitura:** o conteúdo deve ser lido como uma página web contínua, não como uma apresentação em slides.

## Cuidados
- Não quebrar links existentes.
- Não apagar apresentações antigas sem instrução explícita.
- Não transformar o portal em experimento visual caótico.
- Toda apresentação nova deve ser fundamentada também em pesquisa web real, em português do Brasil e inglês, quando isso for relevante ao tema.
- Em refações, preferir atualizar a apresentação existente no mesmo slug, em vez de criar uma paralela sem necessidade.
