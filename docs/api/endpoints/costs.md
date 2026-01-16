---
sidebar_position: 5
---

# Costs API

Endpoints for tracking and analyzing AI API costs.

## List Cost Records

Get paginated cost records.

```http
GET /api/costs
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 50) |
| `startDate` | string | Start date (ISO 8601) |
| `endDate` | string | End date (ISO 8601) |
| `assistantId` | string | Filter by assistant |
| `model` | string | Filter by model |
| `provider` | string | Filter by provider |

### Response

```json
{
  "data": [
    {
      "id": "cost-123",
      "assistantId": "assistant-456",
      "assistantName": "Support Agent",
      "model": "gpt-4o",
      "provider": "openai",
      "inputTokens": 500,
      "outputTokens": 150,
      "totalTokens": 650,
      "cost": 0.0125,
      "duration": 2500,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 1250
  }
}
```

## Get Cost Summary

Get aggregated cost summary for a period.

```http
GET /api/costs/summary
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | string | Yes | Start date (ISO 8601) |
| `endDate` | string | Yes | End date (ISO 8601) |

### Response

```json
{
  "totalCost": 125.50,
  "totalTokens": 2500000,
  "totalRequests": 5000,
  "byModel": {
    "gpt-4o": {
      "cost": 80.00,
      "tokens": 1000000,
      "requests": 2000
    },
    "gpt-4o-mini": {
      "cost": 45.50,
      "tokens": 1500000,
      "requests": 3000
    }
  },
  "byProvider": {
    "openai": {
      "cost": 125.50,
      "tokens": 2500000,
      "requests": 5000
    }
  },
  "byAssistant": [
    {
      "id": "assistant-1",
      "name": "Support Agent",
      "cost": 50.00,
      "tokens": 1000000,
      "requests": 2000
    },
    {
      "id": "assistant-2",
      "name": "Code Assistant",
      "cost": 75.50,
      "tokens": 1500000,
      "requests": 3000
    }
  ],
  "period": {
    "startDate": "2025-01-01T00:00:00Z",
    "endDate": "2025-01-31T23:59:59Z"
  }
}
```

## Get Daily Costs

Get daily cost breakdown.

```http
GET /api/costs/daily
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | string | Yes | Start date |
| `endDate` | string | Yes | End date |

### Response

```json
{
  "days": [
    {
      "date": "2025-01-01",
      "cost": 4.50,
      "tokens": 90000,
      "requests": 180
    },
    {
      "date": "2025-01-02",
      "cost": 5.20,
      "tokens": 104000,
      "requests": 208
    }
  ],
  "total": {
    "cost": 9.70,
    "tokens": 194000,
    "requests": 388
  }
}
```

## Get Costs by Assistant

Get costs for a specific assistant.

```http
GET /api/costs/by-assistant/:id
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `startDate` | string | Start date |
| `endDate` | string | End date |

### Response

```json
{
  "assistant": {
    "id": "assistant-123",
    "name": "Support Agent"
  },
  "totalCost": 50.00,
  "totalTokens": 1000000,
  "totalRequests": 2000,
  "byModel": {
    "gpt-4o": {
      "cost": 35.00,
      "tokens": 700000
    },
    "gpt-4o-mini": {
      "cost": 15.00,
      "tokens": 300000
    }
  },
  "daily": [
    { "date": "2025-01-15", "cost": 5.00 }
  ]
}
```

## Get Costs by Model

Get costs for a specific model.

```http
GET /api/costs/by-model/:model
```

### Response

```json
{
  "model": "gpt-4o",
  "totalCost": 80.00,
  "totalTokens": 1000000,
  "totalRequests": 2000,
  "averageCostPerRequest": 0.04,
  "averageTokensPerRequest": 500,
  "byAssistant": [
    {
      "id": "assistant-1",
      "name": "Support Agent",
      "cost": 35.00
    }
  ]
}
```

## Model Pricing Reference

Costs are calculated using these rates (per 1M tokens):

### OpenAI

| Model | Input | Output |
|-------|-------|--------|
| gpt-4o | $5.00 | $15.00 |
| gpt-4o-mini | $0.15 | $0.60 |
| o1 | $15.00 | $60.00 |
| o3-mini | $1.10 | $4.40 |

### Anthropic

| Model | Input | Output |
|-------|-------|--------|
| claude-3-5-sonnet | $3.00 | $15.00 |
| claude-3-5-haiku | $0.25 | $1.25 |

### Google

| Model | Input | Output |
|-------|-------|--------|
| gemini-2.0-flash | $0.075 | $0.30 |
| gemini-1.5-pro | $1.25 | $5.00 |

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_DATE_RANGE` | Invalid date range |
| `ASSISTANT_NOT_FOUND` | Assistant doesn't exist |
| `INVALID_MODEL` | Unknown model |

## Related

- [Cost Tracking Feature](/features/cost-tracking)
- [Assistants API](/api/endpoints/assistants)
