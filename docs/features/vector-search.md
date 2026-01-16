---
sidebar_position: 2
---

# Vector Search

Vector search enables semantic search capabilities, finding documents based on meaning rather than exact keyword matches.

## How It Works

### Traditional Search vs Vector Search

| Aspect | Keyword Search | Vector Search |
|--------|----------------|---------------|
| Matching | Exact terms | Semantic similarity |
| Query | "password reset" | "forgot login credentials" |
| Results | Must contain keywords | Related concepts |
| Typos | Fails | Tolerant |

### The Process

```
Text
  │
  ▼
┌─────────────────┐
│   Embedding     │  Convert to numbers
│   Model         │
└─────────────────┘
  │
  ▼
Vector [0.12, -0.34, 0.56, ...]
  │
  ▼
┌─────────────────┐
│   Vector        │  Store in database
│   Index         │
└─────────────────┘
```

## Setting Up Vector Search

### Prerequisites

1. MongoDB Atlas 6.0+
2. OpenAI API key (for embeddings)

### Create Search Index

Run the setup script:

```bash
npm run create-search-index
```

This creates a vector index on the `contentItems` collection.

### Index Configuration

```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "type": "knnVector",
        "dimensions": 1536,
        "similarity": "cosine"
      }
    }
  }
}
```

## Using Vector Search

### Via API

```bash
curl -X POST https://api.singularitybridge.net/api/workspace/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do I authenticate users?",
    "scope": "agent",
    "scopeId": "agent-id",
    "limit": 10,
    "minScore": 0.7
  }'
```

### Via MCP

```typescript
const results = await mcp__agent-hub-sb__vector_search_workspace({
  query: "authentication and login",
  scope: "agent",
  limit: 5,
  minScore: 0.75
});
```

### Response Format

```json
{
  "results": [
    {
      "path": "/docs/authentication.md",
      "content": "# Authentication\n\n...",
      "score": 0.92,
      "metadata": {
        "contentType": "text/markdown"
      }
    }
  ]
}
```

## Embedding Models

### Default Model

SB Agent Hub uses OpenAI's `text-embedding-ada-002`:
- 1536 dimensions
- Good balance of quality and cost
- Supports 8191 tokens

### Alternative Models

| Model | Dimensions | Quality | Cost |
|-------|------------|---------|------|
| text-embedding-ada-002 | 1536 | Good | $ |
| text-embedding-3-small | 1536 | Better | $ |
| text-embedding-3-large | 3072 | Best | $$ |

## Search Parameters

### minScore

Minimum similarity threshold (0-1):
- `0.9+`: Very similar (strict)
- `0.7-0.9`: Related (balanced)
- `0.5-0.7`: Loosely related (broad)

### limit

Maximum results to return:
- Default: 10
- Max: 50
- Consider context window when setting

## Optimization Tips

### Document Quality

- Use clear, descriptive text
- Include relevant keywords naturally
- Structure with headings and sections

### Query Quality

- Be specific but natural
- Include context when possible
- Test different phrasings

### Performance

- Index only relevant content
- Remove duplicate content
- Prune low-quality documents

## Troubleshooting

### Low Relevance Scores

- Check document quality
- Adjust minScore threshold
- Rephrase queries

### Missing Results

- Verify documents are indexed
- Check scope settings
- Lower minScore threshold

### Slow Queries

- Reduce result limit
- Optimize index settings
- Check database resources

## Related

- [RAG Feature](/features/rag)
- [Workspace](/concepts/workspace)
- [Workspace API](/api/endpoints/workspace)
