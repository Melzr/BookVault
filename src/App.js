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
import BookTable from './components/BookTable';
import { BOOKS_PER_PAGE } from './constants';
import { searchBooks } from './services/booksApi';
import { parseQuery } from './utils/parseQuery';

function App() {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const toast = useToast();

  const fetchPage = async (newPage, q) => {
    setIsLoading(true);

    try {
      const { docs, numFound } = await searchBooks(q, newPage, BOOKS_PER_PAGE);
      setTotalItems(numFound);
      setCurrentPage(newPage);
      setBooks(docs);
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
  };

  const handleSearch = async (newQuery) => {
    const parsedQuery = parseQuery(newQuery);
    setQuery(parsedQuery);
    fetchPage(1, parsedQuery);
  };

  const totalPages = Math.ceil(totalItems / BOOKS_PER_PAGE);
  const nextPageDisabled = currentPage >= Math.ceil(totalItems / BOOKS_PER_PAGE);
  const previousPageDisabled = currentPage <= 1;
  const initialPageDisabled = currentPage === 1;
  const lastPageDisabled = currentPage === totalPages;

  const handleNextPage = () => {
    fetchPage(currentPage + 1, query);
  };

  const handlePreviousPage = () => {
    fetchPage(currentPage - 1, query);
  };

  const handleInitialPage = () => {
    fetchPage(1, query);
  };

  const handleLastPage = () => {
    fetchPage(totalPages, query);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack minH="100vh" p={3}>
          <ColorModeSwitcher alignSelf="flex-end" />
          <Heading>Book Search</Heading>
          <SearchBar disabled={isLoading} onSubmit={handleSearch} />
          {isLoading && <Spinner size="xl" />}
          {!isLoading && books.length > 0 && (
            <BookTable
              books={books}
              currentPage={currentPage}
              totalItems={totalItems}
              nextPageDisabled={nextPageDisabled}
              previousPageDisabled={previousPageDisabled}
              initialPageDisabled={initialPageDisabled}
              lastPageDisabled={lastPageDisabled}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              onInitialPage={handleInitialPage}
              onLastPage={handleLastPage}
              itemsPerPage={BOOKS_PER_PAGE}
            />
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
