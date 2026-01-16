---
sidebar_position: 7
---

# Twilio Integration

Twilio integration enables SMS messaging and voice calling capabilities for agents.

## Configuration

### Required Credentials

```json
{
  "apiKeys": {
    "twilio_account_sid": "AC...",
    "twilio_auth_token": "...",
    "twilio_phone_number": "+1234567890"
  }
}
```

### Getting Credentials

1. Sign up at [Twilio Console](https://console.twilio.com)
2. Find Account SID and Auth Token on dashboard
3. Get a phone number with SMS/Voice capabilities

## Available Actions

### sendSMS

Send an SMS message.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | string | Yes | Recipient phone (E.164 format) |
| `body` | string | Yes | Message content |
| `from` | string | No | Sender number (defaults to configured) |

**Example:**

```json
{
  "action": "sendSMS",
  "arguments": {
    "to": "+14155551234",
    "body": "Your verification code is 123456"
  }
}
```

**Response:**

```json
{
  "messageSid": "SM...",
  "status": "queued",
  "dateCreated": "2025-01-15T10:30:00Z"
}
```

### makeCall

Initiate an outbound voice call.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `to` | string | Yes | Recipient phone |
| `from` | string | No | Caller ID |
| `url` | string | No | TwiML URL for call flow |

**Example:**

```json
{
  "action": "makeCall",
  "arguments": {
    "to": "+14155551234",
    "url": "https://your-server.com/twiml/welcome"
  }
}
```

### getCallStatus

Check the status of a call.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `callSid` | string | Yes | Call identifier |

## Voice Integration with VAPI

For advanced voice agents, integrate with VAPI:

```
VAPI Voice Layer (Jordan)
         │
         ▼
SB Agent Hub (Execution)
         │
         ▼
External Integrations
```

### Configuration

1. Set up VAPI account
2. Configure phone numbers
3. Connect to SB Agent Hub
4. Define voice agent behavior

## SMS Patterns

### Notifications

```typescript
// Order confirmation
await sendSMS({
  to: customer.phone,
  body: `Order #${orderId} confirmed! Track at: ${trackingUrl}`
});
```

### Two-Factor Authentication

```typescript
// Send verification code
const code = generateCode();
await sendSMS({
  to: user.phone,
  body: `Your verification code: ${code}. Valid for 10 minutes.`
});
```

### Alerts

```typescript
// System alert
await sendSMS({
  to: oncall.phone,
  body: `ALERT: ${service} is down. Incident: ${incidentId}`
});
```

## Phone Number Formats

Use E.164 format:

| Format | Example |
|--------|---------|
| E.164 | +14155551234 |
| US | +1 (415) 555-1234 |
| UK | +44 20 7123 4567 |
| DE | +49 30 12345678 |

## Best Practices

### SMS

- Keep messages concise (160 chars or less for single SMS)
- Include opt-out instructions for marketing
- Validate phone numbers before sending
- Handle delivery failures gracefully

### Voice

- Use clear, professional greetings
- Keep menus simple
- Provide escape options
- Record calls with consent

### Compliance

- Follow TCPA/GDPR regulations
- Honor opt-outs immediately
- Log all communications
- Get proper consent

## Related

- [ElevenLabs Integration](/integrations/elevenlabs)
- [Integrations Overview](/integrations/overview)
- [Actions](/concepts/actions)
