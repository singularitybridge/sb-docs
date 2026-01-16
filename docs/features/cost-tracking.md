---
sidebar_position: 4
---

# Cost Tracking

Cost tracking provides visibility into AI API usage and costs across your organization.

## Overview

Track costs by:
- **Company**: Total organization spend
- **Agent**: Per-assistant costs
- **Model**: Usage by AI model
- **Time**: Daily, weekly, monthly trends

## How It Works

```
Agent Request
    │
    ▼
┌─────────────────┐
│ LLM Processing  │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Track Usage     │  Tokens, duration, model
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Calculate Cost  │  Apply model pricing
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Store Record    │  MongoDB persistence
└─────────────────┘
```

## Tracked Metrics

| Metric | Description |
|--------|-------------|
| `inputTokens` | Tokens in request |
| `outputTokens` | Tokens in response |
| `totalTokens` | Combined token count |
| `cost` | Calculated USD cost |
| `duration` | Response time (ms) |
| `model` | AI model used |
| `provider` | AI provider |

## API Endpoints

### Get Cost Summary

```bash
GET /api/costs/summary?startDate=2025-01-01&endDate=2025-01-31
```

**Response:**

```json
{
  "totalCost": 125.50,
  "totalTokens": 2500000,
  "byModel": {
    "gpt-4o": { "cost": 80.00, "tokens": 1000000 },
    "gpt-4o-mini": { "cost": 45.50, "tokens": 1500000 }
  },
  "byProvider": {
    "openai": { "cost": 125.50 }
  },
  "byAssistant": [
    { "id": "...", "name": "Support Agent", "cost": 50.00 }
  ]
}
```

### Get Daily Costs

```bash
GET /api/costs/daily?startDate=2025-01-01&endDate=2025-01-31
```

**Response:**

```json
{
  "days": [
    { "date": "2025-01-01", "cost": 4.50, "tokens": 90000 },
    { "date": "2025-01-02", "cost": 5.20, "tokens": 104000 }
  ]
}
```

### Get Cost Records

```bash
GET /api/costs?page=1&limit=50&assistantId=...
```

### Get Costs by Assistant

```bash
GET /api/costs/by-assistant/:id
```

### Get Costs by Model

```bash
GET /api/costs/by-model/:model
```

## Model Pricing

Costs are calculated based on current model pricing (per 1K tokens):

### OpenAI

| Model | Input | Output |
|-------|-------|--------|
| gpt-4o | $0.0025 | $0.01 |
| gpt-4o-mini | $0.00015 | $0.0006 |
| gpt-4-turbo | $0.01 | $0.03 |
| o3-mini | $0.0011 | $0.0044 |
| o3 | $0.002 | $0.008 |

### Anthropic

| Model | Input | Output |
|-------|-------|--------|
| claude-sonnet-4-5 | $0.003 | $0.015 |
| claude-haiku-4-5 | $0.0008 | $0.004 |
| claude-opus-4-5 | $0.015 | $0.075 |

### Google

| Model | Input | Output |
|-------|-------|--------|
| gemini-2.5-pro | $0.00125 | $0.01 |
| gemini-2.5-flash | $0.0003 | $0.0025 |
| gemini-2.0-flash | $0.0001 | $0.0004 |

## Dashboard Features

### Summary View

- Total spend for period
- Comparison with previous period
- Top spending agents
- Cost by model/provider

### Detailed Records

- Individual request costs
- Token breakdown
- Response times
- Model used

### Trends

- Daily/weekly cost trends
- Usage patterns
- Peak usage times
- Cost forecasting

## Cost Optimization

### Choose Efficient Models

```typescript
// For simple tasks
{ llmModel: "gpt-4o-mini" }  // 40x cheaper than gpt-4o

// For complex tasks only
{ llmModel: "gpt-4o" }
```

### Optimize Token Usage

- Write concise prompts
- Limit response length with maxTokens
- Use summarization for long conversations

### Monitor Anomalies

- Set up cost alerts
- Review high-cost requests
- Identify inefficient patterns

## Console Logging

Cost information is logged in real-time:

```
[CostTracking] Company: comp_123 | Assistant: Support Agent | Model: gpt-4o | Tokens: 1,250 | Cost: $0.0235
```

Warnings for slow models:

```
[CostTracking] WARNING: O3 model detected - expected response time: 30-200+ seconds
```

## Related

- [Costs API](/api/endpoints/costs)
- [Agents](/concepts/agents)
- [Deployment](/deployment/overview)
