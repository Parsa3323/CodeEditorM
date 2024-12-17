import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  IconButton,
  VStack,
  HStack,
  Text,
  Switch,
  Select,
  useColorMode
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useSettings } from "../../hooks/useSettings";

const QuickSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { 
    fontSize, 
    setFontSize,
    minimap,
    setMinimap,
    wordWrap,
    setWordWrap
  } = useSettings();

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          icon={<FiSettings />}
          variant="ghost"
          size="sm"
          aria-label="Settings"
          _hover={{ bg: "vscode.hover" }}
        />
      </PopoverTrigger>
      <PopoverContent bg="vscode.sidebar" borderColor="vscode.border" w="300px">
        <PopoverArrow bg="vscode.sidebar" />
        <PopoverHeader borderColor="vscode.border">Quick Settings</PopoverHeader>
        <PopoverBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text>Theme</Text>
              <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
                colorScheme="blue"
              />
            </HStack>
            <HStack justify="space-between">
              <Text>Font Size</Text>
              <Select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                w="100px"
                size="sm"
              >
                {[12, 14, 16, 18, 20].map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </Select>
            </HStack>
            <HStack justify="space-between">
              <Text>Minimap</Text>
              <Switch
                isChecked={minimap}
                onChange={() => setMinimap(!minimap)}
                colorScheme="blue"
              />
            </HStack>
            <HStack justify="space-between">
              <Text>Word Wrap</Text>
              <Switch
                isChecked={wordWrap}
                onChange={() => setWordWrap(!wordWrap)}
                colorScheme="blue"
              />
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default QuickSettings;