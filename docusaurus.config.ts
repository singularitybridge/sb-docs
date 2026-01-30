import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
