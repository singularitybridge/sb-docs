---
sidebar_position: 6
---

# Invites API

Endpoints for managing user invitations to join companies.

## Overview

The invite system controls user onboarding:
- Users must be invited to join
- Invites assign users to the inviter's company
- Invites expire after 7 days
- Rate limited to prevent abuse

## List Invites

Get all invites for the company.

```http
GET /api/invites
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `status` | string | Filter by status (`pending`, `accepted`, `revoked`, `expired`) |

### Response

```json
{
  "data": [
    {
      "id": "invite-123",
      "email": "newuser@example.com",
      "status": "pending",
      "role": "member",
      "invitedBy": {
        "id": "user-456",
        "name": "Admin User"
      },
      "createdAt": "2025-01-15T10:00:00Z",
      "expiresAt": "2025-01-22T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

## Get Invite

Get details for a specific invite.

```http
GET /api/invites/:id
```

### Response

```json
{
  "id": "invite-123",
  "email": "newuser@example.com",
  "status": "pending",
  "role": "member",
  "invitedBy": {
    "id": "user-456",
    "name": "Admin User"
  },
  "companyId": "company-789",
  "metadata": {
    "source": "admin-panel"
  },
  "resendCount": 0,
  "createdAt": "2025-01-15T10:00:00Z",
  "expiresAt": "2025-01-22T10:00:00Z"
}
```

## Create Invite

Create a new invitation.

```http
POST /api/invites
```

### Request Body

```json
{
  "email": "newuser@example.com",
  "role": "member",
  "metadata": {
    "department": "engineering"
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email to invite |
| `role` | string | No | User role (default: `member`) |
| `metadata` | object | No | Additional metadata |

### Response

```json
{
  "id": "new-invite-id",
  "email": "newuser@example.com",
  "status": "pending",
  "token": "secure-token-sent-via-email",
  "createdAt": "2025-01-15T10:00:00Z",
  "expiresAt": "2025-01-22T10:00:00Z"
}
```

## Revoke Invite

Revoke a pending invitation.

```http
DELETE /api/invites/:id/revoke
```

### Response

```json
{
  "success": true,
  "message": "Invite revoked"
}
```

## Resend Invite

Resend an invitation email.

```http
POST /api/invites/:id/resend
```

### Response

```json
{
  "success": true,
  "resendCount": 1,
  "message": "Invite resent"
}
```

Note: Maximum 3 resends per invite.

## Validate Invite Token

Check if an invite token is valid (public endpoint).

```http
GET /api/invites/validate/:token
```

### Response

```json
{
  "valid": true,
  "email": "newuser@example.com",
  "companyName": "Acme Inc"
}
```

## Accept Invite

Accept an invitation (called during OAuth callback).

```http
POST /api/invites/accept
```

### Request Body

```json
{
  "token": "invite-token",
  "userId": "new-user-id"
}
```

### Response

```json
{
  "success": true,
  "companyId": "company-789",
  "message": "Welcome to Acme Inc"
}
```

## Invite Statuses

| Status | Description |
|--------|-------------|
| `pending` | Waiting for user to accept |
| `accepted` | User completed signup |
| `revoked` | Admin cancelled invite |
| `expired` | Past 7-day TTL |

## Rate Limits

| Action | Limit |
|--------|-------|
| Create invite | 10 per hour per user |
| Resend invite | 3 per invite |

## Security Features

- **Token security**: 132-bit entropy (nanoid)
- **Email validation**: validator.js library
- **Duplicate prevention**: Unique index on email+company+status
- **Enumeration prevention**: Generic error messages
- **Automatic cleanup**: TTL index expires old invites

## Error Codes

| Code | Description |
|------|-------------|
| `INVITE_NOT_FOUND` | Invite doesn't exist |
| `INVITE_EXPIRED` | Invite has expired |
| `INVITE_REVOKED` | Invite was revoked |
| `INVITE_ALREADY_ACCEPTED` | Invite already used |
| `EMAIL_ALREADY_INVITED` | Pending invite exists |
| `RATE_LIMIT_EXCEEDED` | Too many invites |
| `RESEND_LIMIT_EXCEEDED` | Max resends reached |

## Related

- [Authentication](/api/authentication)
- [API Overview](/api/overview)
