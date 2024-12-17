import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Terminal from "./Terminal";
import ActivityBar from "./ActivityBar";
import QuickSettings from "../Settings/QuickSettings";
import { FileExplorerProvider } from "../../contexts/FileExplorerContext";

const VSCodeLayout = ({ children }) => {
  const { isOpen: isTerminalOpen, onToggle: onTerminalToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <FileExplorerProvider>
      <Flex h="100vh" bg="vscode.bg" overflow="hidden">
        <ActivityBar />
        <Sidebar />
        <Flex direction="column" flex="1" overflow="hidden">
          <Flex justify="flex-end" p={2}>
            <QuickSettings />
          </Flex>
          <Box flex="1" overflow="hidden">
            {children}
          </Box>
          {isTerminalOpen && <Terminal onToggle={onTerminalToggle} />}
        </Flex>
      </Flex>
    </FileExplorerProvider>
  );
};

export default VSCodeLayout;