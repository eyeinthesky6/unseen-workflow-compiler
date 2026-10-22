---
name: unseen
license: MIT
description: >
  Turn messy operational documents, standard operating procedures (SOPs), compliance policies,
  incident playbooks, spreadsheets, and business conversations into faithful, source-grounded,
  publication-ready visual workflows. Use whenever the user needs a flowchart, process map,
  decision tree, or operational diagram extracted from unstructured documents or conversations.
  Enforces source-evidence fidelity, bounded WorkflowEvidenceEnvelope construction, interactive
  clarification loops, and deterministic vector visual rendering.
---

# Unseen — The Workflow Compiler for AI Agents

Unseen compiles unstructured operational context into structured, source-grounded, presentation-ready workflows adhering strictly to **Visual Contract v0.1**.

The host agent (ChatGPT, Claude, Claude Code, Cursor, Antigravity) owns the conversation, workspace interaction, and document reading. Unseen owns workflow compilation, ambiguity audits, evidence grounding, and deterministic visual layout.

---

## 1. Read the Live Specs

The live Unseen service publishes machine-readable discovery interfaces modeled after industry agent-first standards:

- **Quick Discovery Index**: [`GET /llms.txt`](https://unseen.design/llms.txt) — high-density matrix of tools, routes, and invariants.
- **Complete Reference**: [`GET /llms-full.txt`](https://unseen.design/llms-full.txt) — single-file comprehensive agent contract and schemas.
- **MCP Server Metadata**: [`GET /.well-known/mcp.json`](https://unseen.design/.well-known/mcp.json) — tools and HTTP transport specifications.
- **A2A Agent Card**: [`GET /.well-known/agent.json`](https://unseen.design/.well-known/agent.json) — machine-to-machine delegation card.
- **OpenAPI 3.1 Spec**: [`GET /api/openapi.json`](https://unseen.design/api/openapi.json) — REST schema for GPT Actions and programmatic callers.

---

## 2. Quick Task & Tool Matrix

Choose the appropriate tool based on user intent:

| User Intent | MCP Tool | Input Payload | Output Format |
| --- | --- | --- | --- |
| Create flowchart from SOP, policy, playbook, or text | `compile_workflow` | `WorkflowEvidenceEnvelope` | `VisualSpec` JSON, SVG XML, Mermaid (`flowchart TD`) |
| Resolve contradictions or gaps identified by Unseen | `compile_workflow` | `jobId` + `priorAnswers` | Transition from `needs_input` to `ready` visual |
| Modify labels, flip step/decision roles, remove nodes | `revise_workflow` | `spec` + `instruction` | Revised `VisualSpec`, updated SVG & Mermaid |
| Retrieve a previously compiled or saved workflow | `get_workflow` | `{ id: "wfjob_..." }` | Stored `VisualSpec`, SVG layout, and Mermaid syntax |
| Filter legal boilerplate from operational chunks | `/api/classify-discourse` | `{ sources: Source[] }` | Sources tagged with `discourseRole` & confidence |

---

## 3. Core Architectural Invariants

### Invariant 1: Code & Compiler Own Workflow; Host Owns Conversation
Do not attempt to compute 2D visual layout coordinates or draw complex flowchart geometry in prompt text. Let Unseen's layout engine mathematically guarantee collision-free node placement and optimal orthogonal connector routing.

### Invariant 2: Never Let the Model Rewrite Away Evidence
A capable AI host may be tempted to "clean up" or summarize messy SOP text before visualizing it. **Do not do this.** 

When text is rewritten into clean prose, models frequently:
1. **Silently delete exceptions** (e.g. dropping a 1-sentence clause about what to do if an audit fails).
2. **Normalize contradictions** that should have been highlighted to leadership.
3. **Invent implied owners or step sequences** never stated in the source.

Always divide input into two strictly separated layers:
1. **Authoritative Evidence Layer (`sources`)**: Verbatim excerpts with exact locators (`"Page 4, §3.2"`, `"Row 14 [Triage Playbook]"`).
2. **Advisory Host Layer (`hostContext`)**: The host agent's non-authoritative observations, suspected ambiguities, candidate workflows, or identified contradictions.

### Invariant 3: Mandatory Negative Branching (Process Engineering Truth)
Every condition, eligibility check, or approval gate MUST have at least two explicit outgoing branches:
- **Affirmative Path** (e.g. `Approved`, `Eligible`, `Passed`)
- **Negative / Exception Path** (e.g. `Rejected`, `Escalated`, `Audit Failed`)
Never let a decision diamond terminate in a dead end. Negative paths must route to an explicit terminal state or corrective loop.

---

## 4. Constructing the `WorkflowEvidenceEnvelope`

To compile a workflow, formulate a `WorkflowEvidenceEnvelope` payload:

```json
{
  "schemaVersion": "0.1",
  "userGoal": "Visualize the driver onboarding and compliance verification lifecycle",
  "desiredOutput": {
    "orientation": "portrait",
    "depth": "detailed"
  },
  "sources": [
    {
      "id": "s1",
      "locator": "SOP §2.1 (Sourcing)",
      "excerpt": "Site supervisor collects candidate driving license, Aadhaar card, and mobile number."
    },
    {
      "id": "s2",
      "locator": "SOP §2.2 (Verification)",
      "excerpt": "Operations team verifies Aadhaar against UIDAI portal. If verification fails, candidate is rejected."
    },
    {
      "id": "s3",
      "locator": "SOP §2.3 (Consent)",
      "excerpt": "Candidate signs Traqo GPS tracking consent form prior to vehicle allotment."
    }
  ],
  "hostContext": {
    "actors": ["Site Supervisor", "Operations Team", "Driver Candidate"],
    "contradictions": [],
    "ambiguities": [
      "Who notifies the driver if Aadhaar verification fails?"
    ]
  }
}
```

### Bounded Constraints (Visual Contract v0.1)
* `sources`: Maximum 60 entries (contract ceiling).
* `excerpt`: Verbatim text, maximum 4,000 characters per excerpt.
* `locator`: Short descriptive pointer, maximum 200 characters.
* `userGoal`: Specific process goal, maximum 500 characters.
* `nodes`: Max 12 nodes per macro visual (enforces cognitive scanability).
* `edges`: Max 24 edges per macro visual.

---

## 5. The Clarification Loop (`needs_input` Handling)

Unseen will not hallucinate business logic when source evidence contains material gaps or conflicts. Instead, it pauses and yields control back to you via `status: "needs_input"`:

### Step 1: Unseen Returns Clarification Questions
```json
{
  "status": "needs_input",
  "jobId": "wfjob_94821a",
  "reason": "Material contradictions or ambiguities require clarification.",
  "questions": [
    {
      "id": "q_ambig_1",
      "reason": "ambiguous_rule",
      "question": "The SOP mentions both T+1 and same-day approval. Which rule applies here?",
      "materiality": "high"
    }
  ]
}
```

### Step 2: Present Questions Conversationally to the User
Ask the user the exact blocking questions clearly inside the chat:
> *"I'm generating your workflow, but noticed an ambiguity in Section 2. The SOP mentions both T+1 and same-day approval. Which rule should this diagram reflect?"*

### Step 3: Resume Compilation with `priorAnswers`
Once the user responds, re-invoke `compile_workflow` with the same `jobId` and append the resolved answers:
```json
{
  "jobId": "wfjob_94821a",
  "priorAnswers": [
    {
      "questionId": "q_ambig_1",
      "answer": "Same-day approval applies for domestic routes; T+1 applies for export cargo.",
      "source": "user"
    }
  ]
}
```
Unseen incorporates the clarified rule as verified ground-truth and transitions to `status: "ready"`.

---

## 6. Consuming the Compiled Workflow Output

When compilation succeeds (`status: "ready"`), Unseen returns:
1. `spec` (`VisualSpec` JSON conforming to Visual Contract v0.1): Contains `nodes` (`step` | `decision` | `concept`), `edges` (with directional labels), and cited `sourceIds`.
2. `svg`: Standalone, publication-ready vector SVG with high-contrast styling and collision-free geometry.
3. `mermaid`: Clean `flowchart TD` or `flowchart LR` code block.
4. `metrics`: Exact count of nodes, edges, decision diamonds, and sources cited.

### How to Present to the User
* If the host interface renders Mermaid (e.g. Cursor, Claude, ChatGPT): Display the Mermaid code fence for instant inline interactive viewing.
* If the host supports raw HTML/SVG: Render the standalone SVG visual directly.
* Provide an executive summary of the process, citing exact source markers (`[s1]`, `[s2]`) for every decision gate.

---

## 7. Revising Existing Workflows (`revise_workflow`)

When the user asks to modify an existing visual (*"Add an escalation to the VP if review takes > 24 hours"*):
1. **Preserve Grounding**: Determine if the requested change is user-supplied domain knowledge or grounded in an existing document source.
2. **Formulate Delta**: If invoking `revise_workflow`, supply the existing `jobId` or `spec` along with the natural language instruction.
3. **Verify Decision Diamonds**: Ensure negative/rejection paths terminate in explicit resolution or return states rather than dead ends.
4. **Connection Autofix**: Unseen automatically straightens lines and rescues orphan cards during revision ($0 COGS, instantaneous).
