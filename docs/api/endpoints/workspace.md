---
sidebar_position: 4
---

# Workspace API

Endpoints for managing workspace items and performing vector search.

## Storage Scopes

| Scope | TTL | Description |
|-------|-----|-------------|
| `agent` | 7 days | Agent-specific files |
| `session` | 24 hours | Session working files |
| `company` | Permanent | Organization-wide files |
| `temporary` | 10 minutes | Ephemeral files |

## List Items

List workspace items by scope.

```http
GET /api/workspace/items
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | No | Storage scope (default: `agent`) |
| `scopeId` | string | No* | Agent ID or session ID |
| `prefix` | string | No | Path prefix filter |

*Required for `agent` and `session` scopes.

### Response

```json
{
  "items": [
    {
      "path": "/docs/guide.md",
      "contentType": "text/markdown",
      "size": 2048,
      "createdAt": "2025-01-15T10:00:00Z",
      "metadata": {
        "description": "User guide"
      }
    }
  ]
}
```

## Get Item

Retrieve a specific workspace item.

```http
GET /api/workspace/items/get
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | No | Storage scope |
| `scopeId` | string | No* | Agent ID or session ID |
| `itemPath` | string | Yes | Path to item |

### Response

```json
{
  "path": "/docs/guide.md",
  "content": "# User Guide\n\nWelcome to...",
  "contentType": "text/markdown",
  "size": 2048,
  "metadata": {
    "description": "User guide",
    "tags": ["documentation"]
  },
  "createdAt": "2025-01-15T10:00:00Z"
}
```

## Add Item

Add a new item to the workspace.

```http
POST /api/workspace/items
```

### Request Body

```json
{
  "scope": "agent",
  "scopeId": "agent-123",
  "itemPath": "/docs/new-guide.md",
  "content": "# New Guide\n\nContent here...",
  "metadata": {
    "contentType": "text/markdown",
    "description": "New documentation",
    "tags": ["documentation", "new"]
  }
}
```

### For Large Files

Use `fileUrl` instead of `content`:

```json
{
  "scope": "agent",
  "scopeId": "agent-123",
  "itemPath": "/data/large-file.pdf",
  "fileUrl": "https://example.com/large-file.pdf"
}
```

### Response

```json
{
  "success": true,
  "path": "/docs/new-guide.md",
  "message": "Item created"
}
```

## Delete Item

Delete a workspace item.

```http
DELETE /api/workspace/items
```

### Request Body

```json
{
  "scope": "agent",
  "scopeId": "agent-123",
  "itemPath": "/docs/old-guide.md"
}
```

### Response

```json
{
  "success": true,
  "message": "Item deleted"
}
```

## Move Item

Move or rename a workspace item.

```http
POST /api/workspace/items/move
```

### Request Body

```json
{
  "fromScope": "agent",
  "fromScopeId": "agent-123",
  "fromPath": "/docs/old-name.md",
  "toPath": "/docs/new-name.md",
  "toScope": "agent",
  "toScopeId": "agent-123"
}
```

Can move across scopes:

```json
{
  "fromScope": "session",
  "fromScopeId": "session-456",
  "fromPath": "/uploads/report.pdf",
  "toPath": "/reports/final-report.pdf",
  "toScope": "agent",
  "toScopeId": "agent-123"
}
```

### Response

```json
{
  "success": true,
  "message": "Item moved"
}
```

## Vector Search

Search workspace items semantically.

```http
POST /api/workspace/search
```

### Request Body

```json
{
  "query": "How do I authenticate users?",
  "scope": "agent",
  "scopeId": "agent-123",
  "limit": 10,
  "minScore": 0.7
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `scope` | string | No | Storage scope |
| `scopeId` | string | No* | Scope identifier |
| `limit` | number | No | Max results (default: 10, max: 50) |
| `minScore` | number | No | Min similarity (0-1, default: 0.7) |

### Response

```json
{
  "results": [
    {
      "path": "/docs/authentication.md",
      "content": "# Authentication\n\nTo authenticate users...",
      "score": 0.92,
      "metadata": {
        "contentType": "text/markdown"
      }
    },
    {
      "path": "/docs/security.md",
      "content": "# Security\n\nAuthentication best practices...",
      "score": 0.85,
      "metadata": {}
    }
  ],
  "query": "How do I authenticate users?",
  "totalResults": 2
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `ITEM_NOT_FOUND` | Item doesn't exist |
| `ITEM_EXISTS` | Item already exists at path |
| `INVALID_SCOPE` | Invalid scope specified |
| `SCOPE_ID_REQUIRED` | Scope ID required for scope |
| `PATH_REQUIRED` | Item path is required |

## Related

- [Workspace Concept](/concepts/workspace)
- [Vector Search Feature](/features/vector-search)
- [RAG Feature](/features/rag)
