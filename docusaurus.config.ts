import type {PrismTheme} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/* Custom dark Prism theme — used in BOTH light & dark mode
   so code blocks always have a dark bg with bright readable text */
const codeTheme: PrismTheme = {
  plain: {
    color: '#f0f0f5',
    backgroundColor: '#282a36',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#9898a6', fontStyle: 'italic' as const },
    },
    {
      types: ['punctuation'],
      style: { color: '#b8b8c4' },
    },
    {
      types: ['property', 'tag', 'constant', 'symbol', 'deleted'],
      style: { color: '#8cd4e4' },
    },
    {
      types: ['boolean', 'number'],
      style: { color: '#e0b0db' },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: '#a8d9b3' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: '#b8b8c4' },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: { color: '#c0b0e4' },
    },
    {
      types: ['function', 'class-name'],
      style: { color: '#a0c8f0' },
    },
    {
      types: ['regex', 'important', 'variable'],
      style: { color: '#ebc890' },
    },
    {
      types: ['important', 'bold'],
      style: { fontWeight: 'bold' as const },
    },
    {
      types: ['italic'],
      style: { fontStyle: 'italic' as const },
    },
  ],
};

const codeDarkTheme: PrismTheme = {
  plain: {
    color: '#dddde2',
    backgroundColor: '#131318',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#707078', fontStyle: 'italic' as const },
    },
    {
      types: ['punctuation'],
      style: { color: '#95959f' },
    },
    {
      types: ['property', 'tag', 'constant', 'symbol', 'deleted'],
      style: { color: '#7abacb' },
    },
    {
      types: ['boolean', 'number'],
      style: { color: '#cda0c8' },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: '#90b99a' },
    },
    {
      types: ['operator', 'entity', 'url'],
      style: { color: '#95959f' },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: { color: '#b0a0d0' },
    },
    {
      types: ['function', 'class-name'],
      style: { color: '#8cb4e0' },
    },
    {
      types: ['regex', 'important', 'variable'],
      style: { color: '#dbb880' },
    },
    {
      types: ['important', 'bold'],
      style: { fontWeight: 'bold' as const },
    },
    {
      types: ['italic'],
      style: { fontStyle: 'italic' as const },
    },
  ],
};

const config: Config = {
  title: 'SB Agent Hub',
  tagline: 'Build, manage, and deploy AI agents with ease',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.singularitybridge.net',
  baseUrl: '/',

  organizationName: 'singularitybridge',
  projectName: 'sb-agent-hub',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchBarShortcutHint: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'SB Agent Hub',
      logo: {
        alt: 'SB Agent Hub Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/singularitybridge/sb-agent-hub',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Concepts',
              to: '/concepts/agents',
            },
            {
              label: 'Agents',
              to: '/agents/overview',
            },
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: 'API Reference',
              to: '/api/overview',
            },
            {
              label: 'MCP Server',
              to: '/api/mcp-server',
            },
            {
              label: 'Integrations',
              to: '/integrations/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/singularitybridge/sb-agent-hub',
            },
            {
              label: 'Changelog',
              to: '/changelog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Singularity Bridge.`,
    },
    prism: {
      theme: codeTheme,
      darkTheme: codeDarkTheme,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
