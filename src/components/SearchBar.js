import { useState } from 'react';
import { Box, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const MIN_INPUT_LENGTH = 3;

const SearchBar = ({ disabled, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const search = () => {
    if (inputValue.length >= MIN_INPUT_LENGTH) {
      onSubmit(inputValue);
    }
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length < MIN_INPUT_LENGTH && event.target.value.length > 0) {
      setError(`Input must be at least ${MIN_INPUT_LENGTH} characters`);
    } else {
      setError('');
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };


  return (
    <Box w="100%" maxW="300" spacing={1} align="start">
      <InputGroup width="100%">
        <Input
          placeholder="Search..."
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          isInvalid={error}
          disabled={disabled}
        />
        <InputRightElement onClick={search} cursor="pointer">
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
      {error && <Text color="red.500" fontSize="sm" pl="1">{error}</Text>}
    </Box>
  );
};

export default SearchBar;