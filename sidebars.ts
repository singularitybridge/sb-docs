import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'concepts/agents',
        'concepts/sessions',
        'concepts/actions',
        'concepts/workspace',
      ],
    },
    {
      type: 'category',
      label: 'Agents',
      collapsed: false,
      items: [
        'agents/overview',
        'agents/creating-agents',
        'agents/configuring-prompts',
        'agents/teams',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/overview',
        'integrations/openai',
        'integrations/claude',
        'integrations/elevenlabs',
        'integrations/fly',
        'integrations/google',
        'integrations/jira',
        'integrations/opencode-sandbox',
        'integrations/perplexity',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/rag',
        'features/vector-search',
        'features/code-execution',
        'features/cost-tracking',
        'features/prompt-history',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/overview',
        'api/authentication',
        'api/mcp-server',
        {
          type: 'category',
          label: 'Endpoints',
          collapsed: false,
          items: [
            'api/endpoints/assistants',
            'api/endpoints/sessions',
            'api/endpoints/teams',
            'api/endpoints/workspace',
            'api/endpoints/costs',
            'api/endpoints/invites',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      collapsed: false,
      items: [
        'developers/authentication',
        'developers/agent-api',
        'developers/integration-development',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      collapsed: false,
      items: [
        'deployment/overview',
        'deployment/environment-variables',
        'deployment/docker',
      ],
    },
    'changelog',
  ],
};

export default sidebars;
