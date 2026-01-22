---
sidebar_position: 1
slug: /
---

# Introduction

SB Agent Hub is a powerful platform for building, managing, and deploying AI agents. It provides a comprehensive suite of tools and services for creating intelligent assistants that can:

- **Follow instructions** via customizable prompts
- **Work with data** using Retrieval-Augmented Generation (RAG)
- **Perform actions** through function calling and integrations
- **Search semantically** with vector search capabilities

## Key Features

### Multi-Provider Support

Connect your agents to multiple AI providers:
- OpenAI (GPT-5, GPT-4.1, GPT-4o, o3)
- Anthropic (Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5)
- Google (Gemini 3, Gemini 2.5)

### Rich Integrations

Extend your agents with powerful integrations:
- **JIRA** - Create and manage tickets
- **Perplexity** - Web search capabilities
- **ElevenLabs** - Text-to-speech and voice
- **Google** - Calendar, Drive, and more

### Enterprise Ready

- Team management and organization
- Cost tracking and analytics
- Prompt version history
- Invite-based user onboarding
- Role-based access control

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SB Agent Hub                             │
├─────────────────────────────────────────────────────────────┤
│  Frontend (sb-chat-ui)     │     Backend (sb-api-services)  │
│  - React/Next.js           │     - Express/TypeScript       │
│  - Real-time chat          │     - MongoDB                  │
│  - Admin dashboard         │     - Vector search            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Integrations                            │
│  OpenAI │ Anthropic │ Google │ JIRA │ ElevenLabs │ SendGrid │
└─────────────────────────────────────────────────────────────┘
```

## Quick Links

- [Getting Started](/getting-started) - Set up your first agent
- [Core Concepts](/concepts/agents) - Understand the fundamentals
- [API Reference](/api/overview) - Explore the REST API
- [MCP Server](/api/mcp-server) - Connect with Claude Code
