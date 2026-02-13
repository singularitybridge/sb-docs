# CLAUDE.md

This file provides guidance to Claude Code when working with the Agent Hub documentation project.

## Development Commands

```bash
npm run build        # Build production documentation
npm run start        # Serve built documentation (use after build)
```

## PM2 Configuration

Run docs locally via PM2 (port 3002 to avoid conflict with sb-api on 3000):

```bash
# Serve the built docs (recommended)
pm2 start "npm run start -- --port 3002" --name sb-docs --cwd /Users/avio/dev/sb/sb-docs

# View logs
pm2 logs sb-docs

# Restart after changes
npm run build && pm2 restart sb-docs
```

Access docs at: http://localhost:3002/

## Custom Components

The docs use custom React components for consistent styling. Import them in `.mdx` files:

### AiQuickStart
Quick start callout with copy-to-clipboard prompt. Used for AI agent prompts.

```mdx
import AiQuickStart from '@site/src/components/AiQuickStart';

<AiQuickStart
  title="Want to get started quickly?"
  description="Copy this prompt to your AI coding agent."
  prompt={`Your prompt here...`}
  includePageUrl={true}  // Appends current page URL to prompt
/>
```

### InfoCallout
Styled callout boxes for tips, warnings, and notes.

```mdx
import InfoCallout from '@site/src/components/InfoCallout';

<InfoCallout title="Important Note" type="info">
  Your content here.
</InfoCallout>
```

Types: `info`, `warning`, `success`, `error`

### FileTree
Display file/folder structures.

```mdx
import FileTree, { file, folder } from '@site/src/components/FileTree';

<FileTree
  root="src/integrations/my_service/"
  items={[
    file('config.json', 'Configuration file'),
    folder('actions/', [
      file('index.ts'),
    ]),
  ]}
/>
```

## Sidebar Configuration

Edit `sidebars.ts` to modify navigation. All categories use `collapsed: false` to keep sections open by default.

```typescript
{
  type: 'category',
  label: 'Section Name',
  collapsed: false,  // Keep open
  items: ['path/to/doc'],
}
```

## Styling

CSS is in `src/css/custom.css`. Key design patterns:
- IBM Plex Sans/Mono fonts
- Zinc color palette (light/dark mode)
- Compact navbar (3rem height)
- 16rem sidebar width
- All sections open by default (no carets)

## Documentation Structure

```
docs/
├── intro.md              # Introduction
├── getting-started.md    # Getting started guide
├── changelog.md          # Changelog (update before pushes!)
├── agents/               # Agent documentation
├── api/                  # API reference (includes MCP server guide)
├── concepts/             # Core concepts
├── deployment/           # Deployment guides
├── developers/           # Developer guides
├── features/             # Feature documentation
└── integrations/         # Integration catalog
```

## Documentation Guidelines

### When to Update Docs
- Adding new API endpoints
- Adding new MCP tools
- Adding new features
- Changing environment variables
- Modifying integrations

### Changelog Updates
Before pushing changes, update `/docs/changelog.md`:

```markdown
### Added
- **Feature Name** - Brief description
```

Categories: Added, Changed, Fixed, Removed, Security

### File Types
- Use `.md` for simple pages
- Use `.mdx` when importing React components

### MCP Server Documentation
The MCP server guide (`/api/mcp-server.mdx`) documents all 43 tools. When adding new MCP tools, update:
1. Tool count in the intro
2. Tool table in the appropriate category
3. Example if the tool has complex usage

## Agent Hub Workspace — Knowledge Persistence

Multiple Claude Code sessions run in parallel on the SB project. Use the Agent Hub workspace (via `mcp__agent-hub-sb__*` MCP tools) to search for existing plans, research, and decisions before starting work. Store new findings at company scope so other sessions can access them. Key paths: `/engineering/plans/`, `/products/shmutzi/`, `/products/agent-hub/`.
