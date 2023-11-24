import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  theme,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import SearchBar from './components/SearchBar';
import { searchBooks } from './services/booksApi';
import { parseQuery } from './utils/parseQuery';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const handleSearch = async (query) => {
    setIsLoading(true);

    try {
      const parsedQuery = parseQuery(query);
      const response = await searchBooks(parsedQuery);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Oops! Something went wrong. Try again later.',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }

    setIsLoading(false);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack minH="100vh" p={3}>
          <ColorModeSwitcher alignSelf="flex-end" />
          <Heading>Book Search</Heading>
          <SearchBar disabled={isLoading} onSubmit={handleSearch} />
          {isLoading && <Spinner size="xl" />}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
