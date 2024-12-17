import { useState } from 'react';

export const useFolders = () => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return {
    expandedFolders,
    toggleFolder
  };
};