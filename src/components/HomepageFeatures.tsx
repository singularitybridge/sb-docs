import React from 'react';
import {
  User,
  FolderOpen,
  Workflow,
  Wrench,
  Brain,
  Zap,
  Terminal,
  Briefcase,
  Headphones,
  BarChart3,
  Mail,
  FileText,
  Code,
  Lock,
  Shield,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import styles from './Homepage.module.css';

interface FeatureItem {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}

const coreFeatures: FeatureItem[] = [
  {
    icon: User,
    title: 'Agent Identity',
    description: 'Each agent has its own identity — email, phone, credentials — like a real employee',
  },
  {
    icon: FolderOpen,
    title: 'Virtual Workspace',
    description: 'Agents create their own tools, scripts, and organize data in dedicated workspaces',
  },
  {
    icon: Workflow,
    title: 'Multi-Agent Teams',
    description: 'Agents collaborate, delegate, and coordinate complex tasks autonomously',
  },
  {
    icon: Wrench,
    title: 'Tool Creation',
    description: 'Agents build custom tools on-demand, reducing need for SaaS products',
  },
  {
    icon: Brain,
    title: 'Any LLM Provider',
    description: 'OpenAI, Anthropic, Google — switch models without changing code',
  },
  {
    icon: Zap,
    title: 'Integration Framework',
    description: 'Connect to any API via function calling, MCP-compatible',
  },
];

const techStack = [
  'Advanced LLM Integration',
  'Model Context Protocol (MCP)',
  'Prompt Engineering Framework',
  'Virtual Workspace Engine',
  'Identity Management System',
  'Tool Creation Framework',
  'Multi-Agent Orchestration',
  'Enterprise Security',
];

const useCases: FeatureItem[] = [
  {
    icon: Terminal,
    title: 'Software Development',
    description: 'Autonomous coding, testing, debugging, deployment',
  },
  {
    icon: Briefcase,
    title: 'Project Management',
    description: 'Sprint planning, ticket management, status updates',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Ticket routing, knowledge base, escalation workflows',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    description: 'Report generation, data processing, insights',
  },
  {
    icon: Mail,
    title: 'Communication',
    description: 'Email handling, scheduling, notifications',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Auto-generate docs, maintain wikis, SOPs',
  },
];

const integrations = [
  'JIRA',
  'GitHub',
  'Slack',
  'SendGrid',
  'MongoDB',
  'Perplexity',
  'ElevenLabs',
  'Any REST API',
];

const securityFeatures = [
  {
    icon: Code,
    title: 'Full REST API',
    description: 'Every feature accessible programmatically',
  },
  {
    icon: Lock,
    title: 'OAuth 2.1 / API Keys',
    description: 'Enterprise SSO & secure auth',
  },
  {
    icon: Shield,
    title: 'Tenant Isolation',
    description: 'Company-level data segregation',
  },
];

const howItWorks = [
  { step: '1', title: 'Create Agent', description: 'Define identity, prompt, model & allowed actions' },
  { step: '2', title: 'Setup Workspace', description: 'Agent gets dedicated space for tools, data, scripts' },
  { step: '3', title: 'Add Integrations', description: 'Connect APIs, databases, external services' },
  { step: '4', title: 'Deploy & Scale', description: 'API access, team collaboration, 24/7 operation' },
];

export function StatsBar(): React.ReactElement {
  const stats = [
    { value: '90%', label: 'Cost Reduction Potential' },
    { value: '24/7', label: 'Continuous Operation' },
    { value: '∞', label: 'Scalability' },
    { value: 'MCP', label: 'Protocol Native' },
  ];

  return (
    <div className={styles.statsBar}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.statItem}>
          <div className={styles.statValue}>{stat.value}</div>
          <div className={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export function ValueProposition(): React.ReactElement {
  return (
    <div className={styles.valueSection}>
      <div className={styles.valueHeader}>
        <span className={styles.valueIcon}>
          <Zap size={20} />
        </span>
        <h3 className={styles.valueTitle}>Replace SaaS + Reduce Headcount</h3>
      </div>
      <div className={styles.comparisonGrid}>
        <div className={`${styles.comparisonCard} ${styles.traditional}`}>
          <div className={styles.comparisonLabel}>Traditional Approach</div>
          <p className={styles.comparisonText}>
            $15K–30K per employee annually + $100–500/employee/month in SaaS tools.
            Limited to 8-hour workdays and time zones. Linear hiring constraints.
          </p>
        </div>
        <div className={`${styles.comparisonCard} ${styles.modern}`}>
          <div className={styles.comparisonLabel}>AI Agent Hub Approach</div>
          <p className={styles.comparisonText}>
            Deploy AI agents at a fraction of the cost. Each agent creates its own tools,
            eliminating SaaS expenses while providing 24/7 productivity with infinite scalability.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CoreFeatures(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Core Platform Features</h2>
        <p className={styles.sectionDescription}>
          Everything you need to build, deploy, and manage AI agent teams
        </p>
      </div>
      <div className={styles.featureGrid}>
        {coreFeatures.map((feature, i) => (
          <div key={i} className={styles.featureCard}>
            <span className={styles.featureIcon}>
              <feature.icon size={18} />
            </span>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>{feature.title}</h4>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechnologyStack(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Technology Stack</h2>
        <p className={styles.sectionDescription}>
          Built on modern AI technologies designed for enterprise scalability
        </p>
      </div>
      <div className={styles.techGrid}>
        {techStack.map((tech, i) => (
          <span key={i} className={styles.techTag}>{tech}</span>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionDescription}>
          Get from zero to production-ready AI agents in four simple steps
        </p>
      </div>
      <div className={styles.stepsContainer}>
        <div className={styles.stepsGrid}>
          {howItWorks.map((item, i) => (
            <React.Fragment key={i}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>{item.step}</div>
                <h4 className={styles.stepTitle}>{item.title}</h4>
                <p className={styles.stepDescription}>{item.description}</p>
              </div>
              {i < howItWorks.length - 1 && (
                <ArrowRight size={20} className={styles.stepArrow} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UseCases(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Built For Any Task</h2>
        <p className={styles.sectionDescription}>
          Agents excel at software, project management, and tech tasks — but can be trained
          to do anything that can be done with a mouse and keyboard.
        </p>
      </div>
      <div className={styles.useCaseGrid}>
        {useCases.map((uc, i) => (
          <div key={i} className={styles.useCaseCard}>
            <span className={styles.useCaseIcon}>
              <uc.icon size={24} />
            </span>
            <h4 className={styles.useCaseTitle}>{uc.title}</h4>
            <p className={styles.useCaseDescription}>{uc.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Integrations(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Integration Framework</h2>
        <p className={styles.sectionDescription}>
          Connect to any external system via function calling
        </p>
      </div>
      <div className={styles.integrationSection}>
        <p className={styles.integrationText}>
          Define actions, parameters, and authentication. Agents automatically discover
          and use available integrations. Connect to <strong>any external system</strong> with
          our flexible integration framework.
        </p>
        <div className={styles.integrationGrid}>
          {integrations.map((int, i) => (
            <div key={i} className={styles.integrationItem}>{int}</div>
          ))}
        </div>
        <div className={styles.mcpNote}>
          <CheckCircle2 size={16} />
          <span>Model Context Protocol (MCP) compatible</span>
        </div>
      </div>
    </section>
  );
}

export function Security(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>API & Security</h2>
        <p className={styles.sectionDescription}>
          Enterprise-grade security with full API access
        </p>
      </div>
      <div className={styles.securityGrid}>
        {securityFeatures.map((item, i) => (
          <div key={i} className={styles.securityCard}>
            <span className={styles.securityIcon}>
              <item.icon size={24} />
            </span>
            <h4 className={styles.securityTitle}>{item.title}</h4>
            <p className={styles.securityDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CallToAction(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>Start Building AI Agent Teams</h3>
        <p className={styles.ctaSubtitle}>
          Create your first agent in minutes. Full API access. No vendor lock-in.
        </p>
        <div className={styles.ctaContact}>
          <a href="mailto:avi@singularitybridge.net">avi@singularitybridge.net</a>
          <span className={styles.ctaDivider}>|</span>
          <a href="https://singularitybridge.net" target="_blank" rel="noopener noreferrer">
            singularitybridge.net
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomepageFooter(): React.ReactElement {
  return (
    <div className={styles.homepageFooter}>
      AI Agent Hub by Singularity Bridge
    </div>
  );
}
