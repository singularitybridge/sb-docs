---
sidebar_position: 4
---

# Teams

Teams allow you to organize agents into logical groups for better management and access control.

## What are Teams?

Teams are organizational units that:

- Group related agents together
- Provide access control boundaries
- Enable filtering and discovery
- Support multi-tenant architectures

## Team Structure

```
Company
├── Team: Engineering
│   ├── Code Review Agent
│   ├── DevOps Agent
│   └── Testing Agent
├── Team: Sales
│   ├── Lead Qualifier Agent
│   └── Demo Assistant
└── Team: Support
    ├── Customer Support Agent
    └── Knowledge Base Agent
```

## Managing Teams

### Creating Teams

```bash
# Via API
curl -X POST https://api.singularitybridge.net/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Engineering",
    "description": "Engineering team agents",
    "icon": "code"
  }'
```

### Listing Teams

```bash
GET /api/teams
```

```typescript
// Via MCP
const teams = await mcp__agent-hub-sb__list_teams();
```

### Assigning Agents to Teams

```typescript
// Via MCP
await mcp__agent-hub-sb__assign_agent_to_team({
  agentId: "agent-id",
  teamIds: ["team-id-1", "team-id-2"],
  append: true  // Add to existing teams (false = replace)
});
```

## Filtering by Team

### List Agents in a Team

```bash
GET /api/teams/:teamId/assistants
```

```typescript
// Via MCP
const agents = await mcp__agent-hub-sb__list_agents_by_team({
  teamId: "team-id"
});
```

## Team Properties

| Property | Description |
|----------|-------------|
| `id` | Unique identifier |
| `name` | Display name |
| `description` | Team description |
| `icon` | Icon identifier |
| `companyId` | Parent company |

## Use Cases

### Department Organization

Organize agents by business function:

```
├── Marketing Team
│   ├── Content Writer
│   ├── Social Media Manager
│   └── Analytics Agent
├── Product Team
│   ├── PM Assistant
│   └── User Research Agent
```

### Project-Based Teams

Group agents by project:

```
├── Project Alpha
│   ├── Alpha Requirements Agent
│   └── Alpha QA Agent
├── Project Beta
│   ├── Beta Design Agent
│   └── Beta Dev Agent
```

### Skill-Based Teams

Group by capability:

```
├── Voice Agents
│   ├── Phone Support Agent
│   └── Voice Command Agent
├── Code Agents
│   ├── Code Generator
│   └── Code Reviewer
```

## Multi-Team Assignment

Agents can belong to multiple teams:

```typescript
// Agent belongs to both Engineering and On-Call teams
await mcp__agent-hub-sb__assign_agent_to_team({
  agentId: "incident-response-agent",
  teamIds: ["engineering-team", "oncall-team"],
  append: true
});
```

## Best Practices

### Naming Conventions

- Use clear, descriptive names
- Be consistent across teams
- Include purpose in description

### Access Control

- Keep sensitive agents in restricted teams
- Review team membership regularly
- Document team purposes

### Organization

- Don't create too many teams
- Merge similar teams
- Archive unused teams

## Related

- [Agents Overview](/agents/overview)
- [Teams API](/api/endpoints/teams)
- [Creating Agents](/agents/creating-agents)
