import React from "react";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const BOOKS_PER_PAGE = 10;

const BookItem = ({ key, title, author_name, first_publish_year }) => (
  <Tr key={key}>
    <Td>{title}</Td>
    <Td>{author_name && author_name.length > 0 ? author_name.join(", ") : 'Unknown'}</Td>
    <Td isNumeric>{first_publish_year || 'Unknown'}</Td>
  </Tr>
);

const BookTable = ({ books }) => {
  const [indexOffset, setIndexOffset] = React.useState(0);

  React.useEffect(() => {
    setIndexOffset(0);
  }, [books]);

  return (
    <TableContainer width="100%" maxW="1200" minW="500" overflowX="auto" whiteSpace="pre-wrap">
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author Name</Th>
            <Th isNumeric>First Publish Year</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.slice(indexOffset, indexOffset + BOOKS_PER_PAGE).map(BookItem)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
