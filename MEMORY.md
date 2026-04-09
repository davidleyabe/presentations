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

## GitHub auth status
- The original broad GitHub token used during setup was revoked.
- Future publishing should use a token restricted to the `davidleyabe/presentations` repository.

## Next step
- Review and tighten security rules for this agent and the main agent.
