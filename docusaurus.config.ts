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
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
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
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Agents',
              to: '/agents/overview',
            },
            {
              label: 'Integrations',
              to: '/integrations/overview',
            },
          ],
        },
        {
          title: 'API',
          items: [
            {
              label: 'REST API',
              to: '/api/overview',
            },
            {
              label: 'MCP Server',
              to: '/api/mcp-server',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/singularitybridge/sb-agent-hub',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Singularity Bridge. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
