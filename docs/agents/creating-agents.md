---
sidebar_position: 2
---

# Creating Agents

Learn how to create and configure AI agents for your specific needs.

## Quick Start

### Using the API

```bash
curl -X POST https://api.singularitybridge.net/api/assistants \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Support Agent",
    "description": "Customer support assistant",
    "llmProvider": "openai",
    "llmModel": "gpt-4o",
    "llmPrompt": "You are a helpful customer support agent...",
    "maxTokens": 4096
  }'
```

### Using MCP

```typescript
const agent = await mcp__agent-hub-sb__create_agent({
  name: "Support Agent",
  description: "Customer support assistant",
  llmProvider: "openai",
  llmModel: "gpt-4o",
  llmPrompt: "You are a helpful customer support agent..."
});
```

## Configuration Options

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name for the agent |
| `llmProvider` | string | AI provider (`openai`, `anthropic`, `google`) |
| `llmModel` | string | Model identifier |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `description` | string | - | Brief description |
| `llmPrompt` | string | - | System prompt |
| `maxTokens` | number | 25000 | Max response tokens |
| `sessionTtlHours` | number | - | Auto-expire sessions after N hours of inactivity |
| `teamIds` | string[] | - | Team assignments |

## Step-by-Step Guide

### 1. Define the Purpose

Before creating an agent, clearly define:

- What tasks will this agent handle?
- Who will use this agent?
- What integrations does it need?

### 2. Choose the Right Model

Select based on your requirements:

```typescript
// For fast, cost-effective responses
{ llmProvider: "openai", llmModel: "gpt-4o-mini" }

// For complex reasoning
{ llmProvider: "anthropic", llmModel: "claude-sonnet-4-5" }

// For long documents
{ llmProvider: "google", llmModel: "gemini-2.5-pro" }
```

### 3. Write the System Prompt

A good system prompt includes:

```markdown
# Role Definition
You are [role] for [company/purpose].

# Capabilities
You can:
- [capability 1]
- [capability 2]

# Guidelines
- Be [tone characteristics]
- Always [important behaviors]
- Never [prohibited actions]

# Context
[Relevant background information]
```

### 4. Configure Actions

Enable integrations the agent needs:

```typescript
// Agent with JIRA access
{
  name: "PM Agent",
  llmPrompt: "You can create and manage JIRA tickets...",
  // JIRA actions are automatically available if company has JIRA configured
}
```

### 5. Set Up Workspace (Optional)

Add knowledge base documents:

```typescript
// After creating agent
await mcp__agent-hub-sb__add_workspace_item({
  scope: "agent",
  scopeId: agentId,
  itemPath: "/docs/knowledge-base.md",
  content: "# Product Documentation\n..."
});
```

### 6. Assign to Teams

Organize agents by team:

```typescript
await mcp__agent-hub-sb__assign_agent_to_team({
  agentId: agentId,
  teamIds: ["team-id-1", "team-id-2"]
});
```

## Example Agents

### Customer Support Agent

```json
{
  "name": "Support Agent",
  "description": "Handles customer inquiries",
  "llmProvider": "openai",
  "llmModel": "gpt-4o",
  "llmPrompt": "You are a friendly customer support agent for Acme Inc.\n\nYour responsibilities:\n- Answer product questions\n- Help with order issues\n- Process return requests\n\nGuidelines:\n- Be empathetic and patient\n- Escalate complex issues to humans\n- Never share internal policies"
}
```

### Code Review Agent

```json
{
  "name": "Code Reviewer",
  "description": "Reviews code and suggests improvements",
  "llmProvider": "anthropic",
  "llmModel": "claude-3-5-sonnet",
  "llmPrompt": "You are an expert code reviewer.\n\nFocus on:\n- Code quality and best practices\n- Security vulnerabilities\n- Performance optimizations\n\nProvide specific, actionable feedback with code examples."
}
```

### Research Agent

```json
{
  "name": "Research Assistant",
  "description": "Conducts research and summarizes findings",
  "llmProvider": "openai",
  "llmModel": "gpt-4o",
  "llmPrompt": "You are a research assistant with web search capabilities.\n\nWhen researching:\n- Search for multiple sources\n- Verify facts across sources\n- Provide citations\n- Summarize key findings"
}
```

## Testing Your Agent

After creation, test the agent:

```typescript
const result = await mcp__agent-hub-sb__execute({
  assistantId: agentId,
  userInput: "Hello! What can you help me with?"
});
```

## Next Steps

- [Configure Prompts](/agents/configuring-prompts) - Advanced prompt techniques
- [Teams](/agents/teams) - Organize agents by team
- [Integrations](/integrations/overview) - Add capabilities
