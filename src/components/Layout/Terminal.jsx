import { Box, Flex, Icon, Text, Input, VStack, Button } from "@chakra-ui/react";
import { FiX, FiTerminal, FiPlay } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useFileExplorer } from "../../contexts/FileExplorerContext";
import { executeCode } from "../../services/api";
import { getFileLanguage } from "../../utils/fileUtils";

const Terminal = ({ onToggle }) => {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const { activeEditor, files } = useFileExplorer();

  const getFileContent = (path) => {
    const findContent = (items) => {
      for (const item of items) {
        if (item.path === path) return item.content;
        if (item.children) {
          const content = findContent(item.children);
          if (content !== undefined) return content;
        }
      }
    };
    return findContent(files) || "";
  };

  const handleCommand = (e) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newCommand = { text: `$ ${currentCommand}`, output: "" };
      
      switch (currentCommand.trim()) {
        case "clear":
          setCommands([]);
          break;
        case "ls":
          newCommand.output = "src  public  package.json  README.md  vite.config.js";
          setCommands([...commands, newCommand]);
          break;
        case "pwd":
          newCommand.output = "/home/project";
          setCommands([...commands, newCommand]);
          break;
        default:
          newCommand.output = `Command not found: ${currentCommand}`;
          setCommands([...commands, newCommand]);
      }
      
      setCurrentCommand("");
    }
  };

  const runCode = async () => {
    if (!activeEditor || isExecuting) return;

    const content = getFileContent(activeEditor);
    const language = getFileLanguage(activeEditor);
    
    setIsExecuting(true);
    const newCommand = { text: `$ Running ${activeEditor}...`, output: "" };
    setCommands(prev => [...prev, newCommand]);

    try {
      const result = await executeCode(language, content);
      setCommands(prev => [
        ...prev,
        { text: "Output:", output: result.run.output || "No output" }
      ]);
    } catch (error) {
      setCommands(prev => [
        ...prev,
        { text: "Error:", output: error.message }
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <Box
      h="200px"
      bg="vscode.terminal"
      borderTop="1px solid"
      borderColor="gray.700"
    >
      <Flex
        align="center"
        px={4}
        py={1}
        borderBottom="1px solid"
        borderColor="gray.700"
        bg="vscode.bg"
        justify="space-between"
      >
        <Flex align="center">
          <Icon as={FiTerminal} mr={2} />
          <Text fontSize="sm">Terminal</Text>
        </Flex>
        <Flex align="center" gap={2}>
          <Button
            leftIcon={<FiPlay />}
            size="xs"
            colorScheme="green"
            isLoading={isExecuting}
            onClick={runCode}
            isDisabled={!activeEditor}
          >
            Run
          </Button>
          <Icon
            as={FiX}
            cursor="pointer"
            onClick={onToggle}
            _hover={{ color: "white" }}
          />
        </Flex>
      </Flex>
      <Box
        ref={terminalRef}
        p={2}
        color="gray.300"
        fontFamily="monospace"
        fontSize="sm"
        overflowY="auto"
        h="calc(200px - 32px)"
      >
        <VStack align="stretch" spacing={1}>
          {commands.map((cmd, i) => (
            <Box key={i}>
              <Text color="gray.300">{cmd.text}</Text>
              {cmd.output && (
                <Text color="gray.400" whiteSpace="pre-wrap">
                  {cmd.output}
                </Text>
              )}
            </Box>
          ))}
          <Flex align="center">
            <Text color="gray.300">$ </Text>
            <Input
              ref={inputRef}
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              variant="unstyled"
              pl={2}
              autoFocus
              _focus={{ outline: "none" }}
            />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Terminal;