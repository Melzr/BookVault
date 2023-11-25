import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar';

test('SearchBar allows typing', () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<SearchBar onSubmit={onSubmit} />);

  const input = getByTestId('search-bar-input');
  fireEvent.change(input, { target: { value: 'test' } });

  expect(input.value).toBe('test');
});

test('SearchBar calls onSubmit when Enter is pressed', () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<SearchBar onSubmit={onSubmit} />);

  const input = getByTestId('search-bar-input');
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(onSubmit).toHaveBeenCalledWith('test');
});

test('SearchBar calls onSubmit when the button is clicked', () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<SearchBar onSubmit={onSubmit} />);

  const input = getByTestId('search-bar-input');
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(getByTestId('search-bar-button'));

  expect(onSubmit).toHaveBeenCalledWith('test');
});
