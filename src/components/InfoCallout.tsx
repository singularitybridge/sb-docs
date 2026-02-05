import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'success' | 'error';

interface InfoCalloutProps {
  title: string;
  children: React.ReactNode;
  type?: CalloutType;
}

const icons: Record<CalloutType, React.ReactNode> = {
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
};

export default function InfoCallout({
  title,
  children,
  type = 'info',
}: InfoCalloutProps): React.ReactElement {
  return (
    <div className={`info-callout info-callout-${type}`}>
      <div className="info-callout-icon">{icons[type]}</div>
      <div className="info-callout-content">
        <h4 className="info-callout-title">{title}</h4>
        <div className="info-callout-body">{children}</div>
      </div>
    </div>
  );
}
