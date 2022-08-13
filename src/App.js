import { useState, useEffect } from "react";
import { Box, Text, Textarea, Divider, Center, Switch } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [text, setText] = useState();
  const [html, setHtml] = useState(false);
  const [page, setPage] = useState(4);

  useEffect(() => {
    (async () => {
      const { data } = await axios(
        `https://baconipsum.com/api/?type=all-meat&paras=${page}&format=${
          html ? "html" : "text"
        }`
      );
      setText(data);
    })();
  }, [html, page]);

  return (
    <Box maxW="75%" mx="auto">
      <Center>
        <Text fontSize="3rem" my={5} textAlign="center">
          React sample text generator app
        </Text>
      </Center>
      <Divider />
      <Center mt={6} mb={5}>
        <Text mr={4}>Paragraphs</Text>
        <NumberInput
          defaultValue={4}
          size="sm"
          allowMouseWheel
          mr={6}
          w={100}
          onChange={(e) => setPage(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text mr={4}>Include HTML</Text>
        <Switch
          size="lg"
          onChange={() => (html ? setHtml(false) : setHtml(true))}
        />
      </Center>
      <Center bg="#242424">
        <Textarea
          rows={22}
          isReadOnly={true}
          value={text}
          h="auto"
          border="none"
        />
      </Center>
    </Box>
  );
}

export default App;
