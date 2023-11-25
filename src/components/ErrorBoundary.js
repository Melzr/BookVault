import { Box, Heading, Text } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { APP_NAME } from '../constants';

const ErrorFallback = () => {
  return (
    <Box w="100%" mt="15%" align="center" flexDirection="column">
      <Heading size="xl" mb="4">{APP_NAME}</Heading>
      <Heading size="l" color="red">Oops! Something went wrong.</Heading>
      <Text>Try refreshing the page.</Text>
    </Box>
  );
};

const BookVaultErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default BookVaultErrorBoundary;
