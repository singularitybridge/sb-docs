---
sidebar_position: 4
---

# Google Integration

Google integration provides OAuth authentication and access to Google services like Calendar and Drive.

## Configuration

### Environment Variables

```bash
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://your-domain/auth/google/callback
```

### API Key for Gemini

```bash
GOOGLE_AI_API_KEY=your-api-key
```

## OAuth Authentication

### Setup

1. Create a project in Google Cloud Console
2. Enable required APIs (Calendar, Drive, etc.)
3. Configure OAuth consent screen
4. Create OAuth credentials
5. Set callback URL

### Authentication Flow

```
User clicks "Sign in with Google"
         │
         ▼
┌─────────────────────┐
│  Google OAuth Page  │
└─────────────────────┘
         │
         ▼
Callback with auth code
         │
         ▼
Exchange for tokens
         │
         ▼
User authenticated
```

### Implementation

```typescript
// OAuth callback handler
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  // Exchange code for tokens
  // Create or update user
  // Assign to company if invited
});
```

## Available Actions

### Calendar Events

Access Google Calendar:

```json
{
  "action": "getCalendarEvents",
  "arguments": {
    "calendarId": "primary",
    "timeMin": "2025-01-01T00:00:00Z",
    "timeMax": "2025-01-31T23:59:59Z"
  }
}
```

### Drive Files

Access Google Drive:

```json
{
  "action": "listDriveFiles",
  "arguments": {
    "folderId": "folder-id",
    "pageSize": 20
  }
}
```

## Gemini Models

### Available Models

| Model | Context | Best For |
|-------|---------|----------|
| `gemini-2.0-flash` | 1M | Fast responses |
| `gemini-1.5-pro` | 2M | Long documents |
| `gemini-1.5-flash` | 1M | Quick tasks |

### Usage

```typescript
{
  llmProvider: "google",
  llmModel: "gemini-2.0-flash"
}
```

## IPv6 Requirement

Google APIs from certain cloud providers (like Hetzner) require IPv6:

```typescript
// Force IPv6 for Google APIs
const httpsAgent = new https.Agent({
  family: 6, // Force IPv6
});
```

This is handled automatically in the agent hub.

## Best Practices

### OAuth

- Implement proper token refresh
- Handle revoked access gracefully
- Request minimal scopes

### API Usage

- Use batch requests when possible
- Cache frequently accessed data
- Handle rate limits

## Related

- [Authentication](/api/authentication)
- [Integrations Overview](/integrations/overview)
