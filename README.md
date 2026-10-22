# Unseen MCP Server (`unseen-mcp`)

<!-- mcp-name: io.github.eyeinthesky6/unseen-workflow-compiler -->

The official [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for **Unseen** ([unseendocs.in](https://unseendocs.in)).

Turn messy operational documents, standard operating procedures (SOPs), incident playbooks, spreadsheets, and business communications into faithful, source-grounded visual workflows directly inside Claude Desktop, Cursor, Zed, Windsurf, or any MCP-compatible agent.

---

## Capabilities

The `unseen-mcp` server provides 3 primary tools:

1. **`compile_workflow`**:
   Compiles raw text, SOPs, or multi-page documents into a structured, verifiable `VisualSpec` workflow graph, accompanied by production-ready SVG and Mermaid syntax.
   - Arguments: `content` (string, required), `title` (string, optional).
2. **`revise_workflow`**:
   Applies focused revisions or node additions/modifications to an existing workflow graph while preserving citation integrity.
   - Arguments: `visualSpec` (object, required), `instructions` (string, required).
3. **`get_workflow`**:
   Retrieves the full structured representation of an existing visual artifact by its ID.
   - Arguments: `id` (string, required).

---

## 1-Click Installation (Smithery)

If you use [Smithery.ai](https://smithery.ai):

```bash
npx -y @smithery/cli install unseen-mcp --client claude
```

Or for Cursor:
```bash
npx -y @smithery/cli install unseen-mcp --client cursor
```

---

## Claude Desktop Configuration

Add the following to your `claude_desktop_config.json`:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "unseen": {
      "command": "npx",
      "args": ["-y", "unseen-mcp"],
      "env": {
        "OPENROUTER_API_KEY": "sk-or-v1-your-openrouter-key",
        "TYPESAFE_API_KEY": "your-optional-typesafe-key"
      }
    }
  }
}
```

---

## Cursor IDE Configuration

In Cursor Settings -> **Features** -> **MCP**:
1. Click **+ Add New MCP Server**.
2. Name: `unseen`
3. Type: `command`
4. Command: `npx -y unseen-mcp`
5. Add environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key

---

## Environment Variables

| Variable | Description | Required? |
| :--- | :--- | :--- |
| `OPENROUTER_API_KEY` | OpenRouter API key for LLM-assisted document compilation | Recommended for rich natural language compilation (falls back to deterministic heuristics if absent) |
| `TYPESAFE_API_KEY` | TypeSafe API key for Jev semantic audits and missing branch recovery | Optional |

---

## Running Locally

To run the stdio server directly from the command line:

```bash
npx -y unseen-mcp
```

Or build from source in the `unseen` repository:
```bash
git clone https://github.com/eyeinthesky6/unseen.git
cd unseen
npm install
npm run build:mcp
node dist-mcp/index.cjs
```

---

## License

MIT © [Unseen](https://unseendocs.in)
