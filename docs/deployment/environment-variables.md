---
sidebar_position: 2
---

# Environment Variables

Complete reference for all environment variables used by SB Agent Hub.

## Required Variables

### Database

```bash
# MongoDB connection string (Atlas recommended)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### Authentication

```bash
# JWT secret for token signing (generate secure random string)
JWT_SECRET=your-secure-secret-key-min-32-chars

# Google OAuth (for user authentication)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-domain/auth/google/callback
```

### AI Providers (at least one required)

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Google AI
GOOGLE_AI_API_KEY=...
```

## Optional Variables

### Server Configuration

```bash
# Server port (default: 3000)
PORT=3000

# Node environment
NODE_ENV=production

# Allowed origins for CORS
CORS_ORIGINS=https://your-frontend.com,https://admin.your-domain.com
```

### Security

```bash
# Allow auto-signup without invite (default: false)
ALLOW_AUTO_SIGNUP=false

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### File Storage

```bash
# GCP Storage (for permanent file storage)
GCP_PROJECT_ID=your-project-id
GCP_BUCKET_NAME=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

### Integrations (Company-Level)

These are typically stored in company settings, but can be set as environment variables for default access:

```bash
# Perplexity
PERPLEXITY_API_KEY=pplx-...

# ElevenLabs
ELEVENLABS_API_KEY=...

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
```

## Build Configuration

```bash
# Memory limit for TypeScript compilation
NODE_OPTIONS=--max-old-space-size=2048
```

## Example .env File

```bash
# ===================
# REQUIRED
# ===================

# Database
MONGODB_URI=mongodb+srv://admin:password@cluster0.abc123.mongodb.net/sb-agent-hub

# Authentication
JWT_SECRET=your-very-secure-secret-key-at-least-32-characters-long
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_CALLBACK_URL=https://api.singularitybridge.net/auth/google/callback

# AI Providers
OPENAI_API_KEY=sk-proj-xxx
ANTHROPIC_API_KEY=sk-ant-xxx

# ===================
# OPTIONAL
# ===================

# Server
PORT=3000
NODE_ENV=production
CORS_ORIGINS=https://app.singularitybridge.net

# Security
ALLOW_AUTO_SIGNUP=false

# Build
NODE_OPTIONS=--max-old-space-size=2048
```

## Environment-Specific Configs

### Development

```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sb-agent-hub-dev
ALLOW_AUTO_SIGNUP=true
```

### Staging

```bash
NODE_ENV=staging
MONGODB_URI=mongodb+srv://...staging-cluster...
CORS_ORIGINS=https://staging.your-domain.com
```

### Production

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://...production-cluster...
CORS_ORIGINS=https://app.your-domain.com
ALLOW_AUTO_SIGNUP=false
```

## Security Best Practices

### Secret Management

- Never commit `.env` files to git
- Use secret managers (AWS Secrets Manager, HashiCorp Vault)
- Rotate secrets regularly
- Use different secrets per environment

### Validation

```typescript
// Validate required variables on startup
const required = ['MONGODB_URI', 'JWT_SECRET', 'OPENAI_API_KEY'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}
```

## Troubleshooting

### Missing Variables

```
Error: MONGODB_URI is not defined
```
Solution: Add the variable to your `.env` file.

### Invalid Format

```
Error: Invalid MONGODB_URI format
```
Solution: Check the connection string format matches MongoDB Atlas requirements.

### Permission Denied

```
Error: GOOGLE_APPLICATION_CREDENTIALS file not found
```
Solution: Ensure the service account JSON file exists at the specified path.

## Related

- [Deployment Overview](/deployment/overview)
- [Docker Deployment](/deployment/docker)
