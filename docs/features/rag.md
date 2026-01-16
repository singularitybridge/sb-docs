---
sidebar_position: 1
---

# RAG (Retrieval-Augmented Generation)

RAG enables agents to access and use information from documents and data sources, improving response accuracy and relevance.

## What is RAG?

RAG combines:
1. **Retrieval**: Finding relevant documents from a knowledge base
2. **Augmentation**: Adding retrieved context to the prompt
3. **Generation**: Producing responses using the augmented context

```
User Query
    │
    ▼
┌─────────────────┐
│ Vector Search   │ ──▶ Relevant Documents
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Context Build   │ ──▶ Augmented Prompt
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ LLM Generation  │ ──▶ Informed Response
└─────────────────┘
```

## Setting Up RAG

### 1. Create a Workspace

Add documents to the agent's workspace:

```typescript
await mcp__agent-hub-sb__add_workspace_item({
  scope: "agent",
  scopeId: "agent-id",
  itemPath: "/docs/product-guide.md",
  content: "# Product Guide\n\n...",
  metadata: {
    contentType: "text/markdown",
    description: "Main product documentation"
  }
});
```

### 2. Configure the Agent

Update the agent prompt to use RAG:

```markdown
You are a support agent with access to product documentation.

When answering questions:
1. Search the workspace for relevant information
2. Use the retrieved context to formulate accurate answers
3. Cite specific documents when possible
4. Acknowledge when information isn't available
```

### 3. Documents Are Auto-Indexed

When you add workspace items, they're automatically:
- Split into chunks
- Converted to embeddings
- Stored for vector search

## How RAG Works

### Document Processing

```
Document
    │
    ▼
┌─────────────────┐
│   Chunking      │  Split into manageable pieces
└─────────────────┘
    │
    ▼
┌─────────────────┐
│   Embedding     │  Convert to vectors
└─────────────────┘
    │
    ▼
┌─────────────────┐
│   Indexing      │  Store in vector DB
└─────────────────┘
```

### Query Processing

```
User Query
    │
    ▼
┌─────────────────┐
│ Query Embedding │  Convert query to vector
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Similarity      │  Find similar documents
│ Search          │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Context         │  Build prompt with context
│ Assembly        │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ LLM Response    │  Generate answer
└─────────────────┘
```

## Supported Document Types

| Type | Extension | Notes |
|------|-----------|-------|
| Markdown | .md, .mdx | Best for structured content |
| Plain text | .txt | Simple documents |
| JSON | .json | Structured data |
| HTML | .html | Web content |
| PDF | .pdf | Rich documents |

## Best Practices

### Document Preparation

1. **Structure clearly**: Use headings, lists, and sections
2. **Keep focused**: One topic per document
3. **Update regularly**: Remove outdated information
4. **Include metadata**: Tags, descriptions, dates

### Chunking Strategy

- Chunk by semantic units (sections, paragraphs)
- Maintain context across chunks
- Include overlap for continuity
- Target 500-1000 tokens per chunk

### Query Optimization

- Use semantic search for concepts
- Combine with keyword search for specific terms
- Adjust similarity thresholds
- Limit results to most relevant

## Example Implementation

### Adding Knowledge Base

```typescript
// Add product documentation
const docs = [
  { path: "/docs/getting-started.md", content: "..." },
  { path: "/docs/features.md", content: "..." },
  { path: "/docs/troubleshooting.md", content: "..." }
];

for (const doc of docs) {
  await mcp__agent-hub-sb__add_workspace_item({
    scope: "agent",
    scopeId: agentId,
    itemPath: doc.path,
    content: doc.content
  });
}
```

### Searching the Knowledge Base

```typescript
const results = await mcp__agent-hub-sb__vector_search_workspace({
  query: "How do I reset my password?",
  scope: "agent",
  scopeId: agentId,
  limit: 5,
  minScore: 0.7
});
```

## Related

- [Vector Search](/features/vector-search)
- [Workspace](/concepts/workspace)
- [Agents](/concepts/agents)
