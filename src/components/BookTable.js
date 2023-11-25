import React from "react";
import { Box, IconButton, Table, TableContainer, Tbody, Text, Thead, Th, Tr, Td } from "@chakra-ui/react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import "../styles/table.scss";

const BookItem = ({ key, title, author_name, first_publish_year }) => (
  <Tr key={key}>
    <Td>{title}</Td>
    <Td>{author_name && author_name.length > 0 ? author_name.join(", ") : 'Unknown'}</Td>
    <Td isNumeric>{first_publish_year || 'Unknown'}</Td>
  </Tr>
);

const BookTable = ({
  books,
  currentPage,
  totalItems,
  nextPageDisabled,
  previousPageDisabled,
  initialPageDisabled,
  lastPageDisabled,
  onNextPage,
  onPreviousPage,
  onInitialPage,
  onLastPage,
  itemsPerPage,
}) => {
  const index = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastIndex = Math.min(index + itemsPerPage - 1, totalItems);

  return (
    <TableContainer w="100%" whiteSpace="pre-wrap" className="table-container">
      <Box overflowX="auto">
        <Table variant="simple" minW="500">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author Name</Th>
              <Th isNumeric>First Publish Year</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map(BookItem)}
          </Tbody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="end" alignItems="center" mt={4} className="pagination-buttons">
        <IconButton icon={<FaAngleDoubleLeft />} isDisabled={initialPageDisabled} onClick={onInitialPage} />
        <IconButton ml={1} icon={<FaAngleLeft />} isDisabled={previousPageDisabled} onClick={onPreviousPage} />
        <Text mx={4}>
          {`${index}-${lastIndex} of ${totalItems}`}
        </Text>
        <IconButton icon={<FaAngleRight />} isDisabled={nextPageDisabled} onClick={onNextPage} />
        <IconButton ml={1} icon={<FaAngleDoubleRight />} isDisabled={lastPageDisabled} onClick={onLastPage} />
      </Box>
    </TableContainer>
  );
};

export default BookTable;
