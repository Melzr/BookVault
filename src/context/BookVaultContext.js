import React from 'react';
import { useToast } from '@chakra-ui/react';
import { BOOKS_PER_PAGE } from '../constants';
import { parseQuery, searchBooks } from '../services/booksApi';

export const BookVaultContext = React.createContext();

const BookVaultContextController = ({ children }) => {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const toast = useToast();

  const fetchPage = React.useCallback(async (newPage, q) => {
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
  }, [toast]);

  const indicators = React.useMemo(() => {
    const totalPages = Math.ceil(totalItems / BOOKS_PER_PAGE);
    const currentStartIndex = currentPage * BOOKS_PER_PAGE - BOOKS_PER_PAGE + 1;
    const currentEndIndex = Math.min(currentStartIndex + BOOKS_PER_PAGE - 1, totalItems);
    const nextPageDisabled = currentPage >= Math.ceil(totalItems / BOOKS_PER_PAGE) || isLoading;
    const previousPageDisabled = currentPage <= 1 || isLoading;
    const initialPageDisabled = currentPage === 1 || isLoading;
    const lastPageDisabled = currentPage === totalPages || isLoading;

    return {
      totalPages,
      currentStartIndex,
      currentEndIndex,
      nextPageDisabled,
      previousPageDisabled,
      initialPageDisabled,
      lastPageDisabled,
    };
  }, [currentPage, totalItems, isLoading]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    fetchPage(1, newQuery);
  };

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
    fetchPage(indicators.totalPages, query);
  };

  const bookVaultContextValue = {
    query,
    isLoading,
    books,
    currentPage,
    totalItems,
    itemsPerPage: BOOKS_PER_PAGE,
    handleSearch,
    handleNextPage,
    handlePreviousPage,
    handleInitialPage,
    handleLastPage,
    ...indicators,
  };

  return <BookVaultContext.Provider value={bookVaultContextValue}>{children}</BookVaultContext.Provider>;
};

export default BookVaultContextController;
