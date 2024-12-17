import { useState } from 'react';
import { getDefaultContent } from '../utils/fileUtils';

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeEditor, setActiveEditor] = useState(null);

  const createFile = (parentPath, fileName) => {
    const newFile = {
      name: fileName,
      type: "file",
      path: parentPath ? `${parentPath}/${fileName}` : fileName,
      content: getDefaultContent(fileName)
    };

    setFiles(prevFiles => {
      if (!parentPath) {
        return [...prevFiles, newFile];
      }

      const updateFilesRecursively = (items) => {
        return items.map(item => {
          if (item.path === parentPath && item.type === "folder") {
            return {
              ...item,
              children: [...(item.children || []), newFile]
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateFilesRecursively(item.children)
            };
          }
          return item;
        });
      };

      return updateFilesRecursively(prevFiles);
    });

    setActiveEditor(newFile.path);
    setSelectedFile(newFile.path);
  };

  const createFolder = (parentPath, folderName) => {
    const newFolder = {
      name: folderName,
      type: "folder",
      path: parentPath ? `${parentPath}/${folderName}` : folderName,
      children: []
    };

    setFiles(prevFiles => {
      if (!parentPath) {
        return [...prevFiles, newFolder];
      }

      const updateFilesRecursively = (items) => {
        return items.map(item => {
          if (item.path === parentPath && item.type === "folder") {
            return {
              ...item,
              children: [...(item.children || []), newFolder]
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateFilesRecursively(item.children)
            };
          }
          return item;
        });
      };

      return updateFilesRecursively(prevFiles);
    });
  };

  const deleteItem = (path) => {
    setFiles(prevFiles => {
      const deleteRecursively = (items) => {
        return items.filter(item => {
          if (item.path === path) return false;
          if (item.children) {
            return {
              ...item,
              children: deleteRecursively(item.children)
            };
          }
          return true;
        });
      };

      return deleteRecursively(prevFiles);
    });

    if (activeEditor === path) {
      setActiveEditor(null);
    }
    if (selectedFile === path) {
      setSelectedFile(null);
    }
  };

  const updateFileContent = (path, content) => {
    setFiles(prevFiles => {
      const updateRecursively = (items) => {
        return items.map(item => {
          if (item.path === path) {
            return { ...item, content };
          }
          if (item.children) {
            return {
              ...item,
              children: updateRecursively(item.children)
            };
          }
          return item;
        });
      };

      return updateRecursively(prevFiles);
    });
  };

  return {
    files,
    setFiles, // Add this
    selectedFile,
    activeEditor,
    createFile,
    createFolder,
    deleteItem,
    updateFileContent,
    setActiveEditor,
    setSelectedFile
  };
};