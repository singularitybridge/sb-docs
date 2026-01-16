---
sidebar_position: 1
---

# Assistants API

Endpoints for managing AI assistants (agents).

## List Assistants

Get all assistants for the authenticated company.

```http
GET /api/assistants
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `teamId` | string | Filter by team |
| `sortBy` | string | Sort field (`name`, `lastUsed`) |
| `order` | string | Sort order (`asc`, `desc`) |

### Response

```json
{
  "data": [
    {
      "id": "681b41850f470a9a746f280e",
      "name": "Support Agent",
      "description": "Customer support assistant",
      "llmProvider": "openai",
      "llmModel": "gpt-4o",
      "maxTokens": 4096,
      "language": "en",
      "teamIds": ["team-123"],
      "lastAccessedAt": "2025-01-15T10:30:00Z",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 15
  }
}
```

## Get Assistant

Get details for a specific assistant.

```http
GET /api/assistants/:id
```

### Response

```json
{
  "id": "681b41850f470a9a746f280e",
  "name": "Support Agent",
  "description": "Customer support assistant",
  "llmProvider": "openai",
  "llmModel": "gpt-4o",
  "llmPrompt": "You are a helpful customer support agent...",
  "maxTokens": 4096,
  "language": "en",
  "voice": "alloy",
  "teamIds": ["team-123"],
  "companyId": "company-456",
  "lastAccessedAt": "2025-01-15T10:30:00Z",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

## Create Assistant

Create a new assistant.

```http
POST /api/assistants
```

### Request Body

```json
{
  "name": "Support Agent",
  "description": "Customer support assistant",
  "llmProvider": "openai",
  "llmModel": "gpt-4o",
  "llmPrompt": "You are a helpful customer support agent...",
  "maxTokens": 4096,
  "language": "en",
  "teamIds": ["team-123"]
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Assistant name |
| `llmProvider` | string | `openai`, `anthropic`, or `google` |
| `llmModel` | string | Model identifier |

### Response

```json
{
  "id": "new-assistant-id",
  "name": "Support Agent",
  ...
}
```

## Update Assistant

Update an existing assistant.

```http
PUT /api/assistants/:id
```

### Request Body

```json
{
  "name": "Updated Name",
  "llmModel": "gpt-4o-mini",
  "llmPrompt": "Updated system prompt..."
}
```

Only include fields to update.

### Response

Returns the updated assistant.

## Delete Assistant

Delete an assistant.

```http
DELETE /api/assistants/:id
```

### Response

```json
{
  "success": true,
  "message": "Assistant deleted"
}
```

## Execute Assistant

Execute an assistant with user input.

```http
POST /api/assistants/:id/execute
```

### Request Body

```json
{
  "userInput": "Hello, I need help with my order",
  "sessionId": "optional-session-id",
  "attachments": [
    {
      "type": "url",
      "mimeType": "image/png",
      "url": "https://example.com/image.png"
    }
  ]
}
```

### Response

```json
{
  "response": "Hello! I'd be happy to help with your order. Could you please provide your order number?",
  "sessionId": "session-123",
  "usage": {
    "inputTokens": 150,
    "outputTokens": 45,
    "totalTokens": 195
  },
  "toolCalls": []
}
```

## Prompt History

### List Versions

```http
GET /api/assistants/:id/prompt-history
```

### Get Version

```http
GET /api/assistants/:id/prompt-history/:version
```

### Compare Versions

```http
GET /api/assistants/:id/prompt-history/compare?v1=1&v2=3
```

### Rollback

```http
POST /api/assistants/:id/prompt-history/:version/rollback
```

### Statistics

```http
GET /api/assistants/:id/prompt-history/statistics
```

## Error Codes

| Code | Description |
|------|-------------|
| `ASSISTANT_NOT_FOUND` | Assistant doesn't exist |
| `INVALID_MODEL` | Unsupported model |
| `INVALID_PROVIDER` | Unsupported provider |
| `RATE_LIMITED` | Too many requests |

## Related

- [Agents Overview](/agents/overview)
- [Sessions API](/api/endpoints/sessions)
