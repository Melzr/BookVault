import React from 'react';
import {
  Heading,
  Spinner,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import BookTable from './BookTable';
import BookVaultErrorBoundary from './ErrorBoundary';
import SearchBar from './SearchBar';
import BookVaultContextController, { BookVaultContext } from '../context/BookVaultContext';
import '../styles/book-vault.scss';

const TITLE = "Book Vault";

const BookVault = () => {
  const { books, query, isLoading, handleSearch } = React.useContext(BookVaultContext);

  const shouldDisplayTable = books.length > 0;
  const infoText = query
    ? `Sorry! We couldn't find any results for "${query}"`
    : "Our vault holds over 20 million records, you'll find any book you're searching for here!";

  return (
    <Box className='book-vault-container' w="100%" maxW="1400" align="center" flexDirection="column">
      {shouldDisplayTable ? (
        <>
          <HStack spacing="4" align="center" px="4" className="search-bar-container">
            <SearchBar disabled={isLoading} onSubmit={handleSearch} maxWidth="300" initialInput={query} />
            <Heading size="l" className="title">{TITLE}</Heading>
          </HStack>
          {isLoading ? (
            <Spinner size="xl" mt="15%" />
          ) : (
            <BookTable />
          )}
        </>
      ) : (
        <>
          <Heading size="xl" mt="15%" className="title">{TITLE}</Heading>
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
};

const BookVaultContainer = () => {
  return (
    <BookVaultErrorBoundary>
      <BookVaultContextController>
        <BookVault />
      </BookVaultContextController>
    </BookVaultErrorBoundary>
  );
};

export default BookVaultContainer;
