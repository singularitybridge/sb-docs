import React from 'react';
import Link from '@docusaurus/Link';
import { Book, Code, ExternalLink } from 'lucide-react';

interface CustomNavbarItemProps {
  to?: string;
  href?: string;
  label: string;
  icon?: string;
  position?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  book: Book,
  code: Code,
  external: ExternalLink,
};

export default function CustomNavbarItem({
  to,
  href,
  label,
  icon,
}: CustomNavbarItemProps): React.ReactElement {
  const IconComponent = icon ? iconMap[icon] : null;

  const content = (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      {IconComponent && <IconComponent size={16} />}
      {label}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="navbar__link" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className="navbar__link">
      {content}
    </Link>
  );
}
