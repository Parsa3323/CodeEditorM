import { createContext, useContext } from "react";
import { useFiles } from "../hooks/useFiles";
import { useFolders } from "../hooks/useFolders";
import { downloadAsZip } from "../utils/zipUtils";

const FileExplorerContext = createContext();

export const useFileExplorer = () => {
  const context = useContext(FileExplorerContext);
  if (!context) {
    throw new Error("useFileExplorer must be used within a FileExplorerProvider");
  }
  return context;
};

export const FileExplorerProvider = ({ children }) => {
  const {
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
  } = useFiles();

  const { expandedFolders, toggleFolder } = useFolders();

  const openFile = (path) => {
    setActiveEditor(path);
    setSelectedFile(path);
  };

  const downloadProject = () => downloadAsZip(files);

  return (
    <FileExplorerContext.Provider
      value={{
        files,
        setFiles, // Add this
        selectedFile,
        expandedFolders,
        activeEditor,
        createFile,
        createFolder,
        deleteItem,
        toggleFolder,
        openFile,
        updateFileContent,
        downloadProject
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
};