---
sidebar_position: 3
---

# MCP Server

The MCP (Model Context Protocol) server enables direct integration with Claude Code and other MCP-compatible clients.

## Overview

The MCP server exposes SB Agent Hub functionality as tools that can be called from Claude Code or other MCP clients.

## Available Tools

### Agent Management

| Tool | Description |
|------|-------------|
| `list_agents` | List all agents for the company |
| `list_agents_by_team` | List agents in a specific team |
| `get_agent_info` | Get agent details |
| `get_agent_prompt` | Get agent's system prompt |
| `update_agent_prompt` | Update agent's prompt |
| `update_agent` | Update agent metadata |
| `create_agent` | Create a new agent |
| `assign_agent_to_team` | Assign agent to teams |

### Agent Execution

| Tool | Description |
|------|-------------|
| `execute` | Execute an agent with user input |

### Workspace Management

| Tool | Description |
|------|-------------|
| `list_workspace_items` | List items in workspace |
| `get_workspace_item` | Get a specific item |
| `add_workspace_item` | Add an item to workspace |
| `delete_workspace_item` | Delete an item |
| `move_workspace_item` | Move/rename an item |
| `vector_search_workspace` | Semantic search |

### Teams

| Tool | Description |
|------|-------------|
| `list_teams` | List all teams |

### UI Control

| Tool | Description |
|------|-------------|
| `get_ui_context` | Get current UI state |
| `navigate_to_page` | Navigate user's browser |
| `open_workspace_file` | Open file in viewer |
| `show_notification` | Display notification |

## Tool Examples

### Execute Agent

```typescript
await mcp__agent-hub-sb__execute({
  assistantId: "681b41850f470a9a746f280e",
  userInput: "Hello, how can you help me?",
  sessionId: "optional-session-id"
});
```

### List Agents

```typescript
const agents = await mcp__agent-hub-sb__list_agents({
  limit: 50,
  offset: 0
});
```

### Update Agent

```typescript
await mcp__agent-hub-sb__update_agent({
  agentId: "agent-id-or-name",
  name: "Updated Name",
  llmModel: "gpt-4o",
  prompt: "Updated system prompt..."
});
```

### Workspace Operations

```typescript
// List items
const items = await mcp__agent-hub-sb__list_workspace_items({
  scope: "agent",
  scopeId: "agent-id"
});

// Add item
await mcp__agent-hub-sb__add_workspace_item({
  scope: "agent",
  scopeId: "agent-id",
  itemPath: "/docs/guide.md",
  content: "# Guide\n\nContent here..."
});

// Vector search
const results = await mcp__agent-hub-sb__vector_search_workspace({
  query: "authentication",
  scope: "agent",
  limit: 10,
  minScore: 0.7
});
```

### UI Control

```typescript
// Get current context
const context = await mcp__agent-hub-sb__get_ui_context();

// Navigate
await mcp__agent-hub-sb__navigate_to_page({
  path: "/admin/assistants"
});

// Show notification
await mcp__agent-hub-sb__show_notification({
  message: "Agent updated successfully!",
  type: "success"
});
```

## Connection Setup

### Claude Code Configuration

Add to your MCP settings:

```json
{
  "mcpServers": {
    "agent-hub-sb": {
      "command": "node",
      "args": ["/path/to/mcp-server.js"],
      "env": {
        "API_URL": "https://api.singularitybridge.net",
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## Authentication

MCP tools authenticate using:
1. API key in environment
2. User context from connected session
3. Company context inherited from user

## Response Format

### Success

```json
{
  "content": [
    {
      "type": "text",
      "text": "Operation completed successfully"
    }
  ]
}
```

### Error

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Agent not found"
  }
}
```

## Best Practices

### Tool Selection

- Use specific tools over generic ones
- Batch related operations
- Check prerequisites before operations

### Error Handling

- Handle missing resources gracefully
- Provide clear error messages
- Retry transient failures

### Performance

- Limit result sets appropriately
- Use pagination for large collections
- Cache frequently accessed data

## Related

- [API Overview](/api/overview)
- [Agents](/concepts/agents)
- [Workspace](/concepts/workspace)
