---
sidebar_position: 5
---

# JIRA Integration

The JIRA integration enables agents to create, search, and manage tickets in Atlassian JIRA.

## Configuration

### Required Credentials

Store these in company API keys:

```json
{
  "apiKeys": {
    "jira_api_token": "your-api-token",
    "jira_domain": "your-company",
    "jira_email": "user@company.com"
  }
}
```

### Getting Credentials

1. Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Create a new API token
3. Note your JIRA domain (e.g., `company` from `company.atlassian.net`)
4. Use your Atlassian account email

## Available Actions

### createTicket

Create a new JIRA ticket.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectKey` | string | Yes | Project key (e.g., "BUG") |
| `summary` | string | Yes | Ticket title |
| `description` | string | No | Detailed description |
| `issueType` | string | No | Type (Bug, Task, Story, etc.) |
| `priority` | string | No | Priority level |
| `labels` | string[] | No | Labels to apply |
| `components` | string[] | No | Components |
| `assignee` | string | No | Assignee email or ID |

**Example:**

```json
{
  "action": "createTicket",
  "arguments": {
    "projectKey": "DEV",
    "summary": "Fix login validation",
    "description": "Users can submit empty login forms",
    "issueType": "Bug",
    "priority": "High",
    "labels": ["frontend", "urgent"]
  }
}
```

**Response:**

```json
{
  "ticketId": "DEV-123",
  "key": "DEV-123",
  "url": "https://company.atlassian.net/browse/DEV-123"
}
```

### getTickets

Search for tickets in a project.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectKey` | string | No | Project to search |
| `jql` | string | No | JQL query |
| `maxResults` | number | No | Results limit |

**Example:**

```json
{
  "action": "getTickets",
  "arguments": {
    "projectKey": "DEV",
    "jql": "status = 'In Progress' AND assignee = currentUser()"
  }
}
```

### getTicketDetails

Get full details of a specific ticket.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketKey` | string | Yes | Ticket key (e.g., "DEV-123") |

**Example:**

```json
{
  "action": "getTicketDetails",
  "arguments": {
    "ticketKey": "DEV-123"
  }
}
```

### searchTickets

Flexible search with intelligent fallbacks.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `projectKey` | string | No | Limit to project |

**Example:**

```json
{
  "action": "searchTickets",
  "arguments": {
    "query": "login authentication bug"
  }
}
```

The search handles:
- Technical term variations (askAssistant, ask_assistant, ask assistant)
- Fuzzy matching
- Multiple search strategies with fallbacks

## JQL Examples

Common JQL queries:

```sql
-- Open bugs in project
project = DEV AND issuetype = Bug AND status != Done

-- My tasks
assignee = currentUser() AND status = "In Progress"

-- Recently updated
project = DEV AND updated >= -7d

-- High priority items
priority in (High, Highest) AND status != Done

-- Text search
text ~ "login error"
```

## Agent Integration

Example prompt for JIRA-enabled agent:

```markdown
You have access to JIRA for ticket management.

When users mention:
- Bugs or issues → Search existing tickets first, then create if needed
- Tasks or work items → Create or update tickets
- Status questions → Search and report

Always:
- Include relevant details in descriptions
- Set appropriate priority
- Add useful labels
```

## Best Practices

### Ticket Quality

- Write clear, actionable summaries
- Include reproduction steps for bugs
- Set appropriate issue type and priority
- Add labels for categorization

### Search Strategy

1. Search for existing tickets first
2. Use JQL for precise queries
3. Create only when no match exists
4. Link related tickets

### Permissions

- Ensure service account has project access
- Test with minimal permissions first
- Use dedicated integration account

## Related

- [Actions](/concepts/actions)
- [Integrations Overview](/integrations/overview)
- [Creating Agents](/agents/creating-agents)
