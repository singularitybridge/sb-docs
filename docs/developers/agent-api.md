---
sidebar_position: 2
title: Agent API
description: Execute agents and manage sessions programmatically
---

# Agent API

Execute agents and manage conversations through the API.

## Execution Modes

SB Agent Hub supports two execution patterns:

| Mode | Use Case | Persistence |
|------|----------|-------------|
| **Stateless** | Automation, one-off queries | None |
| **Session-based** | Multi-turn conversations | Full history |

## Stateless Execution

Single request, no conversation history. Ideal for automation and scripts.

```bash
POST /api/assistants/:assistantId/execute
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "userInput": "Summarize the key points from this document"
}
```

### Response

```json
{
  "id": "msg_1701234567890_abc123",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "Here are the key points..."
      }
    }
  ],
  "created_at": 1701234567,
  "assistant_id": "my-assistant"
}
```

### With Attachments

```json
{
  "userInput": "Analyze this document",
  "attachments": [
    {
      "fileName": "report.pdf",
      "mimeType": "application/pdf",
      "data": "<base64-encoded-content>"
    }
  ]
}
```

### JSON Output

Request structured responses:

```json
{
  "userInput": "Extract the contact information",
  "responseFormat": {
    "type": "json_object"
  }
}
```

## Session-Based Execution

Multi-turn conversations with persistent history.

```bash
POST /api/assistants/:assistantId/user-input
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "sessionId": "session_abc123",
  "userInput": "Tell me more about that last point"
}
```

Sessions maintain conversation context across requests. Messages are stored and can be retrieved later.

### Creating Sessions

Sessions are created automatically on first message, or explicitly:

```bash
POST /api/sessions
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "assistantId": "my-assistant",
  "title": "Customer Support Chat"
}
```

### Retrieving History

```bash
GET /api/sessions/:sessionId/messages
Authorization: Bearer sk_live_xxx
```

## Streaming Responses

Add the `Accept: text/event-stream` header for Server-Sent Events:

```bash
POST /api/assistants/:assistantId/execute
Authorization: Bearer sk_live_xxx
Accept: text/event-stream
Content-Type: application/json

{
  "userInput": "Write a detailed analysis"
}
```

### Event Stream

```
data: {"type":"token","value":"Here"}
data: {"type":"token","value":" are"}
data: {"type":"token","value":" the"}
...
data: {"type":"done"}
```

### Handling Streams

```javascript
const response = await fetch('/api/assistants/my-agent/execute', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_xxx',
    'Accept': 'text/event-stream',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ userInput: 'Hello' })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  // Parse SSE format and handle tokens
}
```

## Agent Management

### List Agents

```bash
GET /api/assistants
Authorization: Bearer sk_live_xxx
```

### Get Agent Details

```bash
GET /api/assistants/:assistantId
Authorization: Bearer sk_live_xxx
```

### Update Agent Prompt

```bash
PATCH /api/assistants/:assistantId
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "llmPrompt": "You are a helpful assistant..."
}
```

## LLM Providers

Agents can use any supported provider:

| Provider | Models |
|----------|--------|
| **OpenAI** | GPT-5, GPT-4o, GPT-4o-mini, o3 |
| **Anthropic** | Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5 |
| **Google** | Gemini 3 Pro, Gemini 2.5 Pro, Gemini 2.5 Flash |

Configure the provider when creating or updating an agent.

## Error Responses

```json
{
  "error": {
    "message": "Agent not found",
    "code": "NOT_FOUND"
  }
}
```

| Code | Description |
|------|-------------|
| `NOT_FOUND` | Resource doesn't exist |
| `UNAUTHORIZED` | Invalid or missing API key |
| `RATE_LIMITED` | Too many requests |
| `VALIDATION_ERROR` | Invalid request body |
