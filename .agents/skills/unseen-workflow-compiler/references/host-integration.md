# Host Integration Contract

This reference describes how a host agent should install, configure, and interact with an Unseen compiler connector.

## Installation & Setup Across Hosts

1. **Claude Code (Plugin + Skill + MCP):**
   - `/plugin marketplace add eyeinthesky6/unseen`
   - `/plugin install unseen-workflow-compiler@unseen-agent-plugins`
   - Direct MCP: `claude mcp add --transport http unseen https://unseendocs.in/mcp` or `claude mcp add unseen -- npx -y unseen-mcp`
2. **Claude.ai & Claude Desktop:**
   - Remote Connector: `https://unseendocs.in/mcp` (Bearer token from `https://unseendocs.in/agents`)
   - Offline Desktop Bundle: `https://unseendocs.in/downloads/unseen.mcpb`
3. **VS Code / GitHub Copilot / Cursor / Windsurf:**
   - Extension bundle: `https://unseendocs.in/downloads/unseen-vscode.vsix` (`code --install-extension unseen-vscode.vsix`)
   - Stdio MCP server: `npx -y unseen-mcp` with `OPENROUTER_API_KEY`
4. **Universal Agent Skills CLI (`skills.sh`):**
   - `npx skills add eyeinthesky6/unseen`
5. **Live Machine-Readable Discovery:**
   - `https://unseendocs.in/llms.txt` and `https://unseendocs.in/llms-full.txt`
   - `https://unseendocs.in/.well-known/mcp.json` and `https://unseendocs.in/.well-known/agent.json`

## Tool discovery

Do not assume a fixed namespace. Inspect available tools and look for the Unseen workflow compiler capability, exposing `compile_workflow`, `revise_workflow`, and `get_workflow`.

A Skill may be installed without an MCP connector. In that case, use the Skill for evidence preparation only, offer the relevant setup command above, and state that Unseen was not called.

## Compile request

Send:

- user goal;
- faithful source evidence;
- host observations separately;
- prior clarification answers only when real;
- desired output hints only when the user cares.

## Result states

### ready

Expected to contain a structured workflow specification and may contain render artifacts such as SVG or Mermaid depending on connector version.

Use returned provenance. Do not replace the workflow with an independently invented one.

### needs_input

Expected to contain:

- job ID;
- reason;
- question objects with stable IDs.

Ask the user the questions. Preserve IDs and resume the same job with answers.

### failed_with_evidence_gap

Gather the missing evidence or correct the malformed request. Do not solve the gap by guessing.

## Revision

Connector versions may differ.

If a dedicated revision tool is present, use it for user corrections.

If it is absent, do not claim the workflow was revised by Unseen. Recompile only with explicit corrected context/evidence and explain what happened.

## Privacy

Send only evidence needed for the workflow task.

Do not send unrelated conversation history, credentials, private profile data, or entire document collections merely because the host has access to them.

## Capability drift

MCP/Plugin capabilities change over time. Prefer live tool discovery over instructions that assume a particular connector version.
