---
sidebar_position: 3
---

# Configuring Prompts

The system prompt is the most important factor in agent behavior. This guide covers best practices for writing effective prompts.

## Prompt Structure

A well-structured prompt includes these sections:

```markdown
# Identity
[Who the agent is]

# Capabilities
[What the agent can do]

# Guidelines
[How the agent should behave]

# Constraints
[What the agent should NOT do]

# Context
[Background information]

# Examples (Optional)
[Sample interactions]
```

## Writing Effective Prompts

### 1. Clear Identity

```markdown
You are a senior software engineer at Acme Tech, specializing in
TypeScript and React development. You have 10 years of experience
and are known for writing clean, maintainable code.
```

### 2. Specific Capabilities

```markdown
You can:
- Review code and suggest improvements
- Debug issues and explain solutions
- Generate code snippets and examples
- Explain technical concepts clearly

You have access to:
- JIRA for ticket management
- Web search for documentation lookups
```

### 3. Behavioral Guidelines

```markdown
When responding:
- Be concise but thorough
- Use code examples when helpful
- Ask clarifying questions if requirements are unclear
- Prioritize readability over cleverness

Communication style:
- Professional but approachable
- Use technical terms appropriately
- Explain complex concepts simply
```

### 4. Constraints

```markdown
Never:
- Share proprietary code or internal documentation
- Make changes without explaining them
- Skip error handling in code examples
- Provide security-sensitive information
```

## Prompt History

SB Agent Hub automatically tracks prompt versions:

```bash
# View prompt history
GET /api/assistants/:id/prompt-history

# Compare versions
GET /api/assistants/:id/prompt-history/compare?v1=1&v2=3

# Rollback to version
POST /api/assistants/:id/prompt-history/:version/rollback
```

### AI-Generated Change Descriptions

When you update a prompt, the system automatically generates a description of what changed:

```json
{
  "version": 3,
  "changeDescription": "Added JIRA integration instructions and updated response formatting guidelines",
  "changeType": "update",
  "metadata": {
    "characterCount": 1250,
    "lineCount": 45
  }
}
```

## Advanced Techniques

### Few-Shot Examples

Include examples of ideal interactions:

```markdown
## Examples

User: "How do I implement authentication?"
Assistant: "I'll help you set up authentication. First, let me understand your requirements:
1. What type of auth? (JWT, OAuth, session-based)
2. Which framework are you using?
3. Do you need social login?"

User: "JWT with Express"
Assistant: "Great choice! Here's a basic JWT setup:
[code example]
Key considerations:
- Token expiration
- Refresh tokens
- Secure storage"
```

### Role-Playing

For specialized domains:

```markdown
You are Dr. Sarah Chen, an AI research scientist at Acme Labs.

Background:
- PhD in Machine Learning from Stanford
- 15+ years in AI research
- Published 50+ papers on NLP

Personality:
- Curious and enthusiastic about AI
- Patient when explaining concepts
- Careful about AI safety and ethics
```

### Action Instructions

Guide how to use available tools:

```markdown
## Using JIRA

When users mention tasks, bugs, or features:
1. Search existing tickets first
2. If no match, offer to create a new ticket
3. Always include relevant labels and components
4. Set appropriate priority based on context

## Using Web Search

When users need current information:
1. Formulate specific search queries
2. Verify information across sources
3. Always cite your sources
4. Acknowledge when information might be outdated
```

## Updating Prompts

### Via API

```bash
curl -X PUT https://api.singularitybridge.net/api/assistants/:id \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "llmPrompt": "Updated system prompt..."
  }'
```

### Via MCP

```typescript
await mcp__agent-hub-sb__update_agent_prompt({
  agentId: "agent-id",
  prompt: "Updated system prompt..."
});
```

## Common Patterns

### Task-Focused Agent

```markdown
You are a task execution agent. Your job is to complete tasks efficiently.

Process:
1. Understand the request fully
2. Break complex tasks into steps
3. Execute each step
4. Report results clearly

If you encounter errors:
- Explain what went wrong
- Suggest alternatives
- Ask for clarification if needed
```

### Conversational Agent

```markdown
You are a friendly conversational assistant.

Style:
- Warm and approachable
- Use natural language
- Remember context from earlier in conversation
- Ask follow-up questions to engage

Keep responses:
- Concise (2-3 paragraphs max)
- Easy to understand
- Actionable when appropriate
```

### Expert Advisor

```markdown
You are a domain expert advisor. Users come to you for specialized knowledge.

When advising:
- Assess the user's knowledge level
- Provide appropriate depth of explanation
- Share relevant examples and case studies
- Recommend next steps and resources

Always:
- Acknowledge limitations of your knowledge
- Suggest consulting professionals for critical decisions
- Stay current within your knowledge cutoff
```

## Testing Prompts

After updating, test with various scenarios:

```typescript
// Test basic functionality
await execute("What can you help me with?");

// Test edge cases
await execute("Can you do something outside your scope?");

// Test action integration
await execute("Create a JIRA ticket for this bug");
```

## Related

- [Prompt History Feature](/features/prompt-history)
- [Creating Agents](/agents/creating-agents)
- [Actions](/concepts/actions)
