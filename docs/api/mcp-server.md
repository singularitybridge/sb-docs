---
sidebar_position: 3
---

# MCP Server

The MCP (Model Context Protocol) server enables direct integration with Claude Code and other MCP-compatible clients.

## Overview

The MCP server exposes **30 tools** for managing agents, teams, workspaces, integrations, and more. These tools can be called from Claude Code or other MCP-compatible clients.

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
| `delete_agent` | Delete an agent permanently |
| `assign_agent_to_team` | Assign agent to teams |
| `remove_agent_from_team` | Remove agent from teams |

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
| `get_team` | Get specific team details |
| `create_team` | Create a new team |
| `update_team` | Update team metadata |
| `delete_team` | Delete a team |

### Cost Tracking

| Tool | Description |
|------|-------------|
| `get_cost_summary` | Get usage costs by model, provider, and assistant |

### Integrations

| Tool | Description |
|------|-------------|
| `list_integrations` | List all available integrations |
| `get_integration_details` | Get detailed info about an integration |
| `trigger_integration_action` | Execute an integration action |

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
// Basic execution
await mcp__agent-hub-sb__execute({
  assistantId: "681b41850f470a9a746f280e",
  userInput: "Search JIRA for issues about login"
});

// With all options
await mcp__agent-hub-sb__execute({
  assistantId: "Anna",  // Can use ID or name
  userInput: "Search JIRA for issues about login",
  sessionId: "optional-session-id",
  systemPromptOverride: "You are a helpful assistant...",
  includeToolCalls: true  // Default: true for MCP
});
```

:::tip Tool Call Visibility
MCP execute includes tool calls in the response by default. The response will show:
- Which tools were called
- Arguments passed to each tool
- Results returned from each tool

Example response:
```
Here are the JIRA issues about login...

---
**Tool Calls (1):**
[
  {
    "tool": "jira_fetchTickets",
    "args": { "jql": "summary ~ login" },
    "result": [{ "key": "WM-762", "summary": "Add login field" }]
  }
]
```
:::

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

### Team Management

```typescript
// Create a team
await mcp__agent-hub-sb__create_team({
  name: "Engineering",
  description: "Engineering team agents",
  icon: "Code"
});

// Update a team
await mcp__agent-hub-sb__update_team({
  teamId: "team-id",
  description: "Updated description"
});

// Delete a team
await mcp__agent-hub-sb__delete_team({
  teamId: "team-id"
});
```

### Cost Tracking

```typescript
// Get cost summary
const costs = await mcp__agent-hub-sb__get_cost_summary({
  startDate: "2025-01-01",
  endDate: "2025-01-31"
});

// Returns breakdown by model, provider, and assistant
```

### Integration Tools

```typescript
// List all integrations
const integrations = await mcp__agent-hub-sb__list_integrations();

// Get integration details
const jiraDetails = await mcp__agent-hub-sb__get_integration_details({
  integrationId: "jira"
});

// Trigger an action
await mcp__agent-hub-sb__trigger_integration_action({
  actionId: "jira.createTicket",
  parameters: {
    summary: "New ticket from Claude Code",
    description: "Created via MCP",
    projectKey: "PROJ"
  }
});
```

## Connection Setup

### Claude Code Configuration

The MCP server uses HTTP transport. Add to your `~/.claude.json` under the project's `mcpServers`:

#### Production (Recommended)

```json
{
  "mcpServers": {
    "agent-hub-sb": {
      "type": "http",
      "url": "https://api.singularitybridge.net/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

#### Local Development

```json
{
  "mcpServers": {
    "agent-hub-sb": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

#### Both Environments

You can configure both for side-by-side testing:

```json
{
  "mcpServers": {
    "agent-hub-sb": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    },
    "agent-hub-sb-prod": {
      "type": "http",
      "url": "https://api.singularitybridge.net/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Endpoints

| Environment | URL |
|-------------|-----|
| Production | `https://api.singularitybridge.net/api/mcp` |
| Local | `http://localhost:3000/api/mcp` |

### Getting Your API Key

1. Log in to the Agent Hub dashboard
2. Go to **Settings** > **API Keys**
3. Create or copy your API key

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
