# Module 7 — Writers' Track

🟡→🟠 · 2 hours · [lesson.md](lesson.md)

The same capstone as [Module 7](../07-capstone/), rewritten for technical writers
and content designers who don't write code.

## Which track do I run?

Run **one**, not both.

| | [Engineering track](../07-capstone/) | **Writers' track** (this one) |
|---|---|---|
| Audience | Writes code comfortably | Writes content, not code |
| Duration | 2 hrs + 55 min optional LSP | 2 hrs |
| Site build | Hand-write `index.html`, `styles.css`, `app.js` | Brief an agent, review its output |
| Publishing | `git init` / `git push` / `gh` CLI | Drag files into github.com — no terminal |
| LSP | Build a language server; JSON-RPC, symbol graphs | Run a link checker on your own docs |
| MCP | Build and `npm publish` the `about-me` server | Optional; install and use it |
| Deliverable | **A live portfolio site at a public URL** | **Identical** |

Both tracks produce the same artifact. The difference is who does the typing.

## What changed and why

| Cut from the engineering track | Replaced with |
|---|---|
| ~120 lines of hand-written HTML/CSS/JS | An agent brief + a structured editorial review pass |
| LSP protocol internals — JSON-RPC framing, `initialize`/`didOpen` lifecycle, capability tables, writing `server.js` | One page: "your docs are a graph of headings and links," then run `scan.js` on your own docs |
| Building and publishing an MCP server to npm | Optional: ask Claude to set up the prebuilt one |
| Git CLI, Personal Access Tokens, `gh repo create` | Browser upload as the primary path; Git as Route B |
| Cursor rules, model selection, prompt-caching mechanics | One short `CLAUDE.md` section |

## What was added

- **The single-sourcing frame.** `resume.json` = content source, JSON Resume = content model, the agent = publishing pipeline, the site = an output. Writers already own this mental model.
- **A 10-minute editorial pass** on the generated `resume.json`, with a review table. This is the module's real lesson: the AI does the transformation, the human does the judgment.
- **An editor's review pass** on the generated site — content, hierarchy, scanability, voice, mobile, accessibility — each with the sentence to say to Claude when it's wrong.
- **A plain-language troubleshooting table** for the publish step.

## Shared assets

This folder holds the lesson only. It reuses the engineering track's example files
rather than duplicating them:

| Asset | Location |
|---|---|
| Finished portfolio example | [`../07-capstone/portfolio-example/`](../07-capstone/portfolio-example/) |
| `about-me` MCP server | [`../07-capstone/portfolio-example/about-me-mcp/`](../07-capstone/portfolio-example/about-me-mcp/) |
| Link checker | [`../07-capstone/docs-lsp/`](../07-capstone/docs-lsp/) — `node scan.js <your-docs-folder>` |

## Facilitator notes

- The 10-minute `resume.json` editorial pass (Part 3) is the highest-value block. Protect it. Participants will want to rush to the visual result.
- Part 4's review pass works best read aloud as a group on one volunteer's site before people do their own.
- Expect the publish step (Part 5) to be where people get stuck. The browser route removes almost all of it; steer people there unless they volunteer that they use Git daily.
- Part 8 (MCP) is genuinely optional. Cut it first if you're running long.
