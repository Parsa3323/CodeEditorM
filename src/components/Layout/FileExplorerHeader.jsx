import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FiFile, FiFolder, FiDownload } from "react-icons/fi";
import { useFileExplorer } from "../../contexts/FileExplorerContext";

const FileExplorerHeader = ({ onNewFile, onNewFolder }) => {
  const { downloadProject } = useFileExplorer();

  return (
    <HStack spacing={1} p={1}>
      <Tooltip label="New File">
        <IconButton
          icon={<FiFile />}
          size="sm"
          variant="ghost"
          onClick={onNewFile}
          aria-label="New File"
          _hover={{ bg: "vscode.hover" }}
        />
      </Tooltip>
      <Tooltip label="New Folder">
        <IconButton
          icon={<FiFolder />}
          size="sm"
          variant="ghost"
          onClick={onNewFolder}
          aria-label="New Folder"
          _hover={{ bg: "vscode.hover" }}
        />
      </Tooltip>
      <Tooltip label="Download Project">
        <IconButton
          icon={<FiDownload />}
          size="sm"
          variant="ghost"
          onClick={downloadProject}
          aria-label="Download Project"
          _hover={{ bg: "vscode.hover" }}
        />
      </Tooltip>
    </HStack>
  );
};

export default FileExplorerHeader;