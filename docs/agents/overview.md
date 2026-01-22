---
sidebar_position: 1
---

# Agents Overview

Agents are AI-powered assistants that can be customized for specific tasks, domains, or workflows. This section covers everything you need to know about working with agents.

## Agent Types

### General Purpose Agents

Versatile agents that can handle a wide range of tasks:
- Customer support
- Content generation
- Data analysis
- Code assistance

### Specialized Agents

Agents configured for specific domains:
- **Product Management**: JIRA integration, sprint planning
- **Voice Assistants**: Phone integration via VAPI
- **Code Review**: Repository analysis and suggestions
- **Research**: Web search and document analysis

## Agent Architecture

```
┌────────────────────────────────────────────────────────────┐
│                         Agent                               │
├────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Prompt    │  │   Model     │  │   Actions   │        │
│  │  (System)   │  │  (LLM)      │  │ (Functions) │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Workspace  │  │   Teams     │  │   Config    │        │
│  │  (RAG)      │  │  (Access)   │  │  (Settings) │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└────────────────────────────────────────────────────────────┘
```

## Supported Models

### OpenAI

| Model | Best For | Speed |
|-------|----------|-------|
| `gpt-5` | Most capable | Medium |
| `gpt-4o` | Complex reasoning | Medium |
| `gpt-4o-mini` | Fast responses | Fast |
| `o3` | Advanced reasoning | Slow |

### Anthropic

| Model | Best For | Speed |
|-------|----------|-------|
| `claude-opus-4-5` | Most capable | Slow |
| `claude-sonnet-4-5` | Code, analysis | Medium |
| `claude-haiku-4-5` | Fast tasks | Fast |

### Google

| Model | Best For | Speed |
|-------|----------|-------|
| `gemini-3-pro-preview` | Most capable | Medium |
| `gemini-2.5-pro` | Complex tasks | Medium |
| `gemini-2.5-flash` | Fast responses | Fast |

## Managing Agents

### Via Web Dashboard

1. Navigate to **Admin > Agents**
2. View, create, edit, or delete agents
3. Configure prompts and settings
4. Assign to teams

### Via API

```bash
# List all agents
GET /api/assistants

# Get agent details
GET /api/assistants/:id

# Update agent
PUT /api/assistants/:id

# Delete agent
DELETE /api/assistants/:id
```

### Via MCP

```typescript
// List agents
await mcp__agent-hub-sb__list_agents();

// Get agent info
await mcp__agent-hub-sb__get_agent_info({
  agentId: "agent-name-or-id"
});

// Update agent
await mcp__agent-hub-sb__update_agent({
  agentId: "agent-name-or-id",
  name: "New Name",
  llmModel: "gpt-4o"
});
```

## Agent Metrics

Track agent performance:

- **Usage**: Number of sessions and messages
- **Cost**: Token usage and API costs
- **Last Access**: When the agent was last used

## Next Steps

- [Creating Agents](/agents/creating-agents)
- [Configuring Prompts](/agents/configuring-prompts)
- [Teams](/agents/teams)
