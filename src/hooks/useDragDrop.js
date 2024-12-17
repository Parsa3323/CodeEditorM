import { useState } from 'react';
import { useFileExplorer } from '../contexts/FileExplorerContext';

export const useDragDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const { files, setFiles } = useFileExplorer();

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e, item) => {
    e.preventDefault();
    if (item?.type === 'folder' && item.path !== draggedItem?.path) {
      setDragOverItem(item);
    }
  };

  const handleDrop = (e, targetFolder) => {
    e.preventDefault();
    if (!draggedItem || !targetFolder || targetFolder.type !== 'folder') return;

    const newFiles = [...files];
    
    // Helper function to find and remove the dragged item
    const findAndRemove = (items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].path === draggedItem.path) {
          items.splice(i, 1);
          return true;
        }
        if (items[i].children) {
          if (findAndRemove(items[i].children)) {
            return true;
          }
        }
      }
      return false;
    };

    // Helper function to add the item to target folder
    const addToTarget = (items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].path === targetFolder.path) {
          items[i].children = items[i].children || [];
          items[i].children.push(draggedItem);
          return true;
        }
        if (items[i].children) {
          if (addToTarget(items[i].children)) {
            return true;
          }
        }
      }
      return false;
    };

    findAndRemove(newFiles);
    addToTarget(newFiles);
    setFiles(newFiles);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
};