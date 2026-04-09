# MEMORY.md

## Purpose
This workspace is dedicated to creating and publishing presentations on GitHub Pages.

## Known publishing target
- Repo: `davidleyabe/presentations`
- Site: `https://davidleyabe.github.io/presentations/`

## Operating rule
Every presentation should be publishable through this workspace without requiring manual publication by David.

## What was set up on 2026-04-09
- Base presentation portal created and published.
- GitHub repository created: `davidleyabe/presentations`.
- GitHub Pages activated and linked to the main branch.
- Workspace core files created so the agent appears correctly in the OpenClaw Agents UI.
- The agent is expected to create presentations under `presentations/<slug>/index.html` and update the portal home page.
- The main agent should delegate presentation-related requests to `Presentation Publisher`.
- **New default format (2026-04-09):** All presentations are now created as landing pages (white background, continuous vertical scroll, clean minimal design) — NOT as HTML slide decks. This is the default going forward.
- Presentation content should be grounded in real web research in Brazilian Portuguese and English, not only model prior knowledge.
- When relevant, the final presentation should include source links that materially informed the content.
- Tailwind CSS is the visual default for new pages and meaningful portal evolution, including icon choices aligned with that stack.
- For presentation refactors, the preferred behavior is to update the existing presentation in the same slug instead of publishing a parallel duplicate, unless there is a clear reason not to.
- Fast publication is important, but not at the expense of editorial quality.

## GitHub auth status
- The original broad GitHub token used during setup was revoked.
- Future publishing should use a token restricted to the `davidleyabe/presentations` repository.

## Next step
- Review and tighten security rules for this agent and the main agent.
