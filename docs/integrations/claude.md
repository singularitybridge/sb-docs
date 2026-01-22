---
sidebar_position: 1
---

# Connect Claude to Agent Hub

This guide walks you through connecting Claude to Agent Hub MCP server, enabling you to use your agents directly from Claude.

## Claude.ai (Web)

Connect Agent Hub to Claude.ai using OAuth 2.1 authentication.

### Prerequisites

- An Agent Hub account
- An API key (create one in Agent Hub dashboard → Settings → API Keys)

### Setup Steps

1. Open [Claude.ai](https://claude.ai) and sign in
2. Click your profile icon and go to **Settings**
3. Navigate to **Integrations**
4. Click **Add Integration**
5. Enter the MCP server URL:
   ```
   https://api.singularitybridge.net/api/mcp
   ```
6. Click **Connect** - you'll be redirected to Agent Hub
7. Enter your **API Key** on the authorization page
8. Click **Authorize** to complete the connection

### Verify Connection

Once connected, start a new conversation in Claude.ai. You should see Agent Hub tools available:

- `execute` - Run your agents
- `list_agents` - View available agents
- `list_workspace_items` - Access workspace files
- `get_ui_context` - Get current UI state

Try asking Claude: *"List my agents from Agent Hub"*

---

## Claude Code (CLI)

Connect Agent Hub to Claude Code using API key authentication.

### Prerequisites

- [Claude Code CLI](https://claude.ai/code) installed
- An API key from Agent Hub dashboard

### Setup Steps

1. Open your Claude Code configuration file:
   ```bash
   # macOS/Linux
   nano ~/.claude.json

   # Or use your preferred editor
   code ~/.claude.json
   ```

2. Add the Agent Hub MCP server under `mcpServers`:

   ```json
   {
     "mcpServers": {
       "agent-hub": {
         "type": "http",
         "url": "https://api.singularitybridge.net/api/mcp",
         "headers": {
           "Authorization": "Bearer YOUR_API_KEY"
         }
       }
     }
   }
   ```

3. Replace `YOUR_API_KEY` with your actual API key

4. Restart Claude Code to load the new configuration

### Local Development

For local development, use your local API server:

```json
{
  "mcpServers": {
    "agent-hub-local": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Both Environments

Run both local and production side-by-side:

```json
{
  "mcpServers": {
    "agent-hub": {
      "type": "http",
      "url": "https://api.singularitybridge.net/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    },
    "agent-hub-local": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Verify Connection

Start Claude Code and check if the tools are available:

```bash
claude
```

Then try: *"List my agents from agent-hub"*

---

## Troubleshooting

### Claude.ai Web

| Issue | Solution |
|-------|----------|
| Authorization page not loading | Verify URL is `https://api.singularitybridge.net/api/mcp` |
| Invalid API key | Check your API key in Agent Hub dashboard |
| Connection timeout | Try again - the server may need a moment to respond |
| Token expired | Disconnect and reconnect in Claude.ai settings |

### Claude Code CLI

| Issue | Solution |
|-------|----------|
| Tools not showing | Restart Claude Code after config changes |
| Authentication error | Verify API key format: `Bearer sk_live_...` |
| Connection refused | Check if the URL is correct and accessible |
| JSON parse error | Validate your `~/.claude.json` syntax |

---

## Getting Your API Key

1. Log in to [Agent Hub](https://app.singularitybridge.net)
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy the key (starts with `sk_live_`)
5. Store it securely - it won't be shown again

---

## Available Tools

Once connected, these tools become available in Claude:

| Tool | Description |
|------|-------------|
| `execute` | Run an agent with a prompt |
| `list_agents` | List all your agents |
| `get_agent_info` | Get agent details |
| `get_agent_prompt` | View agent's system prompt |
| `update_agent_prompt` | Update agent's prompt |
| `list_workspace_items` | List workspace files |
| `add_workspace_item` | Add files to workspace |
| `vector_search_workspace` | Search workspace semantically |
| `list_teams` | List your teams |
| `navigate_to_page` | Control Agent Hub UI |
| `show_notification` | Display notifications |

See [MCP Server Reference](/api/mcp-server) for complete tool documentation.
