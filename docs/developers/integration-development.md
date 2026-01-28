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
  "displayName": "Your Service",
  "description": "Description of your integration",
  "icon": "plug",
  "category": "utilities",
  "actionCreator": "createYourServiceActions",
  "actionsFile": "your-service.actions.ts",
  "requiredApiKeys": [
    {
      "key": "your_service_api_key",
      "label": "API Key",
      "type": "secret",
      "placeholder": "sk-xxxx",
      "description": "Your API key from the service dashboard",
      "helpUrl": "https://example.com/api-keys"
    },
    {
      "key": "your_service_domain",
      "label": "Domain",
      "type": "text",
      "placeholder": "your-company",
      "description": "Your account subdomain"
    }
  ]
}
```

### Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique identifier (snake_case) |
| `displayName` | string | Human-readable name for UI |
| `description` | string | Brief description of the integration |
| `icon` | string | Lucide icon name or service identifier |
| `category` | string | Grouping for UI display |
| `actionCreator` | string | Exported function name in actions file |
| `actionsFile` | string | File containing action definitions |
| `requiredApiKeys` | array | Credentials required by the integration |

### Required API Keys Structure

Each entry in `requiredApiKeys` defines a credential field:

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Credential identifier (stored encrypted) |
| `label` | string | Display label in UI |
| `type` | `"secret"` \| `"text"` | Secret for sensitive data, text for visible |
| `placeholder` | string | Input placeholder text |
| `description` | string | Help text for users |
| `helpUrl` | string | Optional link to documentation |

## Defining Actions

Actions use JSON Schema for parameter validation:

```typescript
import { ActionContext, StandardActionResult } from '../actions/types';

export function createYourServiceActions(
  credentials: Record<string, string>,
  context: ActionContext
) {
  const apiKey = credentials.your_service_api_key;
  const domain = credentials.your_service_domain;

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
        const client = new YourServiceClient(apiKey, domain);
        const result = await client.process(args.input);

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
  sessionId: string;      // Current chat session
  companyId: string;      // Company executing the action
  userId?: string;        // User ID if available
  assistantId?: string;   // Assistant executing the action
  language: 'en' | 'he';  // UI language preference
  isStateless?: boolean;  // True for stateless API calls
}
```

Use this to:
- Scope operations to the company
- Log audit trails with user info
- Customize behavior per context

## Return Format

Actions return a standard result object:

```typescript
interface StandardActionResult<T = any> {
  success: true;
  message?: string;  // Optional human-readable message
  data?: T;          // The action's result data
}

// Success example
return {
  success: true,
  message: 'Document created successfully',
  data: { id: 'doc_123', url: 'https://...' }
};
```

For errors, throw an exception rather than returning an error object:

```typescript
// Error handling - throw, don't return
if (!result) {
  throw new Error('Failed to process request: invalid input');
}
```

The framework catches exceptions and returns them to the LLM appropriately.

## Credentials Flow

Credentials defined in `requiredApiKeys` are:

1. **Configured** by users in the Integrations UI
2. **Encrypted** and stored securely per company
3. **Decrypted** automatically when passed to your action creator

```typescript
export function createYourServiceActions(
  credentials: Record<string, string>,  // All configured credentials
  context: ActionContext
) {
  // Access credentials by their key names
  const apiKey = credentials.your_service_api_key;
  const domain = credentials.your_service_domain;

  // Initialize your client
  const client = new YourServiceClient(apiKey, domain);
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

SB Agent Hub includes 25 integrations across multiple categories:

| Category | Integrations |
|----------|-------------|
| **AI/ML** | OpenAI, Anthropic Claude, Google Gemini, Perplexity, Replicate, ElevenLabs, AWS Bedrock KB |
| **Communication** | SendGrid, Nylas (Email/Calendar/Contacts) |
| **Project Management** | JIRA, Linear |
| **Database** | MongoDB |
| **Development** | cURL |
| **Hospitality** | RoomBoss |
| **Internal** | Workspace, File Processing, UI Control, Session Query, Journal, Debug |

Review existing integrations in `src/integrations/` as examples when building your own.

## Categories

Available categories for organizing integrations:

| Category | Description |
|----------|-------------|
| `ai` | AI and ML services |
| `communication` | Email, messaging, notifications |
| `project_management` | Issue tracking, project tools |
| `database` | Data storage and retrieval |
| `development` | Developer tools and utilities |
| `hospitality` | Hotel/booking systems |
| `internal` | Platform-internal integrations |
| `utilities` | General purpose tools |

## Best Practices

1. **Validate inputs** - Use JSON Schema to catch errors early
2. **Return structured data** - Makes it easier for agents to use results
3. **Throw on errors** - Let the framework handle error responses
4. **Log with context** - Include company/session IDs for debugging
5. **Keep actions focused** - One action, one responsibility
6. **Use descriptive names** - Action names become tool names for the LLM
7. **Document parameters** - Good descriptions help the LLM use tools correctly

## Example: Complete Integration

Here's a complete example of a simple integration:

**integration.config.json**
```json
{
  "name": "weather",
  "displayName": "Weather Service",
  "description": "Get weather information for locations",
  "icon": "cloud",
  "category": "utilities",
  "actionCreator": "createWeatherActions",
  "actionsFile": "weather.actions.ts",
  "requiredApiKeys": [
    {
      "key": "weather_api_key",
      "label": "API Key",
      "type": "secret",
      "placeholder": "your-api-key",
      "description": "Get your key at weatherapi.com"
    }
  ]
}
```

**weather.actions.ts**
```typescript
import { ActionContext, StandardActionResult } from '../actions/types';

export function createWeatherActions(
  credentials: Record<string, string>,
  context: ActionContext
) {
  const apiKey = credentials.weather_api_key;

  return {
    getCurrentWeather: {
      description: 'Get current weather for a city',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: 'City name (e.g., "London" or "New York")'
          },
          units: {
            type: 'string',
            enum: ['metric', 'imperial'],
            description: 'Temperature units'
          }
        },
        required: ['city']
      },
      function: async (args: {
        city: string;
        units?: 'metric' | 'imperial';
      }): Promise<StandardActionResult> => {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${args.city}`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          success: true,
          data: {
            city: data.location.name,
            country: data.location.country,
            temperature: args.units === 'imperial'
              ? data.current.temp_f
              : data.current.temp_c,
            condition: data.current.condition.text,
            humidity: data.current.humidity
          }
        };
      }
    }
  };
}
```
