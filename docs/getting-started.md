---
sidebar_position: 2
---

# Getting Started

This guide will help you set up SB Agent Hub and create your first AI agent.

## Prerequisites

- Node.js 18+ or 21+
- MongoDB 6.0+ (with Atlas for vector search)
- API keys for your chosen AI provider (OpenAI, Anthropic, or Google)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/singularitybridge/sb-agent-hub.git
cd sb-agent-hub
```

### 2. Install Dependencies

```bash
# Backend
cd sb-api-services-v2
npm install

# Frontend
cd ../sb-chat-ui
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in `sb-api-services-v2`:

```bash
# Database
MONGODB_URI=mongodb+srv://your-connection-string

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# Authentication
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Optional: Allow auto-signup (default: false)
ALLOW_AUTO_SIGNUP=false
```

### 4. Set Up Vector Search Index

For semantic search capabilities, create the MongoDB Atlas vector index:

```bash
npm run create-search-index
```

### 5. Start the Services

```bash
# Backend (from sb-api-services-v2)
npm run dev

# Frontend (from sb-chat-ui)
npm run dev
```

## Creating Your First Agent

### Using the Web Interface

1. Navigate to the admin dashboard
2. Click **Create Agent**
3. Configure:
   - **Name**: Give your agent a descriptive name
   - **Model**: Select an AI model (e.g., `gpt-4o`)
   - **System Prompt**: Define your agent's behavior

### Using the API

```bash
curl -X POST https://api.singularitybridge.net/api/assistants \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My First Agent",
    "llmProvider": "openai",
    "llmModel": "gpt-4o",
    "llmPrompt": "You are a helpful assistant."
  }'
```

### Using MCP (Claude Code)

If you have the MCP server configured, you can create agents directly:

```typescript
// Using the agent-hub MCP tools
const result = await mcp__agent-hub-sb__create_agent({
  name: "My First Agent",
  llmProvider: "openai",
  llmModel: "gpt-4o",
  llmPrompt: "You are a helpful assistant."
});
```

## Next Steps

- [Learn about Core Concepts](/concepts/agents)
- [Configure Integrations](/integrations/overview)
- [Explore the API](/api/overview)
