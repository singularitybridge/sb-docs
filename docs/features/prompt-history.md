---
sidebar_position: 5
---

# Prompt History

Prompt history provides version control for AI assistant prompts, enabling tracking, comparison, and rollback of prompt changes.

## Overview

Features:
- **Automatic versioning**: Every prompt change creates a new version
- **AI-generated descriptions**: GPT-4o-mini summarizes changes
- **Comparison**: Diff between any two versions
- **Rollback**: Restore previous prompt versions
- **Metadata**: Character count, line count, token estimates

## How It Works

```
Prompt Update
    │
    ▼
┌─────────────────┐
│ Save New        │  Store current prompt
│ Version         │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Generate        │  AI describes the changes
│ Description     │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Store           │  MongoDB persistence
│ History         │
└─────────────────┘
```

## API Endpoints

### List Prompt History

```bash
GET /api/assistants/:id/prompt-history
```

**Response:**

```json
{
  "versions": [
    {
      "version": 3,
      "changeType": "update",
      "changeDescription": "Added JIRA integration instructions",
      "createdAt": "2025-01-15T10:30:00Z",
      "metadata": {
        "characterCount": 1250,
        "lineCount": 45,
        "tokenEstimate": 312
      }
    }
  ]
}
```

### Get Specific Version

```bash
GET /api/assistants/:id/prompt-history/:version
```

**Response:**

```json
{
  "version": 2,
  "prompt": "You are a helpful assistant...",
  "changeType": "update",
  "changeDescription": "Updated tone guidelines",
  "createdAt": "2025-01-14T15:00:00Z"
}
```

### Compare Versions

```bash
GET /api/assistants/:id/prompt-history/compare?v1=1&v2=3
```

**Response:**

```json
{
  "v1": {
    "version": 1,
    "prompt": "..."
  },
  "v2": {
    "version": 3,
    "prompt": "..."
  },
  "diff": {
    "added": ["New JIRA instructions", "Updated constraints"],
    "removed": ["Old formatting rules"],
    "characterDelta": 250
  }
}
```

### Rollback to Version

```bash
POST /api/assistants/:id/prompt-history/:version/rollback
```

**Response:**

```json
{
  "success": true,
  "newVersion": 4,
  "changeType": "rollback",
  "changeDescription": "Rolled back to version 2"
}
```

### Get Statistics

```bash
GET /api/assistants/:id/prompt-history/statistics
```

**Response:**

```json
{
  "totalVersions": 15,
  "changeTypes": {
    "initial": 1,
    "update": 12,
    "rollback": 2
  },
  "averageCharacterCount": 1100,
  "lastUpdated": "2025-01-15T10:30:00Z"
}
```

## Change Types

| Type | Description |
|------|-------------|
| `initial` | First prompt version |
| `update` | Normal update |
| `rollback` | Restored from previous version |

## AI Change Descriptions

When a prompt is updated, GPT-4o-mini analyzes the changes:

**Example descriptions:**
- "Added customer support guidelines and updated response formatting"
- "Removed deprecated instructions and simplified role definition"
- "Expanded JIRA integration capabilities with search functionality"

If OpenAI is unavailable, a basic description is generated:
- "Prompt updated (character count: 1250 → 1400)"

## Using Prompt History

### Track Changes Over Time

```typescript
// Get full history
const history = await fetch(`/api/assistants/${id}/prompt-history`);

// Review changes chronologically
history.versions.forEach(v => {
  console.log(`v${v.version}: ${v.changeDescription}`);
});
```

### Compare Before Major Changes

```typescript
// Before updating, compare current with planned changes
const comparison = await fetch(
  `/api/assistants/${id}/prompt-history/compare?v1=${currentVersion}&v2=${currentVersion-1}`
);
```

### Safe Experimentation

```typescript
// Update prompt (new version created automatically)
await updatePrompt(id, newPrompt);

// If issues arise, rollback
await fetch(`/api/assistants/${id}/prompt-history/${previousVersion}/rollback`, {
  method: 'POST'
});
```

## Best Practices

### Version Management

- Review changes before deploying
- Test new prompts before updating
- Keep rollback-ready versions documented
- Use meaningful prompt comments

### Cleanup

- Remove old versions periodically
- Keep significant milestones
- Export before major changes

### Documentation

- Note reasons for major changes
- Track which versions performed well
- Document rollback decisions

## Related

- [Configuring Prompts](/agents/configuring-prompts)
- [Agents](/concepts/agents)
- [Assistants API](/api/endpoints/assistants)
