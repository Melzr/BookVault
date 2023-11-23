import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack minH="100vh" p={3}>
          <ColorModeSwitcher alignSelf="flex-end" />
          <Heading>Book Search</Heading>
          <SearchBar />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
