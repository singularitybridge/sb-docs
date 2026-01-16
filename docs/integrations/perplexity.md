---
sidebar_position: 6
---

# Perplexity Integration

Perplexity provides powerful web search capabilities for agents, enabling them to access current information from the internet.

## Configuration

### API Key

```json
{
  "apiKeys": {
    "perplexity_api_key": "pplx-..."
  }
}
```

Get your API key from [Perplexity Settings](https://www.perplexity.ai/settings/api).

## Available Actions

### webSearch

Search the web and get synthesized results.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `maxResults` | number | No | Maximum results |

**Example:**

```json
{
  "action": "webSearch",
  "arguments": {
    "query": "latest React 19 features 2025"
  }
}
```

**Response:**

```json
{
  "answer": "React 19 introduces several new features...",
  "sources": [
    {
      "title": "React 19 Release Notes",
      "url": "https://react.dev/blog/...",
      "snippet": "..."
    }
  ]
}
```

### researchQuery

Conduct deep research on a topic.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Research question |
| `depth` | string | No | Research depth |

## MCP Tools

Via MCP server:

```typescript
// Quick question
await mcp__perplexity__perplexity_ask({
  messages: [
    { role: "user", content: "What is the current price of Bitcoin?" }
  ]
});

// Deep research
await mcp__perplexity__perplexity_research({
  messages: [
    { role: "user", content: "Analyze the impact of AI on software development" }
  ]
});

// Reasoning
await mcp__perplexity__perplexity_reason({
  messages: [
    { role: "user", content: "Compare microservices vs monolithic architecture" }
  ]
});

// Web search
await mcp__perplexity__perplexity_search({
  query: "TypeScript 5.4 features",
  maxResults: 10
});
```

## Available Models

| Model | Best For |
|-------|----------|
| `sonar` | General queries |
| `sonar-reasoning-pro` | Complex reasoning |
| `sonar-pro` | Deep research |

## Agent Integration

Example prompt for research agent:

```markdown
You are a research assistant with web search capabilities.

When researching:
1. Search for multiple sources on the topic
2. Cross-reference information
3. Provide citations for claims
4. Summarize key findings

Always:
- Mention your sources
- Note when information might be outdated
- Distinguish facts from opinions
```

## Use Cases

### Current Events

```json
{
  "action": "webSearch",
  "arguments": {
    "query": "latest tech news today January 2025"
  }
}
```

### Technical Documentation

```json
{
  "action": "webSearch",
  "arguments": {
    "query": "Next.js 15 app router documentation"
  }
}
```

### Market Research

```json
{
  "action": "researchQuery",
  "arguments": {
    "query": "AI startup funding trends Q4 2024",
    "depth": "comprehensive"
  }
}
```

## Best Practices

### Query Formulation

- Be specific and clear
- Include relevant context
- Specify time frame when needed
- Use technical terms correctly

### Result Handling

- Verify important claims
- Note source quality
- Acknowledge limitations
- Update stale information

### Cost Management

- Cache common queries
- Batch similar searches
- Use appropriate model for task

## Related

- [Actions](/concepts/actions)
- [Integrations Overview](/integrations/overview)
- [OpenAI Integration](/integrations/openai)
