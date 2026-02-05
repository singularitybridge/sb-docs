import React, { useState } from 'react';
import { Zap, Eye, EyeOff, Copy, Check } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

interface AiQuickStartProps {
  title?: string;
  description?: string;
  prompt: string;
  /** If true, automatically appends the current page URL to the prompt */
  includePageUrl?: boolean;
}

export default function AiQuickStart({
  title = "Want to get started quickly?",
  description = "Copy this prompt and pass it to your AI coding agent.",
  prompt,
  includePageUrl = true,
}: AiQuickStartProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  // Build the full page URL from site config and current path
  const pageUrl = includePageUrl
    ? `${siteConfig.url}${location.pathname}`
    : null;

  const fullPrompt = pageUrl
    ? `${prompt}\n\nReference documentation: ${pageUrl}`
    : prompt;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="ai-quick-start">
      <div className="ai-quick-start-header">
        <Zap size={20} className="ai-quick-start-icon" />
        <div className="ai-quick-start-text">
          <span className="ai-quick-start-title">{title}</span>
          <span className="ai-quick-start-description">{description}</span>
        </div>
        <div className="ai-quick-start-actions">
          <button
            onClick={() => setExpanded(!expanded)}
            className="ai-quick-start-btn ai-quick-start-btn-secondary"
            title={expanded ? "Hide prompt" : "Preview prompt"}
          >
            {expanded ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{expanded ? "Hide" : "Preview"}</span>
          </button>
          <button
            onClick={handleCopy}
            className="ai-quick-start-btn ai-quick-start-btn-secondary"
            title={copied ? "Copied!" : "Copy prompt to clipboard"}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Prompt"}</span>
          </button>
        </div>
      </div>
      {expanded && (
        <div className="ai-quick-start-prompt-container">
          <pre className="ai-quick-start-prompt">{fullPrompt}</pre>
        </div>
      )}
    </div>
  );
}
