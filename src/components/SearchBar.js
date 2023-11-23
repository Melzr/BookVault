import { useState } from 'react';
import { Box, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const search = () => {
    if (inputValue.length >= 3) {
      console.log(inputValue);
      setInputValue('');
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length < 3 && event.target.value.length > 0) {
      setError('Input must be at least 3 characters');
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
        <Input placeholder="Search..." value={inputValue} onChange={onInputChange} onKeyDown={onKeyDown} isInvalid={showError && error} />
        <InputRightElement onClick={search} cursor="pointer">
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
      {showError && error && <Text color="red.500" fontSize="sm" pl="1">{error}</Text>}
    </Box>
  );
};

export default SearchBar;