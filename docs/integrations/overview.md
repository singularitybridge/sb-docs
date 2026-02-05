---
sidebar_position: 1
---

# Integrations Overview

Integrations extend agent capabilities by connecting to external services. They provide actions that agents can use to interact with third-party systems.

## Available Integrations

### AI & ML

| Integration | Description |
|-------------|-------------|
| [OpenAI](/integrations/openai) | Speech, transcription, code execution |
| [Perplexity](/integrations/perplexity) | Web search and research |
| Replicate | ML model execution |
| AWS Bedrock KB | Knowledge base search |

### Communication

| Integration | Description |
|-------------|-------------|
| SendGrid | Email delivery |
| Nylas | Email and calendar (OAuth) |

### Project Management

| Integration | Description |
|-------------|-------------|
| [JIRA](/integrations/jira) | Ticket and project management |
| Linear | Issue tracking |

### Media & Files

| Integration | Description |
|-------------|-------------|
| [ElevenLabs](/integrations/elevenlabs) | Voice synthesis and cloning |
| Flux Image | AI image generation |
| PhotoRoom | Image editing |
| File Processing | CSV, Excel, PDF parsing |

### Development

| Integration | Description |
|-------------|-------------|
| [Fly.io](/integrations/fly) | Manage Fly.io apps and machines |
| [OpenCode Sandbox](/integrations/opencode-sandbox) | Remote AI coding agent |
| Terminal | Shell command execution |
| Debug | Development utilities |

### Data & Infrastructure

| Integration | Description |
|-------------|-------------|
| MongoDB | Database operations |

## How Integrations Work

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Agent     │ ──▶ │ Integration  │ ──▶ │   External   │
│   Request    │     │   Service    │     │     API      │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │             ┌──────┴──────┐             │
       │             │  API Keys   │             │
       │             │  (Company)  │             │
       │             └─────────────┘             │
       │                    │                    │
       └─────────────────── ▼ ◀──────────────────┘
                     ┌──────────────┐
                     │   Response   │
                     └──────────────┘
```

## Configuring Integrations

### Company API Keys

Each integration requires API keys stored at the company level:

```bash
# Set integration credentials
PUT /api/companies/:id/settings
{
  "apiKeys": {
    "openai_api_key": "sk-...",
    "jira_api_token": "...",
    "jira_domain": "your-company",
    "jira_email": "user@company.com",
    "elevenlabs_api_key": "..."
  }
}
```

### Environment Variables

Some integrations also use environment variables:

```bash
# .env file
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
```

## Using Integrations

### Automatic Action Discovery

When an agent is configured with integration access, available actions are automatically discovered:

```typescript
// Agent prompt
"You have access to JIRA for ticket management. You can:
- Create tickets with createTicket
- Search tickets with getTickets
- View ticket details with getTicketDetails"
```

### Action Execution

Agents can call integration actions:

```json
{
  "action": "createTicket",
  "arguments": {
    "projectKey": "BUG",
    "summary": "Login form validation error",
    "description": "Users can submit empty forms",
    "issueType": "Bug"
  }
}
```

## Next Steps

Explore specific integrations:

- [OpenAI](/integrations/openai) - AI services
- [Claude](/integrations/claude) - Connect to Claude AI
- [ElevenLabs](/integrations/elevenlabs) - Voice synthesis
- [Fly.io](/integrations/fly) - Manage Fly.io apps and machines
- [Google](/integrations/google) - Google services
- [JIRA](/integrations/jira) - Ticket management
- [OpenCode Sandbox](/integrations/opencode-sandbox) - Remote AI coding agent
- [Perplexity](/integrations/perplexity) - Web search

---

**Want to build your own integration?** See the [Building Integrations](/developers/integration-development) guide.
