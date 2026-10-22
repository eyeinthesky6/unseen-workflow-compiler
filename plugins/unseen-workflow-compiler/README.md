# Unseen Workflow Compiler Agent Plugin

Portable Agent Plugin package for Unseen workflow intelligence.

## What works now

This package currently ships the **Unseen Workflow Compiler Skill**. The Skill can run in any compatible agent host without a server connection:

- recognize workflow-analysis tasks;
- preserve source evidence and locators;
- profile actors, decisions, approvals, exceptions, ambiguity, and contradictions;
- prepare a WorkflowEvidenceEnvelope;
- use an installed Unseen compiler connector when one is actually available;
- avoid claiming Unseen ran when no connector is installed.

## Package layout

```text
plugin.json
skills/
  unseen-workflow-compiler/
    SKILL.md
    references/
.codex-plugin/
  plugin.json
.claude-plugin/
  plugin.json
gemini-extension.json
```

The root `plugin.json` follows Agent Plugins 1.0.0. OpenAI/Codex, Claude, and Gemini files are thin compatibility wrappers around the same Skill content.

## Why there is no portable mcp.json yet

Agent Plugins supports remote Streamable HTTP MCP in root `mcp.json`, but a portable remote MCP entry requires a **real public HTTPS endpoint**.

The repository's canonical production runtime is Cloudflare Worker, and the current production Worker does not yet serve a verified remote `/mcp` endpoint. Adding a placeholder URL would create a broken install.

Once the production endpoint exists and is verified, add:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "unseen": {
      "type": "streamable-http",
      "url": "https://<verified-domain>/mcp"
    }
  }
}
```

Authentication must remain client-managed; do not embed secrets in plugin metadata.

## Local/package testing

Run:

```bash
npm run validate:agent-package
```

Then use the host-specific installation instructions in `docs/AGENT_PLUGIN_INSTALLATION.md`.

## Distribution note

The main Unseen repository is private. These files make the package structurally installable for authorized users and local testing. Broad public agent discovery still requires publishing the non-secret plugin package from a public source and/or submitting it to supported directories after the production MCP endpoint and privacy/auth requirements are satisfied.
