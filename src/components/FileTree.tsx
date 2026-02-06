import React from 'react';
import { Folder, FileText } from 'lucide-react';

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

function FileTreeNode({ item, depth = 0, isLast = false }: { item: FileTreeItem; depth?: number; isLast?: boolean }) {
  const isFolder = item.type === 'folder';

  return (
    <div className="file-tree-node">
      <div className="file-tree-item" style={{ paddingLeft: `${depth * 1.25}rem` }}>
        <span className="file-tree-guide">
          {depth > 0 && (
            <span className={`file-tree-connector ${isLast ? 'file-tree-connector-last' : ''}`} />
          )}
        </span>
        {isFolder ? (
          <Folder size={15} className="file-tree-icon file-tree-icon-folder" />
        ) : (
          <FileText size={15} className="file-tree-icon file-tree-icon-file" />
        )}
        <span className={`file-tree-name ${isFolder ? 'file-tree-folder' : 'file-tree-file'}`}>
          {item.name}
        </span>
        {item.comment && <span className="file-tree-comment">{item.comment}</span>}
      </div>
      {item.children && item.children.map((child, index) => (
        <FileTreeNode
          key={index}
          item={child}
          depth={depth + 1}
          isLast={index === item.children!.length - 1}
        />
      ))}
    </div>
  );
}

export default function FileTree({ root, items }: FileTreeProps): React.ReactElement {
  return (
    <div className="file-tree">
      <div className="file-tree-header">
        <Folder size={15} className="file-tree-icon file-tree-icon-folder" />
        <span className="file-tree-name file-tree-folder file-tree-root-name">{root}</span>
      </div>
      <div className="file-tree-body">
        {items.map((item, index) => (
          <FileTreeNode key={index} item={item} depth={1} isLast={index === items.length - 1} />
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
