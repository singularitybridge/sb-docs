import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Core Concepts',
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
      items: [
        'integrations/overview',
        'integrations/openai',
        'integrations/elevenlabs',
        'integrations/google',
        'integrations/jira',
        'integrations/perplexity',
        'integrations/twilio',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'developers/authentication',
        'developers/agent-api',
        'developers/integration-development',
      ],
    },
    {
      type: 'category',
      label: 'Features',
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
      label: 'Deployment',
      items: [
        'deployment/overview',
        'deployment/environment-variables',
        'deployment/docker',
      ],
    },
  ],
  apiSidebar: [
    'api/overview',
    'api/authentication',
    'api/mcp-server',
    {
      type: 'category',
      label: 'Endpoints',
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
};

export default sidebars;
