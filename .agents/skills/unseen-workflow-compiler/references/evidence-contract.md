# Evidence Contract

Use this reference when preparing evidence for Unseen.

## Authoritative evidence versus advisory context

**Authoritative evidence** can come from:

- faithful document excerpts;
- exact table/spreadsheet values;
- explicit user statements in the current interaction;
- previously supplied clarification answers whose provenance is retained.

**Advisory host context** can include:

- candidate workflow boundaries;
- suspected actors;
- ambiguity notices;
- contradiction notices;
- assumptions;
- relevant conversation context.

Host analysis must never be silently copied into a source excerpt.

## WorkflowEvidenceEnvelope v0.1

Illustrative shape:

```json
{
  "schemaVersion": "0.1",
  "userGoal": "Map the vendor onboarding approval workflow",
  "sources": [
    {
      "id": "s1",
      "name": "Vendor Policy.pdf",
      "locator": "p. 4, Approval",
      "excerpt": "Purchases above $50,000 require CFO approval.",
      "artifactId": "optional-host-reference"
    }
  ],
  "hostContext": {
    "actors": ["Procurement", "Finance", "CFO"],
    "ambiguities": [],
    "contradictions": [],
    "assumptions": [],
    "userContext": []
  },
  "priorAnswers": []
}
```

## Source rules

- Keep source IDs stable during a compilation/resume cycle.
- Locators must be useful to a human reviewer.
- Use verbatim or faithfully extracted content; do not paraphrase away conditions.
- If a source is a user answer, label its locator clearly as a user clarification.
- Preserve conflicting evidence as separate sources.
- Do not merge multiple rules into one synthetic excerpt.

## Provenance classes

When describing a fact in your own response, distinguish:

- **document-backed**
- **user-confirmed**
- **host hypothesis**
- **unresolved**

This distinction is more important than making the workflow look complete.
