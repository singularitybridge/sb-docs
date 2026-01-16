---
sidebar_position: 2
---

# Sessions API

Endpoints for managing conversation sessions between users and assistants.

## List Sessions

Get all sessions for the authenticated user.

```http
GET /api/sessions
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `assistantId` | string | Filter by assistant |
| `active` | boolean | Filter by active status |

### Response

```json
{
  "data": [
    {
      "id": "session-123",
      "assistantId": "assistant-456",
      "assistantName": "Support Agent",
      "userId": "user-789",
      "messageCount": 15,
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

## Get Session

Get details and messages for a specific session.

```http
GET /api/sessions/:id
```

### Response

```json
{
  "id": "session-123",
  "assistantId": "assistant-456",
  "userId": "user-789",
  "messages": [
    {
      "role": "user",
      "content": "Hello!",
      "timestamp": "2025-01-15T10:00:00Z"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help you today?",
      "timestamp": "2025-01-15T10:00:02Z"
    }
  ],
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

## Create Session

Create a new session with an assistant.

```http
POST /api/sessions
```

### Request Body

```json
{
  "assistantId": "assistant-456"
}
```

### Response

```json
{
  "id": "new-session-id",
  "assistantId": "assistant-456",
  "userId": "user-789",
  "messages": [],
  "createdAt": "2025-01-15T10:00:00Z"
}
```

## Send Message

Send a message in a session.

```http
POST /api/sessions/:id/messages
```

### Request Body

```json
{
  "content": "I need help with my order",
  "attachments": []
}
```

### Response

```json
{
  "userMessage": {
    "role": "user",
    "content": "I need help with my order",
    "timestamp": "2025-01-15T10:30:00Z"
  },
  "assistantMessage": {
    "role": "assistant",
    "content": "I'd be happy to help! Could you provide your order number?",
    "timestamp": "2025-01-15T10:30:02Z",
    "toolCalls": []
  },
  "usage": {
    "inputTokens": 200,
    "outputTokens": 30,
    "totalTokens": 230
  }
}
```

## Delete Session

Delete a session and its messages.

```http
DELETE /api/sessions/:id
```

### Response

```json
{
  "success": true,
  "message": "Session deleted"
}
```

## Clear Session Messages

Clear all messages while keeping the session.

```http
DELETE /api/sessions/:id/messages
```

### Response

```json
{
  "success": true,
  "message": "Messages cleared"
}
```

## Get Session Files

List files uploaded in a session.

```http
GET /api/sessions/:id/files
```

### Response

```json
{
  "files": [
    {
      "id": "file-123",
      "name": "document.pdf",
      "mimeType": "application/pdf",
      "size": 102400,
      "uploadedAt": "2025-01-15T10:15:00Z"
    }
  ]
}
```

## Session Scoped Storage

Sessions have their own storage scope:

| TTL | 24 hours |
| Scope | `session` |
| Use | Working files during conversation |

Access session workspace:

```http
GET /api/workspace/items?scope=session&scopeId=session-123
```

## Error Codes

| Code | Description |
|------|-------------|
| `SESSION_NOT_FOUND` | Session doesn't exist |
| `SESSION_EXPIRED` | Session has expired |
| `ASSISTANT_NOT_FOUND` | Referenced assistant doesn't exist |
| `MESSAGE_TOO_LONG` | Message exceeds limit |

## Related

- [Sessions Concept](/concepts/sessions)
- [Assistants API](/api/endpoints/assistants)
