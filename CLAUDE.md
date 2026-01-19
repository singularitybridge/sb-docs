# CLAUDE.md

This file provides guidance to Claude Code when working with the Agent Hub documentation project.

## Development Commands

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build production documentation
npm run serve        # Serve built documentation
```

## Documentation Maintenance

### Changelog Updates

**IMPORTANT**: Before pushing changes to the main repositories (sb-api-services-v2 or sb-chat-ui), update the changelog:

1. Open `/docs/changelog.md`
2. Add new entries under `[Unreleased]` section
3. Categorize changes as:
   - **Added** - New features
   - **Changed** - Changes to existing functionality
   - **Fixed** - Bug fixes
   - **Removed** - Removed features
   - **Security** - Security improvements

### Example Changelog Entry

```markdown
### Added
- **Feature Name** - Brief description of the feature
  - Sub-detail if needed
```

### When to Update Documentation

Update docs when:
- Adding new API endpoints
- Adding new features
- Changing environment variables
- Modifying integrations
- Changing deployment procedures

### Documentation Structure

```
docs/
├── intro.md              # Introduction
├── getting-started.md    # Getting started guide
├── changelog.md          # Changelog (update before pushes!)
├── agents/               # Agent documentation
├── api/                  # API reference
├── concepts/             # Core concepts
├── deployment/           # Deployment guides
├── developers/           # Developer guides
├── features/             # Feature documentation
└── integrations/         # Integration guides
```

## PM2 Configuration

Run docs locally via PM2 (port 3002 to avoid conflict with sb-api on 3000):
```bash
pm2 start "npm run dev -- --port 3002" --name "sb-docs" --cwd /Users/avio/dev/sb/sb-docs
```

Access docs at: http://localhost:3002/

View logs:
```bash
pm2 logs sb-docs
```

## Build & Preview

```bash
# Build for production
npm run build

# Preview the build
npm run serve
```

## Sidebar Configuration

Edit `sidebars.ts` to add or modify navigation items.
