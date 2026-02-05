import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyCodeProps {
  children: string;
  inline?: boolean;
}

export default function CopyCode({ children, inline = false }: CopyCodeProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (inline) {
    return (
      <span className="copy-code-inline">
        <code>{children}</code>
        <button onClick={handleCopy} className="copy-code-btn-inline" title="Copy">
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </span>
    );
  }

  return (
    <div className="copy-code-block">
      <pre><code>{children}</code></pre>
      <button onClick={handleCopy} className="copy-code-btn" title={copied ? "Copied!" : "Copy"}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
