import React from 'react';
import { Folder, File } from 'lucide-react';

interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  comment?: string;
  children?: FileTreeItem[];
}

interface FileTreeProps {
  root: string;
  items: FileTreeItem[];
}

function FileTreeNode({ item, depth = 0 }: { item: FileTreeItem; depth?: number }) {
  const Icon = item.type === 'folder' ? Folder : File;

  return (
    <div className="file-tree-node" style={{ paddingLeft: depth > 0 ? '1.5rem' : 0 }}>
      <div className="file-tree-item">
        <Icon size={16} className="file-tree-icon" />
        <span className={`file-tree-name file-tree-${item.type}`}>{item.name}</span>
        {item.comment && <span className="file-tree-comment">— {item.comment}</span>}
      </div>
      {item.children && item.children.map((child, index) => (
        <FileTreeNode key={index} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function FileTree({ root, items }: FileTreeProps): React.ReactElement {
  return (
    <div className="file-tree">
      <div className="file-tree-root">
        <Folder size={16} className="file-tree-icon" />
        <span className="file-tree-name file-tree-folder">{root}</span>
      </div>
      <div className="file-tree-children">
        {items.map((item, index) => (
          <FileTreeNode key={index} item={item} depth={1} />
        ))}
      </div>
    </div>
  );
}

// Helper to create file tree items easily
export const file = (name: string, comment?: string): FileTreeItem => ({
  name,
  type: 'file',
  comment,
});

export const folder = (name: string, children?: FileTreeItem[], comment?: string): FileTreeItem => ({
  name,
  type: 'folder',
  comment,
  children,
});
