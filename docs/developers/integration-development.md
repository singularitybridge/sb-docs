---
sidebar_position: 3
title: Building Integrations
description: Create custom integrations for SB Agent Hub
---

# Building Integrations

Create custom integrations to extend agent capabilities.

## Integration Structure

Each integration consists of:

```
src/integrations/your-service/
├── integration.config.json    # Metadata and configuration
├── your-service.actions.ts    # Action definitions
└── client.ts                  # API client (optional)
```

## Configuration File

Define your integration metadata:

```json
{
  "name": "your_service",
  "icon": "plug",
  "apiKeyName": "your_service_api_key",
  "actionCreator": "createYourServiceActions",
  "actionsFile": "your-service.actions.ts",
  "description": "Description of your integration",
  "category": "utilities"
}
```

| Field | Description |
|-------|-------------|
| `name` | Unique identifier (snake_case) |
| `icon` | Lucide icon name |
| `apiKeyName` | Credential key in the system |
| `actionCreator` | Exported function name |
| `actionsFile` | File containing actions |
| `category` | Grouping for UI display |

## Defining Actions

Actions use JSON Schema for parameter validation:

```typescript
import { ActionContext, StandardActionResult } from '../types';

export function createYourServiceActions(
  apiKey: string,
  context: ActionContext
) {
  return {
    yourAction: {
      description: 'What this action does',
      parameters: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: 'The input to process'
          },
          options: {
            type: 'object',
            properties: {
              format: { type: 'string', enum: ['json', 'text'] }
            }
          }
        },
        required: ['input']
      },
      function: async (args: {
        input: string;
        options?: { format?: string }
      }): Promise<StandardActionResult> => {
        const result = await yourApiClient.process(args.input);

        return {
          success: true,
          data: result
        };
      }
    }
  };
}
```

## Action Context

Every action receives context about the current execution:

```typescript
interface ActionContext {
  sessionId: string;
  companyId: string;
  userId?: string;
  assistantId?: string;
  language: 'en' | 'he';
  isStateless?: boolean;
}
```

Use this to:
- Scope operations to the company
- Log audit trails with user info
- Customize behavior per context

## Return Format

Actions return a standard result object:

```typescript
// Success
return {
  success: true,
  data: { /* your response data */ }
};

// Error
return {
  success: false,
  error: {
    message: 'What went wrong',
    code: 'ERROR_CODE'
  }
};
```

The LLM receives this response and can act on success data or handle errors appropriately.

## Registering Credentials

Add your credential key to the supported types:

```typescript
// api.key.service.ts
const validApiKeyNames = [
  'openai_api_key',
  'anthropic_api_key',
  'your_service_api_key',  // Add your key
  // ...
];
```

Your action creator receives the decrypted API key automatically:

```typescript
export function createYourServiceActions(
  apiKey: string,  // Decrypted credential
  context: ActionContext
) {
  const client = new YourServiceClient(apiKey);
  // ...
}
```

## Discovering Integrations

List all available integrations and actions:

```bash
GET /api/integrations/discover
```

```json
[
  {
    "id": "your_service.yourAction",
    "serviceName": "Your Service",
    "actionTitle": "yourAction",
    "description": "What this action does",
    "parameters": { /* JSON Schema */ }
  }
]
```

## Direct Action Execution

Execute integration actions without going through an agent:

```bash
POST /api/integrations/actions/your_service/yourAction
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "data": {
    "input": "value",
    "options": { "format": "json" }
  }
}
```

## Built-in Integrations

SB Agent Hub includes 25+ integrations:

| Category | Integrations |
|----------|-------------|
| **AI/ML** | OpenAI, Perplexity, Replicate, AWS Bedrock |
| **Communication** | SendGrid, Nylas (Email/Calendar) |
| **Project Management** | JIRA, Linear |
| **Media** | ElevenLabs (Voice), Flux (Images), PhotoRoom |
| **Data** | MongoDB, File Processing |
| **Infrastructure** | Terminal, Debug utilities |

Review existing integrations as examples when building your own.

## Best Practices

1. **Validate inputs** - Use JSON Schema to catch errors early
2. **Return structured data** - Makes it easier for agents to use results
3. **Handle errors gracefully** - Return meaningful error messages
4. **Log with context** - Include company/session IDs for debugging
5. **Keep actions focused** - One action, one responsibility
