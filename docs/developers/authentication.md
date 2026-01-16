---
sidebar_position: 1
title: Authentication
description: API keys, JWT tokens, and credential management
---

# Authentication

How to authenticate with SB Agent Hub and manage credentials.

## API Keys

Generate API keys from the Admin dashboard for programmatic access:

```
Authorization: Bearer sk_live_<64-character-hex-string>
```

API keys provide:
- Full access to company resources
- Same capabilities as the web UI
- Usage tracking via `lastUsed` timestamp
- Revocable at any time

### Creating API Keys

1. Navigate to **Admin → API Keys**
2. Click **Create New Key**
3. Copy the key immediately—it won't be shown again

### Key Format

```
sk_live_a1b2c3d4e5f6...  (64 hex characters)
```

Keys are hashed (SHA-256) before storage. The original key cannot be retrieved.

## JWT Tokens

The web UI uses JWT tokens for session-based authentication. Both authentication methods work with all API endpoints.

JWTs are issued by Clerk and validated on each request. They contain:
- User ID
- Company ID
- Session expiration

## Credential Storage

Integration credentials (OpenAI keys, JIRA tokens, etc.) are stored at the company level.

### Security

- **Encryption**: AES-256-GCM at rest
- **Caching**: 15-minute in-memory TTL
- **Scope**: Company-level isolation

### Supported Credential Types

| Integration | Credential Key |
|-------------|---------------|
| OpenAI | `openai_api_key` |
| Anthropic | `anthropic_api_key` |
| Google | `google_api_key` |
| ElevenLabs | `elevenlabs_api_key` |
| JIRA | `jira_api_key` |
| Perplexity | `perplexity_api_key` |
| SendGrid | `sendgrid_api_key` |

### Adding Credentials

```bash
POST /api/credentials
Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "name": "openai_api_key",
  "value": "sk-..."
}
```

## Rate Limiting

- **Default**: 100 requests/minute per API key
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- **Exceeded**: Returns `429 Too Many Requests`

Implement exponential backoff in your client code.

## Best Practices

1. **Rotate keys regularly** - Create new keys and deprecate old ones
2. **Use environment variables** - Never hardcode keys in source code
3. **Monitor usage** - Check `lastUsed` timestamps for anomalies
4. **Revoke immediately** - If a key is compromised, revoke it in the dashboard
