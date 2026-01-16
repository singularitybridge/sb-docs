---
sidebar_position: 3
---

# Teams API

Endpoints for managing teams and organizing assistants.

## List Teams

Get all teams for the authenticated company.

```http
GET /api/teams
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 50) |

### Response

```json
{
  "data": [
    {
      "id": "team-123",
      "name": "Engineering",
      "description": "Engineering team agents",
      "icon": "code",
      "assistantCount": 5,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 3
  }
}
```

## Get Team

Get details for a specific team.

```http
GET /api/teams/:id
```

### Response

```json
{
  "id": "team-123",
  "name": "Engineering",
  "description": "Engineering team agents",
  "icon": "code",
  "companyId": "company-456",
  "assistants": [
    {
      "id": "assistant-1",
      "name": "Code Reviewer"
    },
    {
      "id": "assistant-2",
      "name": "DevOps Agent"
    }
  ],
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

## Create Team

Create a new team.

```http
POST /api/teams
```

### Request Body

```json
{
  "name": "Engineering",
  "description": "Engineering team agents",
  "icon": "code"
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Team name |

### Response

```json
{
  "id": "new-team-id",
  "name": "Engineering",
  "description": "Engineering team agents",
  "icon": "code",
  "companyId": "company-456",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

## Update Team

Update an existing team.

```http
PUT /api/teams/:id
```

### Request Body

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "icon": "settings"
}
```

### Response

Returns the updated team.

## Delete Team

Delete a team. Assistants are not deleted, only unassigned.

```http
DELETE /api/teams/:id
```

### Response

```json
{
  "success": true,
  "message": "Team deleted"
}
```

## List Team Assistants

Get all assistants assigned to a team.

```http
GET /api/teams/:id/assistants
```

### Response

```json
{
  "data": [
    {
      "id": "assistant-1",
      "name": "Code Reviewer",
      "llmModel": "claude-3-5-sonnet"
    },
    {
      "id": "assistant-2",
      "name": "DevOps Agent",
      "llmModel": "gpt-4o"
    }
  ]
}
```

## Assign Assistant to Team

Assign an assistant to one or more teams.

```http
POST /api/teams/assign
```

### Request Body

```json
{
  "assistantId": "assistant-123",
  "teamIds": ["team-1", "team-2"],
  "append": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `assistantId` | string | Assistant to assign |
| `teamIds` | string[] | Target teams |
| `append` | boolean | Add to existing (true) or replace (false) |

### Response

```json
{
  "success": true,
  "assistant": {
    "id": "assistant-123",
    "teamIds": ["team-1", "team-2", "team-3"]
  }
}
```

## Remove Assistant from Team

Remove an assistant from a team.

```http
DELETE /api/teams/:teamId/assistants/:assistantId
```

### Response

```json
{
  "success": true,
  "message": "Assistant removed from team"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `TEAM_NOT_FOUND` | Team doesn't exist |
| `TEAM_NAME_EXISTS` | Team name already used |
| `ASSISTANT_NOT_FOUND` | Assistant doesn't exist |

## Related

- [Teams Concept](/agents/teams)
- [Assistants API](/api/endpoints/assistants)
