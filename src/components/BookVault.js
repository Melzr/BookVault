import React from 'react';
import {
  Heading,
  useToast,
  Spinner,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import SearchBar from './SearchBar';
import BookTable from './BookTable';
import { BOOKS_PER_PAGE } from '../constants';
import { searchBooks } from '../services/booksApi';
import { parseQuery } from '../utils/parseQuery';
import '../styles/book-vault.scss';

const BookVault = () => {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const toast = useToast();

  const fetchPage = async (newPage, q) => {
    setIsLoading(true);

    try {
      const parsedQuery = parseQuery(q);
      const { docs, numFound } = await searchBooks(parsedQuery, newPage, BOOKS_PER_PAGE);
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
    setQuery(newQuery);
    fetchPage(1, newQuery);
  };

  const totalPages = Math.ceil(totalItems / BOOKS_PER_PAGE);
  const nextPageDisabled = currentPage >= Math.ceil(totalItems / BOOKS_PER_PAGE) || isLoading;
  const previousPageDisabled = currentPage <= 1 || isLoading;
  const initialPageDisabled = currentPage === 1 || isLoading;
  const lastPageDisabled = currentPage === totalPages || isLoading;

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

  const shouldDisplayTable = books.length > 0;
  const infoText = query
    ? `Sorry! We couldn't find any results for "${query}"`
    : "Our vault holds over 20 million records, you'll find any book you're searching for here!";
  const title = "Book Vault";

  return (
    <Box className='book-vault-container' w="100%" maxW="1400" align="center" flexDirection="column">
      {shouldDisplayTable ? (
        <>
          <HStack spacing="4" align="center" px="4" className="search-bar-container">
            <SearchBar disabled={isLoading} onSubmit={handleSearch} maxWidth="300" initialInput={query} />
            <Heading size="l" className="title">{title}</Heading>
          </HStack>
          {isLoading ? (
            <Spinner size="xl" mt="15%" />
          ) : (
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
        </>
      ) : (
        <>
          <Heading size="xl" mt="15%" className="title">{title}</Heading>
          <SearchBar disabled={isLoading} onSubmit={handleSearch} initialInput={query} />
          {isLoading ? (
            <Spinner size="xl" mt="6" />
          ) : (
            <Text fontSize="lg" maxW="500" mt="6">
              {infoText}
            </Text>
          )}
        </>
      )}
    </Box>
  );
}

export default BookVault;
