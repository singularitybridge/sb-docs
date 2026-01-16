---
sidebar_position: 2
---

# Authentication

This page covers **user authentication** (how users log into the platform). For **programmatic API access**, see the [Developers Authentication Guide](/developers/authentication).

SB Agent Hub uses JWT tokens for API authentication and Google OAuth for user login.

## Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    User      │ ──▶ │   Google     │ ──▶ │  SB Agent    │
│   Login      │     │   OAuth      │     │    Hub       │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │  JWT Token   │
                                          └──────────────┘
```

## Google OAuth Login

### Initiate Login

Redirect users to the Google OAuth URL:

```
GET /auth/google
```

### OAuth Callback

After Google authentication:

```
GET /auth/google/callback?code=AUTHORIZATION_CODE
```

Returns JWT token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "User Name",
    "companyId": "company-456"
  }
}
```

## Using JWT Tokens

### Request Header

Include the token in the Authorization header:

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  https://api.singularitybridge.net/api/assistants
```

### Token Structure

JWT payload contains:

```json
{
  "userId": "user-123",
  "email": "user@example.com",
  "companyId": "company-456",
  "iat": 1642492800,
  "exp": 1642579200
}
```

### Token Expiration

- Default expiration: 24 hours
- Refresh before expiration
- Re-authenticate if expired

## Invite-Based Registration

### Overview

New users can only join if invited:

1. Admin creates invite
2. User receives email with invite link
3. User completes Google OAuth
4. User is added to inviter's company

### Creating Invites

```bash
POST /api/invites
{
  "email": "newuser@example.com",
  "role": "member"
}
```

### Invite Flow

```
Admin creates invite
        │
        ▼
User receives email
        │
        ▼
User clicks invite link
        │
        ▼
Google OAuth completes
        │
        ▼
User assigned to company
```

## Auto-Signup Control

Control whether users can register without invites:

```bash
# Environment variable
ALLOW_AUTO_SIGNUP=false  # Requires invite (default)
ALLOW_AUTO_SIGNUP=true   # Allows new companies
```

## API Key Authentication

For programmatic access, generate API keys from the Admin dashboard:

```bash
curl -H "Authorization: Bearer sk_live_abc123..." \
  https://api.singularitybridge.net/api/assistants
```

API keys use the `sk_live_` prefix and provide full access to company resources. They're hashed (SHA-256) before storage for security.

## Security Best Practices

### Token Storage

- Store tokens securely (not in localStorage)
- Use httpOnly cookies when possible
- Clear tokens on logout

### Token Refresh

```javascript
// Check token expiration before requests
function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= payload.exp * 1000;
}

// Refresh if needed
async function getValidToken() {
  if (isTokenExpired(currentToken)) {
    return await refreshToken();
  }
  return currentToken;
}
```

### CORS Configuration

Only allowed origins can make requests:

```bash
CORS_ORIGINS=https://app.yourdomain.com,https://admin.yourdomain.com
```

## Error Responses

### 401 Unauthorized

Missing or invalid token:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden

Insufficient permissions:

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Access denied to this resource"
  }
}
```

## MCP Authentication

For MCP server connections, authentication is handled via the connection configuration. See [MCP Server](/api/mcp-server) for details.

## Related

- [API Overview](/api/overview)
- [Invites API](/api/endpoints/invites)
