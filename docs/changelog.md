# Changelog

All notable changes to Agent Hub are documented here.

## [Unreleased]

### Changed
- **Integration Documentation Restructured** - Separated user docs from developer docs:
  - `/integrations/overview` now only shows existing integrations catalog
  - `/developers/integration-development` is the technical guide for building integrations
  - Added AI coding agent prompt template for integration development
  - Added Claude integration to sidebar navigation

### Added
- **MCP Session Management Tools** - 6 new tools for programmatic agent testing (total 42 tools):
  - `create_session` - Start new session with agent (by ID or name)
  - `send_message` - Send message and get assistant response
  - `get_session_messages` - Retrieve message history with pagination
  - `list_sessions` - List sessions with agent/status filters
  - `clear_session` - Reset session (delete messages, keep session)
  - `delete_session` - Permanently delete session and messages
- **Tool Call Visibility** - Expose tool call information in API and MCP responses:
  - New `includeToolCalls` parameter for execute endpoints
  - MCP execute shows tool calls by default (tool name, args, results)
  - HTTP API execute hides tool calls by default (backward compatible)
  - Aggregates tool calls from ALL steps in multi-step execution
  - API Integration dialog in UI with "Show Tool Calls" option and Response/Raw JSON toggle
- **Integrations Management UI** - New dedicated page for managing integrations:
  - Integrations page (`/admin/integrations`) with card-based layout
  - Integration detail page with API key configuration and connection testing
  - Search and category filtering
  - Real-time configuration status display
  - Test connection button for validating credentials
  - Removed legacy API key management from company settings
- **IntegrationConfig System** - New per-integration API key management:
  - Dedicated `IntegrationConfig` MongoDB model for storing integration credentials
  - REST API endpoints for managing integration configurations (`/api/integrations/:id/config`)
  - Connection validation for configured integrations
  - Caching layer with 15-minute TTL for API key retrieval
  - All integrations now declare `requiredApiKeys` in their config
- **Anthropic Integration** - Standalone Anthropic Claude integration with actions:
  - `claudeGenerateText`, `claudeAnalyzeImage`, `claudeChat`, `claudeSummarize`
  - Connection validation support
- **Gemini Integration** - Standalone Google Gemini integration with actions:
  - `geminiGenerateText`, `geminiAnalyzeImage`, `geminiChat`, `geminiSummarize`
  - Connection validation support
- **MCP Server Expansion** - Added 22 new MCP tools bringing total to 36:
  - Team management: `create_team`, `update_team`, `delete_team`, `get_team`
  - Agent management: `delete_agent`, `remove_agent_from_team`
  - Cost tracking: `get_cost_summary`, `get_daily_costs` (daily breakdown with trends)
  - Integration tools: `list_integrations`, `get_integration_details`, `trigger_integration_action`
  - Model discovery: `list_models` - lists all available LLM models by provider with pricing (input/output cost per 1K tokens)
  - Agent actions: `update_agent_actions` - enable/disable integration actions for agents (setActions, addActions, removeActions)
  - Integration status: `check_integration_status` - verify if integrations have required API keys configured, optionally test connection
  - Prompt history: `list_prompt_history`, `get_prompt_version` - view and retrieve prompt version history
  - Execute tool now supports `responseFormat` for JSON mode
  - `update_agent` now supports `maxTokens` parameter

### Changed
- **Integration Development Docs** - Updated developer documentation to reflect current implementation:
  - New `requiredApiKeys` array structure with label, type, placeholder, description, helpUrl
  - Added `displayName` field for integrations
  - Updated credentials flow (credentials object instead of single apiKey)
  - Complete integration example with config and actions
  - Updated built-in integrations list (25 integrations across 7 categories)
- **Tool Result Correlation Fix** - Fixed bug where MCP execute tool matched results by toolName instead of toolCallId, causing incorrect correlation when same tool called multiple times
- **AI Models Updated (January 2026)** - Updated all LLM providers to latest models:
  - **OpenAI**: Added GPT-5.2, GPT-5.1, GPT-5, GPT-5-mini, GPT-5-nano, O3, O3-pro, O4-mini
  - **Anthropic**: Updated to Claude 4.5 series (Opus, Sonnet, Haiku)
  - **Google**: Gemini 3 Flash/Pro (preview), kept Gemini 2.5 series
- **Cost Tracking Pricing** - Updated model pricing for all new models
- **API Key Retrieval** - `getApiKey` now checks IntegrationConfig first, falls back to legacy Company.api_keys
- **MCP Session Handling** - Auto-recovery for stale sessions: authenticated clients with expired session IDs now get new sessions automatically instead of errors

### Removed
- **Deprecated Models** - Removed retired/deprecated models:
  - Claude 3.x series (retired October 2025 - January 2026)
  - Gemini 2.0 Flash (deprecated, shutdown March 31, 2026)
  - GPT-4-turbo, GPT-3.5-turbo (legacy)
- **Unused Integrations** - Removed fluximage, photoroom, terminal_turtle integrations
- **Company Token/Identifiers** - Removed unused `token` and `identifiers` fields from Company model

---

## [January 21, 2025]

### Added
- **Pusher to Socket.IO Migration** - Consolidated all real-time messaging to Socket.IO, removing Pusher.io dependency
- **Session Room Support** - WebSocket session subscriptions for real-time updates
- **MCP Session Management** - Added server-side session tracking with 1-hour TTL for MCP connections, improving connection stability

### Changed
- **WebSocket Infrastructure** - Extended Socket.IO with session room management and React StrictMode-safe reference counting
- **MCP Documentation** - Updated MCP server docs with HTTP transport configuration for both local and production endpoints (`https://api.singularitybridge.net/api/mcp`)
- **MCP OAuth Simplified** - Removed static client credentials; PKCE alone validates client identity per OAuth 2.1 spec
- **Cloudflare Configuration** - API subdomain (`api.singularitybridge.net`) now uses DNS-only mode for proper SSE streaming (Cloudflare Free plan doesn't support disabling response buffering)

### Fixed
- **OAuth Metadata URLs** - Fixed OAuth discovery endpoints to return correct production URLs by deriving base URL from request headers instead of hardcoded localhost
- **MCP WWW-Authenticate Header** - Fixed `www-authenticate` header in 401 responses to use dynamic base URL for OAuth resource metadata discovery (RFC 9728)
- **MCP OAuth Authorization Flow** - Added authorization page for API key collection during OAuth flow, enabling proper authentication with Claude.ai and other MCP clients

### Security
- **Helmet.js** - Added security headers middleware
- **CORS Whitelist** - Replaced wildcard CORS with explicit domain whitelist
- **IP Rate Limiting** - Added per-IP rate limiting for API endpoints

---

## [January 2025]

### Added

#### AI Cost Tracking System
- Complete cost tracking implementation with MongoDB persistence and REST API
- Real-time console logging with Company ID, Assistant ID/Name, Model, Tokens, Cost
- O3 model warnings for long response times (30-200+ seconds)
- Dashboard with filtering by date range, provider, model, and assistant
- CSV export functionality for cost records

#### Prompt History System
- Version control system for AI assistant prompts with automatic change tracking
- AI-generated descriptions for prompt changes using GPT-4o-mini
- Rollback capability to previous prompt versions
- Version comparison and statistics endpoints

#### Code Execution Integration
- OpenAI Code Interpreter for Python-based file processing
- Unified file management system with scope-based storage (temporary, session, agent, team, company)
- Support for file URLs and base64 content uploads

#### User Invite System
- Invite-based user onboarding with company assignment
- Secure token generation (nanoid, 132-bit entropy)
- Auto-signup control via `ALLOW_AUTO_SIGNUP` environment variable
- Rate limiting (10 invites/hour per user) and email enumeration prevention

### Changed

#### Vercel AI SDK V5 Migration
- Migrated from V4 to V5 with minimal changes
- Fixed TypeScript memory issues by importing Zod as `'zod/v3'`
- Replaced deprecated `maxSteps` with `stopWhen: stepCountIs(n)`

#### AI Assistant Access Tracking
- Added `lastAccessedAt` field for usage tracking
- GET `/api/assistants` supports sorting by `lastUsed` or `name`

### Removed

#### OpenAI Integration Cleanup
- Removed deprecated O1 model actions (`askO1Model`, `askO1ModelWithFiles`)
- O1 models (o1-preview, o1-mini) are no longer supported

---

## [December 2024]

### Added
- Teams feature for organizing assistants into logical groups
- Icon selector using Lucide icons for teams
- Many-to-many relationships between assistants and teams

### Changed
- Infrastructure upgrade from CPX21 to CX32 (4 vCPU, 8GB RAM)
- Multi-stage Dockerfile for improved build performance

### Fixed
- Google OAuth IPv6 solution for Hetzner data center compatibility

---

## API Reference

For detailed API documentation, see the [API Reference](/api/overview).
