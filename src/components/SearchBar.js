import { useState } from 'react';
import { Box, Input, InputGroup, InputRightElement, Spacer, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { MIN_INPUT_LENGTH } from '../constants';

const SearchBar = ({ disabled, onSubmit, maxWidth = '500', initialInput = '' }) => {
  const [inputValue, setInputValue] = useState(initialInput);
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
    <Box w="100%" maxW={maxWidth} spacing={1} align="start">
      <Spacer h="24px" />
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
      {error ? <Text color="red.500" fontSize="sm" pl="1" h="24px">{error}</Text> : <Spacer h="24px" />}
    </Box>
  );
};

export default SearchBar;