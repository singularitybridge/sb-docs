---
sidebar_position: 7
---

# OpenCode Sandbox Integration

OpenCode Sandbox provides remote AI coding agent capabilities, allowing agents to create, modify, and analyze code in an isolated environment deployed on Fly.io.

## Configuration

### Required Credentials

```json
{
  "apiKeys": {
    "opencode_server_url": "https://your-app.fly.dev/opencode",
    "opencode_server_password": "your-password"
  }
}
```

Both credentials are stored securely as secrets.

### Getting Started

1. Deploy an OpenCode sandbox to Fly.io (see [OpenCode Agent repository](https://github.com/your-org/opencode-agent))
2. Configure the server URL and password in Agent Hub integrations
3. Test the connection to verify credentials

## Available Actions

### opencodeCreateSession

Create a new OpenCode sandbox session for AI-assisted code modifications.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| (none) | - | - | No parameters required |

**Example:**

```json
{
  "action": "opencodeCreateSession",
  "arguments": {}
}
```

**Response:**

```json
{
  "session": {
    "id": "ses_abc123...",
    "slug": "eager-harbor",
    "version": "1.1.41",
    "directory": "/data/workspace",
    "title": "New session - 2025-01-30T22:56:25.043Z"
  }
}
```

### opencodeSendPrompt

Send a prompt/instruction to an OpenCode session for code modifications.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | Yes | The OpenCode session ID |
| `prompt` | string | Yes | The instruction to send to the AI coding agent |

**Example:**

```json
{
  "action": "opencodeSendPrompt",
  "arguments": {
    "sessionId": "ses_abc123...",
    "prompt": "Add a /cats endpoint with CRUD operations"
  }
}
```

**Response:**

```json
{
  "success": true,
  "result": ""
}
```

Note: This action is asynchronous. Use `opencodeGetMessages` to retrieve the response.

### opencodeGetMessages

Get all messages from an OpenCode session to see the conversation history and AI responses.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | Yes | The OpenCode session ID |

**Example:**

```json
{
  "action": "opencodeGetMessages",
  "arguments": {
    "sessionId": "ses_abc123..."
  }
}
```

**Response:**

```json
{
  "messages": [
    {
      "info": {
        "id": "msg_...",
        "role": "user",
        "time": { "created": 1769813792846 }
      },
      "parts": [
        {
          "type": "text",
          "text": "List the files in the current directory"
        }
      ]
    },
    {
      "info": {
        "id": "msg_...",
        "role": "assistant",
        "cost": 0.04330275,
        "tokens": { "input": 3, "output": 87 }
      },
      "parts": [
        {
          "type": "text",
          "text": "I'll list the files for you."
        },
        {
          "type": "tool",
          "tool": "bash",
          "state": {
            "status": "completed",
            "input": { "command": "ls -la" },
            "output": "total 60\n..."
          }
        }
      ]
    }
  ]
}
```

### opencodeGetSession

Get details about a specific OpenCode session including stats and title.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | Yes | The OpenCode session ID |

**Example:**

```json
{
  "action": "opencodeGetSession",
  "arguments": {
    "sessionId": "ses_abc123..."
  }
}
```

**Response:**

```json
{
  "session": {
    "id": "ses_abc123...",
    "slug": "eager-harbor",
    "version": "1.1.41",
    "directory": "/data/workspace",
    "title": "List current directory files",
    "time": {
      "created": 1769813785044,
      "updated": 1769813798605
    },
    "summary": {
      "additions": 0,
      "deletions": 0,
      "files": 0
    }
  }
}
```

### opencodeListSessions

List all OpenCode sessions.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| (none) | - | - | No parameters required |

**Example:**

```json
{
  "action": "opencodeListSessions",
  "arguments": {}
}
```

**Response:**

```json
{
  "sessions": [
    {
      "id": "ses_abc123...",
      "title": "Feature development",
      "time": { "created": 1769813785044 }
    },
    {
      "id": "ses_def456...",
      "title": "Bug fix session",
      "time": { "created": 1769804102531 }
    }
  ]
}
```

## Use Cases

### Code Analysis

Have the AI agent analyze a codebase:

```json
{
  "action": "opencodeSendPrompt",
  "arguments": {
    "sessionId": "ses_abc123...",
    "prompt": "Analyze the project structure and identify the main technologies used"
  }
}
```

### Feature Implementation

Request new features to be added:

```json
{
  "action": "opencodeSendPrompt",
  "arguments": {
    "sessionId": "ses_abc123...",
    "prompt": "Add user authentication with JWT tokens to the Express server"
  }
}
```

### Code Refactoring

Ask for code improvements:

```json
{
  "action": "opencodeSendPrompt",
  "arguments": {
    "sessionId": "ses_abc123...",
    "prompt": "Refactor the database queries to use connection pooling"
  }
}
```

### Repository Cloning

Clone repositories for analysis:

```json
{
  "action": "opencodeSendPrompt",
  "arguments": {
    "sessionId": "ses_abc123...",
    "prompt": "Clone https://github.com/user/repo into the workspace and explain its architecture"
  }
}
```

## Best Practices

### Session Management

- Create dedicated sessions for different tasks or projects
- Use `opencodeListSessions` to find existing sessions
- Session data persists on the Fly.io volume

### Prompt Writing

- Be specific about what you want the AI to do
- Include file paths when targeting specific files
- Specify the programming language or framework when relevant

### Response Handling

- Use `opencodeGetMessages` to poll for responses after sending prompts
- Check the `finish` field to know when processing is complete
- Review tool outputs for command execution results

### Cost Awareness

- Each prompt incurs API costs (visible in message responses)
- Complex operations may require multiple API calls
- Monitor token usage in the response metadata

## Architecture

```
Agent Hub Agent → OpenCode Sandbox Integration → Fly.io OpenCode Server
                                                      ↓
                                              AI Coding Agent (Claude)
                                                      ↓
                                              Workspace (/data/workspace)
```

The OpenCode sandbox runs on Fly.io with:
- Persistent volume storage for code
- Claude AI models for code generation
- Full bash/terminal access
- Git support for version control

## Related

- [Actions](/concepts/actions)
- [Integrations Overview](/integrations/overview)
- [JIRA Integration](/integrations/jira) - for project management alongside coding
