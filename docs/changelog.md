# Changelog

All notable changes to Agent Hub are documented here.

## [Unreleased]

### Added
- **Pusher to Socket.IO Migration** - Consolidated all real-time messaging to Socket.IO, removing Pusher.io dependency
- **Session Room Support** - WebSocket session subscriptions for real-time updates

### Changed
- **WebSocket Infrastructure** - Extended Socket.IO with session room management and React StrictMode-safe reference counting
- **MCP Documentation** - Updated MCP server docs with HTTP transport configuration for both local and production endpoints (`https://api.singularitybridge.net/api/mcp`)

### Fixed
- **OAuth Metadata URLs** - Fixed OAuth discovery endpoints to return correct production URLs by deriving base URL from request headers instead of hardcoded localhost

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
