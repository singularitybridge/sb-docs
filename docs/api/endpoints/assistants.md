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

Execute an assistant with user input (stateless execution).

```http
POST /api/assistant/:id/execute
```

:::tip
The endpoint uses singular `/assistant/` (not `/assistants/`). You can use either the assistant ID or name.
:::

### Request Body

```json
{
  "userInput": "Search JIRA for issues about login",
  "includeToolCalls": true,
  "promptOverride": "Optional custom system prompt",
  "attachments": [
    {
      "type": "url",
      "mimeType": "image/png",
      "url": "https://example.com/image.png"
    }
  ],
  "responseFormat": {
    "type": "json_object"
  }
}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `userInput` | string | required | The user message to send |
| `includeToolCalls` | boolean | `false` | Include tool call details in response |
| `promptOverride` | string | - | Override the assistant's system prompt |
| `attachments` | array | - | File attachments (URL or base64) |
| `responseFormat` | object | - | Set to `{type: "json_object"}` for JSON mode |

### Response (with `includeToolCalls: true`)

```json
{
  "id": "msg_1769282796319_yioec2g7n",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "Here are some JIRA issues related to login..."
      }
    }
  ],
  "created_at": 1769282796,
  "assistant_id": "681b41850f470a9a746f280e",
  "message_type": "tool_calls",
  "data": {
    "toolCalls": [
      {
        "toolName": "jira_fetchTickets",
        "input": {
          "jql": "summary ~ login",
          "maxResults": 10
        }
      }
    ],
    "toolResults": [
      {
        "toolName": "jira_fetchTickets",
        "output": [
          {
            "key": "WM-762",
            "summary": "Add field for user last login",
            "status": "Done"
          }
        ]
      }
    ]
  }
}
```

### Response (without `includeToolCalls` - default)

```json
{
  "id": "msg_1769282819803_8zpglqemv",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "Here are some JIRA issues related to authentication..."
      }
    }
  ],
  "created_at": 1769282819,
  "assistant_id": "681b41850f470a9a746f280e",
  "message_type": "text"
}
```

### Streaming Response

Add `Accept: text/event-stream` header for SSE streaming:

```http
POST /api/assistant/:id/execute
Accept: text/event-stream
```

Streaming events:
- `data:{"type":"token","value":"Hello"}` - Text tokens
- `data:{"type":"done"}` - Stream complete

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
