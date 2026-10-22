# Workflow Quality Checklist

Use this checklist before and after compiling a workflow.

## Material elements

Check for:

- trigger/start condition;
- actors and owners;
- ordered actions;
- handoffs;
- approvals;
- decisions;
- positive branches;
- negative/rejection branches;
- exceptions;
- loops/rework;
- thresholds or amounts;
- deadlines/timing;
- systems/channels when operationally material;
- end states/outcomes.

## Questions worth asking the user

Ask only when the answer materially changes the workflow.

Examples:

- The source says "authorized approver" but never names the role. Who is it?
- Two sections specify different approval thresholds. Which rule applies?
- A rejection path says "correct and resubmit" but does not say who performs correction. Who owns it?
- The source states the success path but never says what happens if the check fails. Is there a defined rejection/escalation path?

## Do not ask about

- cosmetic wording;
- obvious labels that do not change semantics;
- details already supported by supplied evidence;
- preferences the renderer can choose automatically.

## High-severity defects

Treat these as more important than style:

- wrong approval authority;
- invented approval or threshold;
- omitted rejection path;
- incorrect ordering/dependency;
- merged workflows that are actually separate;
- fabricated exception;
- contradiction silently resolved;
- source citation pointing to unrelated evidence.

## Visual quality comes after semantic quality

First preserve the process. Then optimize:

- hierarchy;
- crossings;
- density;
- label length;
- grouping;
- orientation;
- presentation readiness.
