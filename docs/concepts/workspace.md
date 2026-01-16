---
sidebar_position: 4
---

# Workspace

The Workspace is a file storage system that allows agents to access, create, and manage documents and data. It enables RAG (Retrieval-Augmented Generation) capabilities.

## What is a Workspace?

A workspace provides:

- **Document storage** for agent knowledge bases
- **Vector search** for semantic retrieval
- **Scoped access** at different levels (agent, session, company)
- **File management** for uploads and downloads

## Storage Scopes

Workspaces support multiple storage scopes:

| Scope | TTL | Description |
|-------|-----|-------------|
| `agent` | 7 days | Agent-specific files |
| `session` | 24 hours | Session working files |
| `company` | Permanent | Organization-wide resources |
| `temporary` | 10 minutes | Ephemeral processing files |

## Workspace Structure

```
/workspace
├── /agent/{agentId}
│   ├── /docs
│   │   ├── README.md
│   │   └── api-guide.md
│   └── /data
│       └── config.json
├── /session/{sessionId}
│   └── /uploads
│       └── user-file.csv
└── /company
    └── /templates
        └── onboarding.md
```

## Working with Workspace

### Listing Items

```bash
curl https://api.singularitybridge.net/api/workspace/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -G -d "scope=agent" -d "scopeId=681b41850f470a9a746f280e"
```

### Adding Items

```bash
curl -X POST https://api.singularitybridge.net/api/workspace/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "agent",
    "scopeId": "681b41850f470a9a746f280e",
    "itemPath": "/docs/guide.md",
    "content": "# User Guide\n\nThis is the user guide...",
    "metadata": {
      "contentType": "text/markdown",
      "description": "Main user guide"
    }
  }'
```

### Reading Items

```bash
curl https://api.singularitybridge.net/api/workspace/items/get \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -G -d "scope=agent" -d "itemPath=/docs/guide.md"
```

## Vector Search

Workspace items are automatically indexed for semantic search:

```bash
curl -X POST https://api.singularitybridge.net/api/workspace/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do I reset my password?",
    "scope": "agent",
    "scopeId": "681b41850f470a9a746f280e",
    "limit": 5,
    "minScore": 0.7
  }'
```

### How Vector Search Works

1. **Content indexed**: Documents are converted to embeddings
2. **Query embedded**: Search query converted to vector
3. **Similarity search**: Find documents with similar vectors
4. **Results ranked**: Return most relevant documents

## Using MCP Tools

The MCP server provides workspace tools:

```typescript
// List workspace items
await mcp__agent-hub-sb__list_workspace_items({
  scope: "agent",
  scopeId: "681b41850f470a9a746f280e"
});

// Add workspace item
await mcp__agent-hub-sb__add_workspace_item({
  scope: "agent",
  scopeId: "681b41850f470a9a746f280e",
  itemPath: "/docs/new-doc.md",
  content: "# New Document\n\nContent here..."
});

// Vector search
await mcp__agent-hub-sb__vector_search_workspace({
  query: "authentication flow",
  scope: "agent",
  limit: 10
});
```

## File Uploads

For large files, use the file upload endpoint:

```bash
curl -X POST https://api.singularitybridge.net/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@document.pdf" \
  -F "scope=agent" \
  -F "agentId=681b41850f470a9a746f280e"
```

Or provide a URL for the system to fetch:

```typescript
await mcp__agent-hub-sb__add_workspace_item({
  itemPath: "/data/large-file.pdf",
  fileUrl: "https://example.com/large-file.pdf"
});
```

## Best Practices

### Organization

- Use clear, hierarchical paths
- Group related documents in folders
- Add metadata for better searchability

### Content Optimization

- Break large documents into sections
- Use descriptive titles and headings
- Include relevant keywords for search

### Access Control

- Use appropriate scopes for sensitivity
- Session scope for temporary user data
- Company scope for shared resources

## Related

- [Vector Search Feature](/features/vector-search)
- [RAG Feature](/features/rag)
- [Workspace API](/api/endpoints/workspace)
