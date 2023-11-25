import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Box, IconButton, Table, TableContainer, Tbody, Text, Thead, Th, Tr, Td } from "@chakra-ui/react";
import BookDetailModal from "./BookDetailModal";
import { BookVaultContext } from "../context/BookVaultContext";
import "../styles/book-table.scss";

const BookItem = ({ title, author_name, first_publish_year, onClick }) => (
  <Tr onClick={onClick} cursor="pointer">
    <Td>{title || 'Unknown'}</Td>
    <Td>{author_name && author_name.length > 0 ? author_name.join(", ") : 'Unknown'}</Td>
    <Td isNumeric>{first_publish_year || 'Unknown'}</Td>
  </Tr>
);

const BookTable = () => {
  const {
    books,
    currentStartIndex,
    currentEndIndex,
    totalItems,
    nextPageDisabled,
    previousPageDisabled,
    initialPageDisabled,
    lastPageDisabled,
    handleInitialPage,
    handlePreviousPage,
    handleNextPage,
    handleLastPage,
  } = React.useContext(BookVaultContext);
  const [activeBookKeys, setActiveBookKeys] = React.useState({}); // { bookKey, authorsKeys }

  const onBookClick = (bookKey, authorsKeys) => {
    setActiveBookKeys({ bookKey, authorsKeys });
  };

  const onModalClose = React.useCallback(() => {
    setActiveBookKeys({});
  }, []);

  return (
    <>
      {activeBookKeys.bookKey && <BookDetailModal keys={activeBookKeys} onClose={onModalClose} />}
      <TableContainer w="100%" whiteSpace="pre-wrap" className="table-container">
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author Name</Th>
                <Th isNumeric>First Publish Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {books.map(b => (
                <BookItem
                  {...b}
                  onClick={() => onBookClick(b.key, b.author_key)}
                />
              )
              )}
            </Tbody>
          </Table>
        </Box>
        <Box display="flex" justifyContent="end" alignItems="center" mt={4} className="pagination-buttons">
          <IconButton icon={<FaAngleDoubleLeft />} isDisabled={initialPageDisabled} onClick={handleInitialPage} />
          <IconButton ml={1} icon={<FaAngleLeft />} isDisabled={previousPageDisabled} onClick={handlePreviousPage} />
          <Text mx={4}>
            {`${currentStartIndex}-${currentEndIndex} of ${totalItems}`}
          </Text>
          <IconButton icon={<FaAngleRight />} isDisabled={nextPageDisabled} onClick={handleNextPage} />
          <IconButton ml={1} icon={<FaAngleDoubleRight />} isDisabled={lastPageDisabled} onClick={handleLastPage} />
        </Box>
      </TableContainer>
    </>
  );
};

export default BookTable;
