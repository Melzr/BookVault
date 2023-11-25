import React from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Spinner,
  Center,
  Image,
  Grid,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';
import { getAuthorData, getBookData } from '../services/booksApi';

const COVERS_URL = process.env.REACT_APP_COVERS_URL;

const BookDetailModal = ({ bookKey, authorsKeys, onClose }) => {
  const [book, setBook] = React.useState(null);
  const [authors, setAuthors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const toast = useToast();

  console.log('book', book);
  console.log('authors', authors);

  const coverUrl = book && book.covers?.length > 0 ? `${COVERS_URL}/b/id/${book.covers[0]}-M.jpg` : '';

  React.useEffect(() => {
    const fetchData = async () => {
      if (!bookKey) {
        onClose();
        return;
      }

      try {
        const results = await Promise.all([
          getBookData(bookKey),
          ...(authorsKeys ?? []).map(getAuthorData),
        ]);

        setBook(results[0]);
        setAuthors(results.slice(1));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Oops! Something went wrong. Try again later.',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
        onClose();
      }
    };

    setIsLoading(true);
    fetchData();
  }, [bookKey, authorsKeys]);

  return (
    <Modal isOpen onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        {isLoading || !book ? (
          <>
            <ModalCloseButton />
            <ModalBody>
              <Center w="100%" minH="400">
                <Spinner />
              </Center>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>{book.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb="5">
              <Grid templateColumns="20% 1fr" gap="5">
                <Image
                  objectFit="contain"
                  maxW="100%"
                  aspectRatio={3 / 4}
                  src={coverUrl}
                  alt={book.title}
                  fallback={
                    <Center bg="gray.200" w="100%" aspectRatio={3 / 4} borderRadius="4">
                      <FaImage color="black" boxSize="4" />
                    </Center>
                  }
                />
                <VStack align="start">
                  <Text color="gray.500" as='i' textAlign="left">{book.first_publish_date}</Text>
                  <Text fontSize="sm" mb="2">{book.description?.value}</Text>
                  <Text fontWeight="bold" fontSize="lg">Author{authors.length > 1 && 's'}</Text>
                  {authors.map(a => (
                    <>
                      <Text key={a.key} as="i">{a.name ?? 'Unknown'}</Text>
                      <Text fontSize="sm" mb="2">{a.bio && typeof a.bio === 'string' ? a.bio : ''}</Text>
                    </>
                  ))}
                  {authors.length === 0 && <Text as="i">Unknown</Text>}
                </VStack>
              </Grid>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookDetailModal;
