import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
} from '@chakra-ui/react';
import BookVault from './components/BookVault';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack minH="100vh" p={3}>
          <BookVault />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
