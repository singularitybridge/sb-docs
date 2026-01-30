import React, { useState } from 'react';
import { Copy, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface AiQuickStartProps {
  title?: string;
  description?: string;
  prompt: string;
  docsUrl?: string;
}

export default function AiQuickStart({
  title = "Quick Start with AI",
  description = "Copy the prompt and pass it to your AI coding agent.",
  prompt,
  docsUrl,
}: AiQuickStartProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Build the full prompt with docs reference
  const fullPrompt = docsUrl
    ? `${prompt}\n\nReference documentation: ${docsUrl}`
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
      <div className="ai-quick-start-content">
        <div className="ai-quick-start-header">
          <Sparkles size={18} className="ai-quick-start-icon" />
          <div className="ai-quick-start-text">
            <span className="ai-quick-start-title">{title}</span>
            <span className="ai-quick-start-description">{description}</span>
          </div>
        </div>
        <div className="ai-quick-start-actions">
          <button
            onClick={() => setExpanded(!expanded)}
            className="ai-quick-start-preview-btn"
            title={expanded ? "Hide prompt" : "Preview prompt"}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{expanded ? "Hide" : "Preview"}</span>
          </button>
          <button
            onClick={handleCopy}
            className="ai-quick-start-copy-btn"
            title={copied ? "Copied!" : "Copy prompt to clipboard"}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
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
